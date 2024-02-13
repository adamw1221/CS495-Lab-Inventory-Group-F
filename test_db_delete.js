const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://btcantrell:Redhot043002-@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority";

// Name of the MongoDB database to connect to
const dbName = "sample_analytics"; // One of nine databases on the Inventory cluster
// Name of the collection within the specified database
const collectionName = "accounts"; // One collection in the 'sample_analytics' database

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Specify the version of the MongoDB Server API
    strict: true, // Enable strict mode for API versioning
    deprecationErrors: true, // Enable deprecation error messages
  }
});

// Document to delete (specify the conditions based on your document structure)
const query = {account_id: 903542}; // Condition to match documents for deletion

// Asynchronous function to delete a document
async function deleteDocument() {
  try {
    // Connect the client to the MongoDB server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Connect to the specified database
    const database = client.db(dbName);

    // Access the specified collection within the database
    const collection = database.collection(collectionName);

    // Delete a single document that matches the specified query
    const result = await collection.deleteOne(query);

    // Log the count of deleted documents
    console.log(`${result.deletedCount} document(s) deleted.`);
  } catch(err) {
    // Handle errors occurred during deletion
    console.log('Error occurred while deleting document:', err);
  } finally {
    // Ensure that the client will close when finished or when an error occurs
    await client.close();
  }
}

// Call the deleteDocument function and catch any errors
deleteDocument().catch(console.dir);
