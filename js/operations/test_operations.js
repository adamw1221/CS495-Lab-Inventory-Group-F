
async function testOperations(inClient) {

    // imports
    const update = require("./doc_update.js");
    const read = require("./doc_read.js");
    const remove = require("./doc_remove.js");

    // sample list of operations to be done

    await read(
        inClient,
        "InventoryDB",
        "Robotics_Lab",
        { id: 'turtlebot13' }
    );

}

module.exports = testOperations;