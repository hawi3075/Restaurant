const prisma = require('../config/prisma');

// Get inventory for a restaurant
const getInventoryByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    const inventory = await prisma.inventory.findMany({
      where: { restaurantId },
    });

    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal server error while fetching inventory.' });
  }
};

// Add or update inventory item (Admin / Staff)
const upsertInventoryItem = async (req, res) => {
  try {
    const { id, restaurantId, itemName, quantity, unit, minimumStock } = req.body;

    if (!restaurantId || !itemName || quantity === undefined || !unit || minimumStock === undefined) {
      return res.status(400).json({ error: 'Please provide all required inventory details.' });
    }

    let inventoryItem;

    if (id) {
      // Update existing inventory item
      inventoryItem = await prisma.inventory.update({
        where: { id },
        data: {
          itemName,
          quantity: parseFloat(quantity),
          unit,
          minimumStock: parseFloat(minimumStock),
        },
      });
    } else {
      // Create new inventory item
      inventoryItem = await prisma.inventory.create({
        data: {
          restaurantId,
          itemName,
          quantity: parseFloat(quantity),
          unit,
          minimumStock: parseFloat(minimumStock),
        },
      });
    }

    // Check for low stock alert condition
    if (inventoryItem.quantity <= inventoryItem.minimumStock) {
      console.warn(`LOW STOCK ALERT: ${inventoryItem.itemName} at restaurant ${restaurantId} is at ${inventoryItem.quantity} ${inventoryItem.unit}`);
    }

    res.status(201).json({
      message: 'Inventory item saved successfully',
      inventoryItem,
    });
  } catch (error) {
    console.error('Error saving inventory item:', error);
    res.status(500).json({ error: 'Internal server error during inventory update.' });
  }
};

module.exports = { getInventoryByRestaurant, upsertInventoryItem };