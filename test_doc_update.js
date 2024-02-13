
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pjmazzei:pjmazzei@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Select the database
        const db = client.db("sample_airbnb");

        // Select the collection
        const collection = db.collection("listingsAndReviews");

/*         // Find all documents in the collection and convert to array
        const documents = await collection.find().toArray();

        // Print all documents
        console.log(documents); */

        // Update criteria (you can change this based on your requirement)
        const filter = { name: "Ribeira Charming Duplex" }; // Change this to the ID of the document you want to update

        // New values for the fields to be updated
        const updateDoc = {
            $set: {
                // Fields to be updated
                minimum_nights: "3",
                maximum_nights: "31"
                // Add more fields to be updated as needed
            }
        };

        // Update the document
        const result = await collection.updateOne(filter, updateDoc);

        console.log(`${result.modifiedCount} document(s) updated`);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
