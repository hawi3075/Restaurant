const prisma = require('../config/prisma');

// Place a new order (Customer or Waiter)
const createOrder = async (req, res) => {
  try {
    const { restaurantId, orderType, tableId, items, deliveryFee, discount, specialInstructions } = req.body;
    const customerId = req.user.id; // From JWT authentication

    if (!restaurantId || !items || items.length === 0 || !orderType) {
      return res.status(400).json({ error: 'Please provide restaurant, order type, and order items.' });
    }

    // Calculate total amount from items
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const food = await prisma.food.findUnique({ where: { id: item.foodId } });
      if (!food) {
        return res.status(404).json({ error: `Food item not found: ${item.foodId}` });
      }
      const unitPrice = food.price;
      const subtotal = unitPrice * item.quantity;
      totalAmount += subtotal;

      orderItemsData.push({
        foodId: food.id,
        quantity: item.quantity,
        unitPrice: unitPrice,
      });
    }

    const finalTotal = totalAmount + (deliveryFee || 0) - (discount || 0);

    // Create order and initial status history inside Neon database
    const order = await prisma.order.create({
      data: {
        customerId,
        restaurantId,
        tableId: tableId || null,
        orderType,
        totalAmount: finalTotal,
        deliveryFee: deliveryFee || 0,
        discount: discount || 0,
        specialInstructions,
        status: 'PENDING',
        items: {
          create: orderItemsData,
        },
        statusHistory: {
          create: {
            status: 'PENDING',
            notes: 'Order placed successfully',
          },
        },
      },
      include: {
        items: { include: { food: true } },
        customer: { select: { name: true, phone: true, email: true } },
        restaurant: true,
      },
    });

    // Real-time notification to restaurant staff via Socket.IO
    const io = req.app.get('io');
    if (io) {
      io.to(restaurantId).emit('new_order', order);
    }

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error while placing order.' });
  }
};

// Get orders for user (Customer history or Staff/Restaurant queue)
const getOrders = async (req, res) => {
  try {
    const { role, id: userId, restaurantId } = req.user;
    let filters = {};

    if (role === 'CUSTOMER') {
      filters.customerId = userId;
    } else if (['CHEF', 'WAITER', 'DRIVER'].includes(role) && restaurantId) {
      filters.restaurantId = restaurantId;
    } else if (role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized access to orders.' });
    }

    const orders = await prisma.order.findMany({
      where: filters,
      include: {
        items: { include: { food: true } },
        customer: { select: { name: true, phone: true } },
        restaurant: { select: { name: true, address: true } },
        statusHistory: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Update order status (Chef, Waiter, Driver, Admin workflows)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const { role } = req.user;

    const validStatuses = [
      'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 
      'OUT_FOR_DELIVERY', 'READY_TO_SERVE', 'DELIVERED', 
      'SERVED', 'COMPLETED', 'CANCELLED'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid order status.' });
    }

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    // Update order status and append to status history
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status,
        statusHistory: {
          create: {
            status,
            notes: notes || `Status updated to ${status} by ${role}`,
          },
        },
      },
      include: {
        items: { include: { food: true } },
        customer: true,
        restaurant: true,
        statusHistory: true,
      },
    });

    // Broadcast real-time update using Socket.IO
    const io = req.app.get('io');
    if (io) {
      io.to(order.restaurantId).emit('order_status_updated', updatedOrder);
      io.to(order.customerId).emit('order_status_updated', updatedOrder);
    }

    res.json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };