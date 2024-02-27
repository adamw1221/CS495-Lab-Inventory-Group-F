async function add(inClient, inDB, inCollection, inData) {

    const db = inClient.db(inDB);
    const collection = db.collection(inCollection);

    const result = await collection.insertOne(inData);
    if (result) {
      console.log("Document added to collection:", inData);
      return "Document added successfully!";
    }

    return "Document was not added successfully..."

}
module.exports = add;