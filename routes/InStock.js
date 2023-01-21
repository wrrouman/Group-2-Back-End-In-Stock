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
router.get("/warehouses", (req, res) => {
    let allwarehouse_data = fs.readFileSync("data/warehouses.json");
    let parse_allwarehouse_data = JSON.parse(allwarehouse_data);
    res.json(parse_allwarehouse_data);
});

// GET a Single Warehouse

// POST/CREATE a New Warehouse
router.post("/warehouses", (req, res) => {
    let new_warehouse_data = (req.body);
    let allwarehouse_data = fs.readFileSync("data/warehouses.json");
    let parse_allwarehouse_data = JSON.parse(allwarehouse_data);
    parse_allwarehouse_data.push(new_warehouse_data);
    let stringify_allwarehouse_data = JSON.stringify(parse_allwarehouse_data);
    fs.writeFileSync('data/warehouses.json', stringify_allwarehouse_data);
    res.status(201).send(`Created ${req.body.name} Warehouse Successfully!`);
});

// PUT/PATCH/EDIT a Warehouse
router.put("/warehouses/:warehouseId", (req, res) => {
    const warehouseId = req.params.warehouseId;
    let allwarehouse_data = fs.readFileSync("data/warehouses.json");
    let parse_allwarehouse_data = JSON.parse(allwarehouse_data);
    
    //find index of Warehouse we want to edit
    let currentWarehouseDetails_Index = parse_allwarehouse_data.findIndex(warehouse => warehouse.id === warehouseId);
    
    //edit_data
    let new_data = (req.body);
    parse_allwarehouse_data[currentWarehouseDetails_Index] = new_data;
    let stringify_allwarehouse_data = JSON.stringify(parse_allwarehouse_data);
    fs.writeFileSync('data/warehouses.json', stringify_allwarehouse_data);
    res.status(201).send(`Edited ${req.body.name} Warehouse Successfully!`);
});

// DELETE a Warehouse
router.delete("/warehouses/:warehouseId", (req, res) => {
    const warehouseId = req.params.warehouseId;
    let allwarehouse_data = fs.readFileSync("data/warehouses.json");
    let parse_allwarehouse_data = JSON.parse(allwarehouse_data);
    
    //find details of Warehouse we want to delete
    let currentWarehouseDetails = parse_allwarehouse_data.find(warehouse => warehouse.id === warehouseId);
    //find index of Warehouse we want to delete
    let currentWarehouseDetails_Index = parse_allwarehouse_data.findIndex(warehouse => warehouse.id === warehouseId);
    
    //delete warehouse
    parse_allwarehouse_data.splice(currentWarehouseDetails_Index, 1);
    let stringify_allwarehouse_data = JSON.stringify(parse_allwarehouse_data);
    fs.writeFileSync('data/warehouses.json', stringify_allwarehouse_data);
    res.status(201).send(`Deleted ${currentWarehouseDetails.name} Warehouse Successfully!`);
});

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