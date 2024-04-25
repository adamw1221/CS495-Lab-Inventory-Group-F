async function add(inClient, inDB, inCollection, document) {

    const db = inClient.db(inDB);
    const collection = db.collection(inCollection);

    const result = await collection.insertOne(document);
    if (result) {
      console.log("Document added to collection:", document);
      return "Document added successfully!";
    }

    return "Document was not added successfully..."

}

async function addUser(inClient, inDB, inCollection, userInfo) {

  const db = inClient.db(inDB);
  const collection = db.collection(inCollection);

  const result = await collection.insertOne(userInfo);
  if (result) {
    console.log("Document added to collection:", userInfo);
    return "Document added successfully!";
  }

  // return "Document was not added successfully..."; //currently not used

}

module.exports = {
  add,
  addUser
};