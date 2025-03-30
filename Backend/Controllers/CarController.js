const Car = require('../models/car'); // Đảm bảo đường dẫn đúng

// Lấy danh sách xe
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Lọc xe theo giá
const filterCarsByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const query = {};

        if (minPrice) query.Price = { $gte: parseInt(minPrice) };
        if (maxPrice) query.Price = { ...query.Price, $lte: parseInt(maxPrice) };

        const cars = await Car.find(query);
        res.json(cars);
    } catch (error) {
        console.error('Error filtering cars by price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Tìm xe theo tên (hàm này không cần `req, res` vì chỉ dùng trong logic nội bộ)
const getCarsByName = async (carName) => {
    try {
        return await Car.find({ name: { $regex: carName, $options: "i" } });
    } catch (error) {
        console.error('Error fetching cars by name:', error);
        throw error;
    }
};

// Lọc xe theo loại
const filterCarsByType = async (carType) => {
    try {
        return await Car.find({ Type: carType });
    } catch (error) {
        console.error('Error filtering cars by type:', error);
        throw error;
    }
};

// Export các hàm
module.exports = {
    getAllCars,
    filterCarsByPrice,
    getCarsByName,
    filterCarsByType
};
