// Asynchronous function to remove a document
async function remove(inClient, inDB, inCollection, inQuery) {
  try {
    // imports
    const db = inClient.db(inDB);
    const collection = db.collection(inCollection);

    // update the document
    const result = await collection.deleteOne(inQuery);

    // Log the count of deleted documents
    console.log(`${result.deletedCount} document(s) deleted.`);

    return result; // Return the result object
  } catch (error) {
    console.error('Error removing document:', error);
    throw error; // Rethrow the error
  }
}

module.exports = remove;