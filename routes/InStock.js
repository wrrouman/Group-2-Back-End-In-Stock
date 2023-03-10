const express = require("express");
const fs = require("fs");
const router = express.Router();
const uniqid = require("uniqid");
WarehouseDetails = require("../data/warehouses.json");
InventoryDetails = require("../data/inventories.json");

router.use((req, res, next) => {
    next();
});

router.get("/", (req, res) => {
    res.send("Express Homepage");
});

// Get List of All Warehouses
router.get("/warehouses", (req, res) => {
    let allwarehouse_data = fs.readFileSync("data/warehouses.json");
    let parse_allwarehouse_data = JSON.parse(allwarehouse_data);
    res.json(parse_allwarehouse_data);
});

//Function to read warehouse.json
function readWarehouse() {
    const warehouseFile = fs.readFileSync("data/warehouses.json");
    const warehouseData = JSON.parse(warehouseFile);
    return warehouseData;
}

//Function to read inventories.json
function readInventories() {
    const inventoriesFile = fs.readFileSync("data/inventories.json");
    const inventoriesData = JSON.parse(inventoriesFile);
    return inventoriesData;
}

// GET a Single Warehouse
router.get("/warehouses/:warehouseid", (req, res) => {
    const parseAllWarehouseData = readWarehouse();
    const singleWarehouse = parseAllWarehouseData.filter(
        (warehouse) => warehouse.id === req.params.warehouseid
    );
    if (singleWarehouse) {
        res.json(singleWarehouse);
    } else {
        res.status(404).json({ message: "Warehouse not found." });
    }
});

// POST/CREATE a New Warehouse
router.post("/warehouses", (req, res) => {
    let new_warehouse_data = req.body;
    let allwarehouse_data = fs.readFileSync("data/warehouses.json");
    let parse_allwarehouse_data = JSON.parse(allwarehouse_data);
    parse_allwarehouse_data.push(new_warehouse_data);
    let stringify_allwarehouse_data = JSON.stringify(parse_allwarehouse_data);
    fs.writeFileSync("data/warehouses.json", stringify_allwarehouse_data);
    res.status(201).send(`Created ${req.body.name} Warehouse Successfully!`);
});

// PUT/PATCH/EDIT a Warehouse
router.put("/warehouses/:warehouseId", (req, res) => {
    const warehouseId = req.params.warehouseId;
    let allwarehouse_data = fs.readFileSync("data/warehouses.json");
    let parse_allwarehouse_data = JSON.parse(allwarehouse_data);

    //find index of Warehouse we want to edit
    let currentWarehouseDetails_Index = parse_allwarehouse_data.findIndex(
        (warehouse) => warehouse.id === warehouseId
    );

    //edit_data
    let new_data = req.body;
    parse_allwarehouse_data[currentWarehouseDetails_Index] = new_data;
    let stringify_allwarehouse_data = JSON.stringify(parse_allwarehouse_data);
    fs.writeFileSync("data/warehouses.json", stringify_allwarehouse_data);
    res.status(201).send(`Edited ${req.body.name} Warehouse Successfully!`);
});

// DELETE a Warehouse
router.delete("/warehouses/:warehouseId", (req, res) => {
    const warehouseId = req.params.warehouseId;
    let allwarehouse_data = fs.readFileSync("data/warehouses.json");
    let parse_allwarehouse_data = JSON.parse(allwarehouse_data);

    //find details of Warehouse we want to delete
    let currentWarehouseDetails = parse_allwarehouse_data.find(
        (warehouse) => warehouse.id === warehouseId
    );
    //find index of Warehouse we want to delete
    let currentWarehouseDetails_Index = parse_allwarehouse_data.findIndex(
        (warehouse) => warehouse.id === warehouseId
    );

    //delete warehouse
    parse_allwarehouse_data.splice(currentWarehouseDetails_Index, 1);
    let stringify_allwarehouse_data = JSON.stringify(parse_allwarehouse_data);
    fs.writeFileSync("data/warehouses.json", stringify_allwarehouse_data);
    res.status(201).send(
        `Deleted ${currentWarehouseDetails.name} Warehouse Successfully!`
    );
});

// GET List of all Inventory Items

