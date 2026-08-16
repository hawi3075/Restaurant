const prisma = require('../config/prisma');

// Process or record payment for an order
const createPayment = async (req, res) => {
  try {
    const { orderId, amount, method, transactionId } = req.body;

    if (!orderId || !amount || !method) {
      return res.status(400).json({ error: 'Please provide order ID, amount, and payment method.' });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ error: 'Associated order not found.' });
    }

    // Create payment record in Neon database
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount: parseFloat(amount),
        method, // e.g., 'CASH', 'CHAPA', 'TELEBIRR'
        status: 'COMPLETED',
        transactionId: transactionId || `TXN-${Date.now()}`,
      },
    });

    // Automatically update order confirmation if payment is completed
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CONFIRMED' },
    });

    res.status(201).json({
      message: 'Payment recorded successfully',
      payment,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error during payment processing.' });
  }
};

// Get payment details by order ID
const getPaymentByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { orderId },
      include: { order: true },
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment record not found for this order.' });
    }

    res.json(payment);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { createPayment, getPaymentByOrderId };