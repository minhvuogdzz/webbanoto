const express = require("express");
const carController = require("../Controllers/CarController");

const router = express.Router();

router.get("/cars", carController.getAllCars);
router.get("/cars/filterByPrice", carController.filterCarsByPrice);

module.exports = router;
