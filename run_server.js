
async function runServer() {

    // imports
    const { MongoClient, ServerApiVersion } = require("mongodb");
    
    // creates client
    const uri = "mongodb+srv://pjmazzei:pjmazzei" +
                "@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
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

module.exports = runServer;