const express = require('express');
const orderController = require("../Controllers/OrderController");
const router = express.Router();
const Order = require('../models/order');

// router.post('/create', async (req, res) => {
//     try {
//         const { phoneNumber, city, dealer, date, carId } = req.body;

//         // Kiểm tra dữ liệu đầu vào
//         if (!phoneNumber || !city || !dealer || !date || !carId) {
//             return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
//         }

//         // Tạo đơn hàng mới
//         const newOrder = new Order({
//             phoneNumber,
//             city,
//             dealer,
//             date: new Date(date), // Chuyển string thành Date
//             carId
//         });
        
//         await newOrder.save();
//         res.status(201).json({ message: 'Đơn hàng đã được tạo', order: newOrder });
//     } catch (error) {
//         console.error('Lỗi server:', error);
//         res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: error.message });
//     }
// });

router.post('/create', orderController.createOrder);
router.get('/list', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;    