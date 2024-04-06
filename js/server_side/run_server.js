const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: "mongodb+srv://pjmazzei:pjmazzei" +
                "@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority",
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
    const uri = "mongodb+srv://pjmazzei:pjmazzei" +
                "@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
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