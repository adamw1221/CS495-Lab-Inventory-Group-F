//imports


/////////////////////////////////////////////////////////////////////////////////////////

async function update(inClient, inDB, inCollection, inFilter, inChanges) {

    const db = inClient.db(inDB);
    const collection = db.collection(inCollection);

    // Update criteria
    const filter = inFilter;

    // New values for the fields to be updated
    const updateDoc = {
        $set: inChanges
    };

    // Update the document
    const result = await collection.updateOne(filter, updateDoc);

    console.log(`${result.modifiedCount} document(s) updated`);

}

module.exports = update;