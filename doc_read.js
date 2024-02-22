async function read(inClient, inDB, inCollection, inQuery) {

  const db = inClient.db(inDB);
  const collection = db.collection(inCollection);

  // READ - pass query into find()
  const result = await collection.find(inQuery).toArray(); 

  console.log(`Query: ${JSON.stringify(inQuery, null, 2)} \n` );
  console.log("Documents returned from query: ");
  console.log(result);

}
module.exports = read;