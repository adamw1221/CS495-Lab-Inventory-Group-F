const express = require('express');
const cors = require('cors');
const runServer = require("./run_server.js");
const read = require("../operations/doc_read.js");
const update = require("../operations/doc_update.js");
const add = require("../operations/doc_add.js");
const authUser = require("./auth.js");
const remove = require("../operations/doc_remove.js");
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const { requireLogin, requireAdmin } = require('./helpers.js');

const app = express();
const port = 3000;

app.use(express.static('LabInventory'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "..", "html", 'checkoutParts.html'));
});
*/
app.use(express.static(path.join(__dirname, "..","..", "css",)));
app.use(express.static(path.join(__dirname, "..","..", "html",)));
app.use(express.static(path.join(__dirname, "..", "client_side",)));
app.use(express.static(path.join(__dirname, "..","..", "img",)));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));

// Start server
let client;
async function initializeServer() {
    client = await runServer();
}
initializeServer();

// Page Routing Below

  // "home" page
app.get("/", requireLogin, function (req, res) {
    // console.log("Home! Session UserID is:", req.session.userId);
    // console.log("Home! SessionRole is:", req.session.role);

    // Redirect user based on their role
    if (req.session.role === 'admin') {
        res.redirect('/add');
    } else {
        res.redirect('/userProfile');
    }
});

app.get('/login', (req, res) => {
    const errorMessage = req.query.error || '';
    res.sendFile(path.join(__dirname,"..","..", "html",'login.html'));
});
  
app.get('/userProfile', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname,"..","..", "html",'userProfile.html'));
});

app.get('/update', requireLogin, requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname,"..","..", "html",'update.html'));
});

app.get('/add', requireLogin, requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname,"..","..", "html",'add.html'));
});

app.get('/remove', requireLogin, requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname,"..","..", "html",'remove.html'));
});

app.get('/checkoutParts', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname,"..","..", "html",'checkoutParts.html'));
});

// Operation Requests Below

app.post('/auth/login', async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    //Note: returns user object- users probably need a checkout field?
    authUser(username, password, client, "InventoryDB", "Roster")
    .then(user => {
        console.log('Authentication successful:', user);

        if (user["userType"] === 'admin' ) {
            console.log("Admin in!");
                req.session.userId = username; //Note: Should be unique? might be useful
                req.session.role = "admin";
                res.redirect('/update');
            } 
            else {
                req.session.userId = username;
                req.session.role = "student";
                res.redirect('/userProfile');
            }

    })
    .catch(error => {
        console.error('Authentication failed:', error);

        // Redirect back to login with error query parameter
        res.redirect('/login?error=Authentication failed.'); 
    });

});

app.get('/getEquipment',requireLogin, async (req, res) => {
    console.log('get request received: ', req.url);

    try{
        if (client){
            const query = { "Available": { $ne: "No" } }
            const products = await read(client, "InventoryDB", "Robotics_Lab",query,
                { _id:0, name: 1, id: 1} );
            res.json({ data: products });
        } 
        else{
            res.status(500).send();
        }
    } catch (error){
        console.error("Error in /getEquipment route:", error.message);
        res.status(500).send();
    }
    
});

app.post('/data', (req, res) => {
    console.log('post request received:', req.url);
    const requestData = req.body;
    console.log('received data: ', requestData);
    res.send('received post request. data received: ', JSON.stringify(requestData));
});

