const express = require("express");
const customerController = require("../Controllers/CustomerController");

const router = express.Router();

router.post("/create", customerController.createCustomer);
router.get("/", customerController.getAllCustomers);
router.delete("/:id", customerController.deleteCustomer);
router.put("/:id", customerController.updateCustomer);

module.exports = router;