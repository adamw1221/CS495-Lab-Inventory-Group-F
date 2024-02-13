async function testOperations(inClient) {

    //imports
    const update = require("./doc_update.js");

    //list of operations to be done
    await update(
        inClient,
        "sample_airbnb",
        "listingsAndReviews",
        { name: "Ribeira Charming Duplex" },
        { minimum_nights: "2", maximum_nights: "30"}
    );

}

module.exports = testOperations;