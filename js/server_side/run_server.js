const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const store = new MongoDBStore({
    uri: MONGO_DB_URI,
    collection: 'User_Session_Data',
    databaseName: 'InventoryDB'
  });

const sessionConfig = {
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 30 * 60 * 1000 // Set cookie expiration time to 30 minutes
    }
};

async function runServer() {

    // imports
    const { MongoClient, ServerApiVersion } = require("mongodb");
    const poolSize = 10;
    
    // creates client
    const client = new MongoClient(MONGO_DB_URI, {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        poolSize: poolSize,
        }
    });

    // connects to server
    try {

        await client.connect();
        // send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. " +
                    "You successfully connected to MongoDB!");
        return client;

    } catch (err) {

        console.error("Error connecting to MongoDB:", err);
        return null;
        
    }

}

module.exports = {
    runServer,
    sessionConfig
}; 