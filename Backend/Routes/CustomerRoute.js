const express = require("express");
const router = express.Router();
const Customer = require("../models/customer"); // Ensure the correct path to the model

// Route to fetch the list of customers
router.get("/list", async (req, res) => {
    try {
        const customers = await Customer.find(); // Fetch all customers from the database
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ message: "Failed to fetch customers" });
    }
});

// Route to create a new customer
router.post("/create", async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        const newCustomer = new Customer({ name, email, phoneNumber });
        await newCustomer.save();
        res.status(201).json({ message: "Customer created successfully" });
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ message: "Failed to create customer" });
    }
});

// Route to update a customer
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phoneNumber } = req.body;
        await Customer.findByIdAndUpdate(id, { name, email, phoneNumber });
        res.status(200).json({ message: "Customer updated successfully" });
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Failed to update customer" });
    }
});

// Route to delete a customer
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Customer.findByIdAndDelete(id);
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ message: "Failed to delete customer" });
    }
});

module.exports = router;