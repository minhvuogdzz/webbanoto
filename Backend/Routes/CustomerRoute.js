const express = require("express");
const router = express.Router();

// Route to fetch the list of customers
const customerController = require("../Controllers/CustomerController");
router.post("/create", customerController.createCustomer);
router.get("/list", customerController.getAllCustomers);
router.delete("/:id", customerController.deleteCustomer);
router.put("/:id", customerController.updateCustomer);
module.exports = router;