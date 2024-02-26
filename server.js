const express = require('express');
const cors = require('cors');
const runServer = require("./run_server.js");
const read = require("./doc_read.js");

const app = express();
const port = 3000;

app.use(express.static('LabInventory'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log('request received:', req.url);
    res.send('Hello, World!');
});

app.post('/', (req, res) => {
    console.log('request received:', req.url);
    (async (req, res) => {
        const client = await runServer();
        if (client) {
            if (req.body.type == "read") {
                console.log(req.body.input);
                const query = {id: req.body.input};
                const result = await read(client, "InventoryDB", "Robotics_Lab", query);
                res.status(200).send(result);
            }
            else if (req.body.type == "update") {

            }
            else if (req.body.type == "delete") {

            }
            else if (req.body.type == "add") {
                
            }
            await client.close();
        }
    })(req, res);
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