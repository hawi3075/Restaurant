const express = require('express');
const router = express.Router();
const { getInventoryByRestaurant, upsertInventoryItem } = require('../controllers/inventoryController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.get('/:restaurantId', verifyToken, getInventoryByRestaurant);
router.post('/', verifyToken, verifyRole(['ADMIN']), upsertInventoryItem);

module.exports = router;