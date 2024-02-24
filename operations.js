const update = require("./doc_update");
const read = require("./doc_read");
const remove = require("./doc_remove");

const operations = {
    update: async (inClient, params) => {
        // Your update logic here
        return await update(
            inClient,
            "InventoryDB",
            "Robotics_Lab",
            params
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
