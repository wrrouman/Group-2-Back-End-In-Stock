const express = require("express");
const fs = require("fs"); 
const router = express.Router();
const uniqid = require("uniqid");
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


//=======Grayson Workspace======


//Function to read warehouse.json
function readWarehouse() {
    const warehouseFile = fs.readFileSync(WarehouseDetails);
    const warehouseData = JSON.parse(warehouseFile);
    return warehouseData;
}

//Function to write to warehouse.json
function writeWarehouse(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync(WarehouseDetails, stringifiedData);
}

//defining /warehouses route and returning the .get request for the route as json
router.get("/warehouses/:warehouseid", (_req, res) => {
    const warehouseData = readVideos();
    const strippedData = warehouseData((warehouse) => {
        return {
            id: warehouse.id,
            name: warehouse.name,
            address: warehouse.address,
            city: warehouse.city,
            country: warehouse.country,
            contact: warehouse.contact,
            name: warehouse.name,
            position warehouse.position,
            phone: warehouse.phone,
            email: warehouse.email
        };
    });
    res.json(strippedData);
});

//defining /warehouses route and adding the .post request for the route in videos json
router.post("/videos", (req, res) => {
    const videosData = readVideos();
    const newVideo = {
        id: uniqid(),
        title: req.body.title,
        channel: "placeholder",
        image: req.body.image,
        description: req.body.description,
        comments: []
    };
    videosData.push(newVideo);
    writeVideos(videosData);
    res.status(201).json(newVideo);
});

//exports the route to be used (similar to a component in react) on the server js index.js
module.exports = router;


module.exports = router;