const express = require('express');
const orderController = require("../Controllers/OrderController");

const router = express.Router();

router.post('/create', orderController.createOrder);
router.get('/list', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;