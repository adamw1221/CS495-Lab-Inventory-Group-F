
async function main() {

    //imports
    const runServer = require("./run_server.js");
    const testOperations = require("./test_operations.js");

    //connects to mongodb server
    const client = await runServer();

    //performs operations
    if (client) {
        await testOperations(client);
        await client.close();
    }

}

main();