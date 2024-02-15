
async function testOperations(inClient) {

    // imports
    const update = require("./doc_update.js");
    const read = require("./doc_read.js");

    // list of operations to be done
    await update(
        inClient,
        "sample_airbnb",
        "listingsAndReviews",
        { name: "Ribeira Charming Duplex" },
        { minimum_nights: "2", maximum_nights: "30"}
    );

    await read(
        inClient,
        "sample_analytics",
        "accounts",
        {limit : {$lt: 9000} }
    );

}

module.exports = testOperations;