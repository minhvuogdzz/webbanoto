const Car = require('../models/car'); // Đảm bảo đường dẫn đúng


// Hàm lấy danh sách xe
exports.GetAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
        // return cars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};
exports.filterCarsByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const query = {};

        if (minPrice) {
            query.Price = { $gte: parseInt(minPrice) };
        }

        if (maxPrice) {
            query.Price = { ...query.Price, $lte: parseInt(maxPrice) };
        }
        const cars = await Car.find(query);
        res.json(cars);
    } catch (error) {
        console.error('Error filtering cars by price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getCarsByName = async (carName) => {
    try {
        const cars = await Car.find({ name: { $regex: carName, $options: "i" } });
        return cars;
    } catch (error) {
        console.error('Error fetching cars by name:', error);
        throw error;
    }
};
const filterCarsByType = async (carType) => {
    try {
        const cars = await Car.find({ Type: carType });
        return cars;
    } catch (error) {
        console.error('Error filtering cars by type:', error);
        throw error;
    }
};