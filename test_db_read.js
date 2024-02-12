
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://odcampbell:ShfmfKbvuU19DZms@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority";
const dbName = "sample_analytics"; //1 of 9 databases on Inventory cluster
const collectionName = "accounts"; //1 colelction in that database

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
    console.log("Pinged your deployment. You successfully connected to MongoDB! \n");

    // Select database - dbName defined above
    const database = client.db(dbName);

    // Select the colelction - collectionName defined above
    const collection = database.collection(collectionName);

    // Optionally, save query in a variable for space
    const query = {limit : {$lt: 9000} };

    // READ - pass query into find()
    const documents = await collection.find(query).toArray(); 

    console.log(`Query: ${JSON.stringify(query, null, 2)} \n` );
    console.log("Documents returned from query: ");
    console.log(documents);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);