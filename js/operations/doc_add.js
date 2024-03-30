async function add(inClient, inDB, inCollection, itemId, itemName) {

    const db = inClient.db(inDB);
    const collection = db.collection(inCollection);
    const document = {"id": itemId, "name": itemName};

    const result = await collection.insertOne(document);
    if (result) {
      console.log("Document added to collection:", itemName);
      return "Document added successfully!";
    }

    return "Document was not added successfully..."

}
module.exports = add;