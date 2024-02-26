
async function update(inClient, inDB, inCollection, inFilter, inChanges) {

    // imports
    const db = inClient.db(inDB);
    const collection = db.collection(inCollection);

    // update criteria
    const filter = inFilter;

    // new values for the fields to be updated
    const updateDoc = {
        $set: inChanges
    };

    // update the document
    const result = await collection.updateOne(filter, updateDoc);

    // log changes to console
    console.log(`${result.modifiedCount} document(s) updated`);

    return `${result.modifiedCount}`;
}

module.exports = update;