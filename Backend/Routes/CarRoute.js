const express = require("express");
const carController = require("../Controllers/CarController");

const router = express.Router();

router.get("/api/cars", carController.getAllCars);
router.get("/api/cars/filterByPrice", carController.filterCarsByPrice);

module.exports = router;