// GET a Single Inventory Item
router.get("/inventory/:inventoryid", (req, res) => {
    const parseAllInventoryData = readInventories();
    const singleInventory = parseAllInventoryData.filter(
        (inventory) => inventory.id === req.params.inventoryid
    );
    if (singleInventory) {
        res.json(singleInventory);
    } else {
        res.status(404).json({ message: "Inventory not found." });
    }
});

// GET Inventories for a Given Warehouse
router.get("/inventories/:warehouseId", (req, res) => {
    const warehouseId = req.params.warehouseId;
    const inventoriesId = req.params.inventoriesId;
    let allinventory_data = fs.readFileSync("data/inventories.json");
    let parse_allinventory_data = JSON.parse(allinventory_data);
    
    //find inventory items that belong to the same warehouse
    let currentWarehouseDetails = parse_allinventory_data.filter(
      (inventory) => inventory.warehouseID === warehouseId
    );
  
    res.json(currentWarehouseDetails);
  
  });

// POST/Create new inventory Item
router.post("/inventory", (req, res) => {
    let parseAllInventoryData = readInventories();
    let newInventoryData = req.body;
    parseAllInventoryData.push(newInventoryData);
    let stringifyAllInventoryData = JSON.stringify(parseAllInventoryData);
    fs.writeFileSync("data/inventories.json", stringifyAllInventoryData);
    res.status(201).send({
        message: `Created ${req.body.name} Inventory Successfully!`,
    });
});

// PUT/PATCH/EDIT inventory item
router.put("/inventory/:inventoryid", (req, res) => {
    const inventoryid = req.params.inventoryid;
    const parseAllInventoryData = readInventories();
    //find index of Warehouse we want to edit
    let currentInventoryDetailsIndex = parseAllInventoryData.findIndex(
        (inventory) => inventory.id === inventoryid
    );
    if (currentInventoryDetailsIndex !== -1) {
        //edit_data
        let newData = req.body;
        parseAllInventoryData[currentInventoryDetailsIndex] = newData;
        let stringifyAllInventoryData = JSON.stringify(parseAllInventoryData);
        fs.writeFileSync("data/inventories.json", stringifyAllInventoryData);
        res.status(200).json({
            message: `Edited ${req.body.name} Inventory Successfully!`,
        });
    } else {
        res.status(404).json({ message: "Inventory not found." });
    }
});

// Will's Backend components

// Get List of All Inventories
router.get("/inventories", (req, res) => {
    let allinventory_data = fs.readFileSync("data/inventories.json");
    let parse_allinventory_data = JSON.parse(allinventory_data);
    res.json(parse_allinventory_data);
});

// Get Inventory Items for a Warehouse
router.get("/inventories/:warehouseId/:inventoriesId", (req, res) => {
    const warehouseId = req.params.warehouseId;
    const inventoriesId = req.params.inventoriesId;
    let allinventory_data = fs.readFileSync("data/inventories.json");
    let parse_allinventory_data = JSON.parse(allinventory_data);

    //find inventory items that belong to the same warehouse
    let currentWarehouseDetails = parse_allinventory_data.filter(
        (inventory) => inventory.warehouseID === warehouseId
    );

    let currentInventoryincurrentWarehouseDetails =
        currentWarehouseDetails.find(
            (inventory) => inventory.id === inventoriesId
        );

    res.json(currentInventoryincurrentWarehouseDetails);
});

// DELETE an Inventory Item
router.delete("/inventories/:inventoriesId", (req, res) => {
    const inventoriesId = req.params.inventoriesId;
    let allinventory_data = fs.readFileSync("data/inventories.json");
    let parse_allinventory_data = JSON.parse(allinventory_data);

  //find details of Item we want to delete
  let currentInventoryDetails = parse_allinventory_data.find(
    (inventory) => inventory.id === inventoriesId
  );
  //find index of item we want to delete
  let currentInventoryDetails_Index = parse_allinventory_data.findIndex(
    (inventory) => inventory.id === inventoriesId
  );

  //delete Item
  parse_allinventory_data.splice(currentInventoryDetails_Index, 1);
  let stringify_allinventory_data = JSON.stringify(parse_allinventory_data);
  fs.writeFileSync("data/inventories.json", stringify_allinventory_data);
  res
    .status(201)
    // .send(`Deleted ${currentInventoryDetails.itemName} Successfully!`);
    .json(stringify_allinventory_data);
});

//exports the route to be used (similar to a component in react) on the server js index.js
module.exports = router;
