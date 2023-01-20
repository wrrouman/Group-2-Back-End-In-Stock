const express = require("express");
const fs = require("fs");
const router = express.Router();
WarehouseDetails = require("../data/warehouses.json");
InventoryDetails = require("../data/inventories.json");

router.use((req, res, next) => {
    next();
})

router.get("/", (req, res) => {
    res.send("Express Homepage");
});

// Get List of All Warehouses

// GET a Single Warehouse

// POST/CREATE a New Warehouse

// PUT/PATCH/EDIT a Warehouse

// DELETE a Warehouse

// GET List of all Inventory Items

// GET a Single Inventory Item

// GET Inventories for a Given Warehouse

// POST/CREATE a New Inventory Item

// PUT/PATCH/EDIT an Inventory Item

// DELETE an Inventory Item

module.exports = router;