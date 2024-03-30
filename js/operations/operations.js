// Allows us to only import "operations" to our server file
// and use the dot operator to access operations that we require here
// e.g. operations.read(client,params)
//could shorten to op.read(client, params) by changing the func name below
const update = require("./doc_update");
const read = require("./doc_read");
const remove = require("./doc_remove");

const operations = {
    update: async (inClient, filter, updates) => {
        // Your update logic here

        // {"Issue" : {"Type": "Hardware" , "Priority": "High"} }
        return await update( // returns string
            inClient,
            "InventoryDB",
            "Robotics_Lab",
            filter,
            updates
        );
    },
    read: async (inClient, params) => {
        // Your read logic here
        return await read(
            inClient,
            "InventoryDB",
            "Robotics_Lab",
            params
        );
    },
    remove: async (inClient) => {
        // Your remove logic here
        await remove(
            inClient,
            "sample_analytics",
            "accounts",
            {account_id: 903542}
        );
    }
};

module.exports = operations;
