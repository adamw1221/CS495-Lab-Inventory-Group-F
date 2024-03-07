const express = require('express');
const cors = require('cors');
const runServer = require("./run_server.js");
const read = require("../operations/doc_read.js");
const update = require("../operations/doc_update.js");
const add = require("../operations/doc_add.js");
const remove = require("../operations/doc_remove.js");

const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('LabInventory'));
app.use(cors());
app.use(express.json());

let client;
async function initializeServer() {
    client = await runServer();
}

initializeServer();
app.use(bodyParser.json());

app.get('/getEquipment', async (req, res) => {
    console.log('get request received: ', req.url);

    try{
        if (client){
            const query = { "Available": { $ne: "No" } }
            const products = await read(client, "InventoryDB", "Robotics_Lab",query,
                { _id:0, name: 1, id: 1} );
            res.json({ data: products });
        } 
        else{
            res.status(500).send();
        }
    } catch (error){
        console.error("Error in /getEquipment route:", error.message);
        res.status(500).send();
    }
    
});

app.post('/data', (req, res) => {
    console.log('post request received:', req.url);
    const requestData = req.body;
    console.log('received data: ', requestData);
    res.send('received post request. data received: ', JSON.stringify(requestData));
});

app.post('/checkout', async(req, res) => {
    console.log('request received:', req.url);

    if (client) {
        if (req.body.type == "validate") {
            // validate checkout input
            const issues = [];

            // validate equipment selection
            console.log(req.body.input["selectedEquipment"]);
            const query = {id: req.body.input["selectedEquipment"]};
            const result = await read(client, "InventoryDB", "Robotics_Lab", query);
            console.log(result[0]["Available"]);
            if (result[0]["Available"] != "Yes") {
                issues.push("Selected equipment is not available.");
            }

            // validate checkout date
            console.log(req.body.input["checkoutDate"]);
            console.log(req.body.input["checkoutTime"]);
            const checkoutDate = Date.parse(req.body.input["checkoutDate"]
                                            + "T"
                                            + req.body.input["checkoutTime"]);
            try {
                if (checkoutDate <= Date.now()) {
                    issues.push("Checkout time cannot be in the past.");
                }
            }
            catch {
                issues.push("Must select a valid checkout date and time.");
            }

            // validate return date
            console.log(req.body.input["returnDate"]);
            console.log(req.body.input["returnTime"]);
            const returnDate = Date.parse(req.body.input["returnDate"]
                                            + "T"
                                            + req.body.input["returnTime"]);
            try {
                if (returnDate <= Date.now()) {
                    issues.push("Return time cannot be in the past.");
                }
            }
            catch {
                issues.push("Must select a valid return date and time.");
            }
            try {
                if (returnDate <= checkoutDate) {
                    issues.push("Return date cannot be before checkout date.");
                }
            }
            catch {}

            // send response based on validation
            if (issues.length > 0) {
                res.status(200).send(issues);
            }
            else {
                res.status(200).send(["No issues"]);
            }
        }
        else if (req.body.type == "checkout") {
            //
        }
    }
    else {
        res.status(500).send("Sorry there's a problem with the website!" +
            "Please try again later.");
    }
});

app.post('/', async(req, res) => {
    console.log('request received:', req.url);

        if (client) {
            if (req.body.type == "read") {
                console.log(req.body.input);
                const query = {id: req.body.input};
                const result = await read(client, "InventoryDB", "Robotics_Lab", query);
                res.status(200).send(result);
            }
            else if (req.body.type == "update") {
                const filter = req.body.filter;
                const updateDB = req.body.update;
                const result = await update(client,"InventoryDB", "Robotics_Lab",
                    filter, updateDB);// returns string
                res.status(200).send(result); //0 or 1
            }
            else if (req.body.type == "remove") {
                console.log('Removing Document: ', req.body.input);
                const query = { id: req.body.input };
                const result = await remove(client, "InventoryDB", "Robotics_Lab", query);
                //console.log(result.deletedCount);
                if (result.deletedCount == 1) {
                    res.status(200).json({ success: true, message: 'Document removed successsfully.' });
                } else {
                    res.status(404).json({ success: false, message: 'Document not found or already removed.' });
                }
            }
            else if (req.body.type == "add") {
                const itemId = req.body.filter;
                const itemName = req.body.name;
                const result = await add(client,"InventoryDB", "Robotics_Lab",
                    itemId, itemName);// returns string
                res.status(200).send(result);
            }
        }else{
            res.status(500).send("Sorry there's a problem with the website!" +
            "Please try again later.");
        }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/*
    // imports
    const runServer = require("./run_server.js");
    const testOperations = require("./test_operations.js");

    // connects to mongodb server
    const client = await runServer();

    // performs operations
    if (client) {

        await testOperations(client);
        await client.close();
        
    }
*/