const express = require("express");
const customerController = require("../Controllers/CustomerController");

const router = express.Router();

router.post("/customer/create", customerController.createCustomer);
router.get("/customers", customerController.getAllCustomers);
router.delete("/customer/delete/:id", customerController.deleteCustomer);
router.put("/customer/update/:id", customerController.updateCustomer);

module.exports = router;