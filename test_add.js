"use strict"

async function add(inDB, inCollection, inQuery) {

  const runServer = require("./run_server.js");

  // connects to mongodb server
  const inClient = await runServer();

  const db = inClient.db(inDB);
  const collection = db.collection(inCollection);

  await collection.insertOne({
    name: inQuery
  });

  await inClient.close();

}

window.onload = function initialize() {
    document.getElementById("addPartButton").onclick = function(){
      var textBoxValue = document.getElementById("textbox").value;
      var sanitizedInput = textBoxValue.replace(/'/g, ''); //input sanitation,
                      //not sure what other characters need to be removed,
                      //for SQL injection stuff, should check with cyber guys
                      //next meeting
      add("InventoryDB", "Robotics_Lab", { id: sanitizedInput });
      alert("New part " + sanitizedInput + " added!");
    };
}