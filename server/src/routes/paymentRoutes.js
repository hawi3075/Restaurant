const express = require('express');
const router = express.Router();
const { createPayment, getPaymentByOrderId } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, createPayment);
router.get('/:orderId', verifyToken, getPaymentByOrderId);

module.exports = router;