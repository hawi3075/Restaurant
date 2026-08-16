const express = require('express');
const router = express.Router();
const { 
  getCategories, 
  createCategory, 
  getFoods, 
  getFoodById, 
  createFood 
} = require('../controllers/foodController');
const { verifyToken, verifyRole } = require('../middleware/auth');

// Category endpoints
router.get('/categories', getCategories);
router.post('/categories', verifyToken, verifyRole(['ADMIN']), createCategory);

// Food endpoints
router.get('/', getFoods);
router.get('/:id', getFoodById);
router.post('/', verifyToken, verifyRole(['ADMIN']), createFood);

module.exports = router;