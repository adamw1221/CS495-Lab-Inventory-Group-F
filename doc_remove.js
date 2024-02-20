// Asynchronous function to delete a document
async function remove(inClient, inDB, inCollection, inQuery) {

  // imports
  const db = inClient.db(inDB);
  const collection = db.collection(inCollection);

  // update the document
  const result = await collection.deleteOne(inQuery);

  // Log the count of deleted documents
  console.log(`${result.deletedCount} document(s) deleted.`);

}

module.exports = remove;