//imports



/////////////////////////////////////////////////////////////////////////////////////////

async function runServer() {

    const { MongoClient, ServerApiVersion } = require("mongodb");
    
    const uri = "mongodb+srv://pjmazzei:pjmazzei" +
                "@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        // Send a ping to confirm a successful connection
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