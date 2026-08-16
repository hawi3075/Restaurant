const prisma = require('../config/prisma');

// Get all food categories
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.foodCategory.findMany({
      include: {
        _count: { select: { foods: true } }
      }
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error while fetching categories.' });
  }
};

// Create a food category (Admin only)
const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required.' });
    }

    const category = await prisma.foodCategory.create({
      data: { name, image }
    });

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Get foods (with optional filters by category, restaurant, or search query)
const getFoods = async (req, res) => {
  try {
    const { categoryId, restaurantId, search, popular } = req.query;
    
    const filters = {};
    if (categoryId) filters.categoryId = categoryId;
    if (restaurantId) filters.restaurantId = restaurantId;
    if (popular === 'true') filters.isPopular = true;
    if (search) {
      filters.name = { contains: search, mode: 'insensitive' };
    }

    const foods = await prisma.food.findMany({
      where: filters,
      include: {
        category: true,
        restaurant: { select: { id: true, name: true, address: true } },
        addons: true,
        reviews: true
      }
    });

    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Internal server error while fetching foods.' });
  }
};

// Get single food details
const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await prisma.food.findUnique({
      where: { id },
      include: {
        category: true,
        restaurant: true,
        addons: true,
        reviews: {
          include: { customer: { select: { name: true } } }
        }
      }
    });

    if (!food) {
      return res.status(404).json({ error: 'Food item not found.' });
    }

    res.json(food);
  } catch (error) {
    console.error('Error fetching food details:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Add new food item (Admin / Restaurant Owner)
const createFood = async (req, res) => {
  try {
    const { name, description, price, image, categoryId, restaurantId, isPopular, addons } = req.body;

    if (!name || !price || !categoryId || !restaurantId) {
      return res.status(400).json({ error: 'Please provide name, price, category, and restaurant.' });
    }

    const food = await prisma.food.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId,
        restaurantId,
        isPopular: isPopular || false,
        addons: addons ? {
          create: addons.map(addon => ({ name: addon.name, price: parseFloat(addon.price) }))
        } : undefined
      },
      include: { addons: true }
    });

    res.status(201).json({ message: 'Food item created successfully', food });
  } catch (error) {
    console.error('Error creating food item:', error);
    res.status(500).json({ error: 'Internal server error during food creation.' });
  }
};

module.exports = { getCategories, createCategory, getFoods, getFoodById, createFood };