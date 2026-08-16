const prisma = require('../config/prisma');

// Get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        foods: true,
        tables: true,
      },
    });
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error while fetching restaurants.' });
  }
};

// Get single restaurant by ID with its menu categories and foods
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        foods: {
          include: { category: true, addons: true },
        },
        tables: true,
        staff: {
          select: { id: true, name: true, email: true, role: true }
        }
      },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Create a new restaurant (Admin only)
const createRestaurant = async (req, res) => {
  try {
    const { name, address, phone, openingHours, closingHours, description, logo, coverImage, latitude, longitude } = req.body;

    if (!name || !address || !phone || !openingHours || !closingHours) {
      return res.status(400).json({ error: 'Please provide all required restaurant details.' });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        address,
        phone,
        openingHours,
        closingHours,
        description,
        logo,
        coverImage,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
      },
    });

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant,
    });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ error: 'Internal server error during restaurant creation.' });
  }
};

module.exports = { getRestaurants, getRestaurantById, createRestaurant };