app.post('/checkout', async(req, res) => {
    console.log('request received:', req.url);

    if (client) {
        if (req.body.type == "validate") {
            // validate checkout input
            const issues = [];

            // validate equipment selection
            console.log(req.body.input["selectedEquipment"]);
            const query = {id: req.body.input["selectedEquipment"]};
            const result = await read(client, "InventoryDB", "Robotics_Lab", query);
            console.log(result[0]["Available"]);
            if (result[0]["Available"] != "Yes") {
                issues.push("Selected equipment is not available.");
            }

            if (result[0]["Request_Needed"] == "Yes") {
                issues.push("Email professor to verify your permissions for this equipment.");
            }

            // validate checkout date
            console.log(req.body.input["checkoutDate"]);
            console.log(req.body.input["checkoutTime"]);
            const checkoutDate = Date.parse(req.body.input["checkoutDate"]
                                            + "T"
                                            + req.body.input["checkoutTime"]);
            try {
                if (checkoutDate <= Date.now()) {
                    issues.push("Checkout time cannot be in the past.");
                }
            }
            catch {
                issues.push("Must select a valid checkout date and time.");
            }

            // validate return date
            console.log(req.body.input["returnDate"]);
            console.log(req.body.input["returnTime"]);
            const returnDate = Date.parse(req.body.input["returnDate"]
                                            + "T"
                                            + req.body.input["returnTime"]);
            try {
                if (returnDate <= Date.now()) {
                    issues.push("Return time cannot be in the past.");
                }
            }
            catch {
                issues.push("Must select a valid return date and time.");
            }
            try {
                if (returnDate <= checkoutDate) {
                    issues.push("Return date cannot be before checkout date.");
                }
            }
            catch {}

            // send response based on validation
            if (issues.length > 0) {
                res.status(200).send(issues);
            }
            else {
                res.status(200).send(["No issues"]);
            }
        }
        else if (req.body.type == "checkout") {
            // perform checkout process

            // transform input data
            const Checkout_Status = {};
            Checkout_Status["username"] = req.body.input["username"];
            Checkout_Status["checkoutDate"] = Date.parse(req.body.input["checkoutDate"]
                                                            + "T"
                                                            + req.body.input["checkoutTime"]);
            Checkout_Status["returnDate"] = Date.parse(req.body.input["returnDate"]
                                                            + "T"
                                                            + req.body.input["returnTime"]);
            
            const filter = {"id": req.body.input["selectedEquipment"]};
            const updateDB = {"Checkout_Status": Checkout_Status,
                              "Available": "No"};
            
            // run a document update with the supplied data
            const result = await update(client,"InventoryDB", "Robotics_Lab",
                                        filter, updateDB);

            // return operation status
            res.status(200).send(result);

        }
    }
    else {
        res.status(500).send("Sorry there's a problem with the website!" +
            "Please try again later.");
    }
});

app.post('/userprofiledata', async(req, res) => {
    console.log(req.body);
    const username = req.body;
    const query = {Checkout_Status: {username: username}};
    // need to modify/add new read operation that can return multiple documents?
    const result = await read(client, "InventoryDB", "Robotics_Lab", query);
    res.status(200).send(result);
});

app.post('/', async(req, res) => {
    console.log('request received:', req.url);

        if (client) {
            if (req.body.type == "read") {
                console.log(req.body.input);
                const query = {id: req.body.input};
                const result = await read(client, "InventoryDB", "Robotics_Lab", query);
                res.status(200).send(result);
            }
            else if (req.body.type == "update") {
                const filter = req.body.filter;
                const updateDB = req.body.update;
                const result = await update(client,"InventoryDB", "Robotics_Lab",
                    filter, updateDB);// returns string
                res.status(200).send(result); //0 or 1
            }
            else if (req.body.type == "remove") {
                console.log('Removing Document: ', req.body.input);
                const query = { id: req.body.input };
                const result = await remove(client, "InventoryDB", "Robotics_Lab", query);
                //console.log(result.deletedCount);
                if (result.deletedCount == 1) {
                    res.status(200).json({ success: true, message: 'Document removed successsfully.' });
                } else {
                    res.status(404).json({ success: false, message: 'Document not found or already removed.' });
                }
            }
            else if (req.body.type == "add") {
                const itemId = req.body.filter;
                const itemName = req.body.name;
                const result = await add(client,"InventoryDB", "Robotics_Lab",
                    itemId, itemName);// returns string
                res.status(200).send(result);
            }
        }else{
            res.status(500).send("Sorry there's a problem with the website!" +
            "Please try again later.");
        }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/*
    // imports
    const runServer = require("./run_server.js");
    const testOperations = require("./test_operations.js");

    // connects to mongodb server
    const client = await runServer();

    // performs operations
    if (client) {

        await testOperations(client);
        await client.close();
        
    }
*/