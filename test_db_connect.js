
async function main() {

    const runServer = require("./js/server_side/run_server.js");
    const testOperations = require("./js/operations/test_operations.js");

    // connects to mongodb server
    const client = await runServer();

    // performs operations
    if (client) {

        await testOperations(client);
        await client.close();
        
    }

}

main();