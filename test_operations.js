
async function testOperations(inClient) {

    // imports
    const update = require("./doc_update.js");
    const read = require("./doc_read.js");
    const remove = require("./doc_remove.js");

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
        "InventoryDB",
        "Robotics_Lab",
        { id: 'turtlebot13' }
    );

    await remove(
        inClient,
        "sample_analytics",
        "accounts",
        {account_id: 903542}
    );

}

module.exports = testOperations;