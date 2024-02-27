const express = require('express');
const cors = require('cors');
const runServer = require("./run_server.js");
const read = require("./doc_read.js");
const update = require("./doc_update.js");
const add = require("./doc_add.js");
const remove = require("./doc_remove.js");

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

app.get('/', (req, res) => {
    console.log('get request received: ', req.url);
    res.send('Hello, World! this is a get request response.');
});

app.post('/data', (req, res) => {
    console.log('post request received:', req.url);
    const requestData = req.body;
    console.log('received data: ', requestData);
    res.send('received post request. data received: ', JSON.stringify(requestData));
});

app.post('/', async(req, res) => {
    console.log('request received:', req.url);
    // (async (req, res) => {
        // const client = await runServer();
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
                res.status(200).send(result); //0 or 1
            }
            // await client.close();
        }else{
            res.status(500).send("Sorry there's a problem with the website!" +
            "Please try again later."); //0 or 1
        }
    // })(req, res);
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