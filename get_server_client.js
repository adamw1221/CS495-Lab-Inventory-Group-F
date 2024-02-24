// get_server_client.js

const { MongoClient } = require('mongodb');

const url = "mongodb+srv://pjmazzei:pjmazzei" +
    "@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority";
const poolSize = 10;

async function get_server_client() {
    const client = new MongoClient(url, {
        serverApi: {
            version: "1",
            strict: true,
            deprecationErrors: true,
            poolSize: poolSize,
        },
    });

    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. " +
            "You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        return null;
    }
}

// Export the function itself, not the result of its execution
module.exports = get_server_client;
