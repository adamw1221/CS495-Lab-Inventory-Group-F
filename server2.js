const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('LabInventory'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const operations = require('./operations');
const runServer = require("./run_server.js");

// Get Mongo client + Start Server
let inClient;

async function initializeServer() {
    try {
        // Establish the MongoDB client during application startup
        inClient = await runServer();
        console.log('MongoDB client connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }

    // Start the server after the MongoDB client is successfully connected
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

initializeServer(); // Call the initialization function
// Done getting client + Starting Server 

app.get('/', (req, res) => {
    console.log('GET request received:', req.url);
    res.send('Hello, World!');
});

app.post('/', async (req, res) => {
    console.log('POST request received:', req.url);
    console.log('Data received:', req.body);

    const actionType = req.body.postType;

    // Switch statement to handle different types of actions
    switch (actionType) {
        case 'update':
            try {
                const filter = req.body.filter;
                const updateDB = req.body.update;
                const result = await operations.update(inClient, filter, updateDB);// returns string
                res.send(result); //0 or 1

            } catch (error) {
                console.error('Error updating the database:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
            break;
        
        case 'read':
            try {
                const result = await operations.read(inClient, req.body.id );

                console.log('Database query result:', result);
                res.json(result); //list of documents
            } catch (error) {
                console.error('Error querying the database:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
            break;

        // Add more cases for other types of actions as needed
        default:
            res.status(400).json({ message: 'Invalid action type' });
    }
});
