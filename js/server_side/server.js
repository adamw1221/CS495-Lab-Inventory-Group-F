const express = require('express');
const cors = require('cors');
const {runServer, sessionConfig} = require("./run_server.js");
const read = require("../operations/doc_read.js");
const update = require("../operations/doc_update.js");
const { add, addUser } = require("../operations/doc_add.js");
const { authUser, loginLimiter, rateLimiter } = require("./auth.js");
const remove = require("../operations/doc_remove.js");
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const { requireLogin, requireAdmin, hashPassword } = require('./helpers.js');


const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..","..", "css",)));
app.use(express.static(path.join(__dirname, "..","..", "html",)));
app.use(express.static(path.join(__dirname, "..", "client_side",)));
app.use(express.static(path.join(__dirname, "..","..", "img",)));
app.use(session(sessionConfig));

// Start server
let client;
async function initializeServer() {
    client = await runServer();
    return client;
}
client = initializeServer();

// Page Routing Below

// "home" page
app.get("/", requireLogin, function (req, res) {

    // Redirect user based on their role
    if (req.session.role === 'admin') {
        res.redirect('/add');
    } else {
        res.redirect('/userProfile');
    }
});

app.get('/login', (req, res) => {
    const errorMessage = req.query.error || '';
    res.redirect('/login.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'login.html'));
});
  
app.get('/userProfile', requireLogin, (req, res) => {
    res.redirect('/userProfile.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'userProfile.html'));
});

app.get('/update', requireLogin, requireAdmin, (req, res) => {
    res.redirect('/update.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'update.html'));
});

app.get('/add', requireLogin, requireAdmin, (req, res) => {
    res.redirect('/add.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'add.html'));
});

app.get('/addUser',requireLogin, requireAdmin, (req, res) => {
    res.redirect('/addUser.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'addUser.html'));
});

app.get('/remove', requireLogin, requireAdmin, (req, res) => {
    res.redirect('/remove.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'remove.html'));
});

app.get('/removeUser', requireLogin, requireAdmin,(req, res) => {
    res.redirect('/removeUser.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'removeUser.html'));
});

app.get('/checkoutParts', requireLogin, (req, res) => {
    res.redirect('/checkoutParts.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'checkoutParts.html'));
});

app.get('/returnParts', requireLogin, (req, res) => {
    res.redirect('/returnParts.html');
    // res.sendFile(path.join(__dirname,"..","..", "html",'returnParts.html'));
});

// Operation Requests Below

app.post('/auth/login', loginLimiter, async (req, res) => {
    console.log("LOGIN: ", res.body);
    let username = req.body.username;
    let password = req.body.password;

    try{//Note: returns user object
        const user = await authUser(username, password, client, "InventoryDB", "Roster");
        console.log('Authentication successful:', user);

        if (user["userType"] === 'admin' ) {
            // console.log("Admin in!");
                req.session.userId = username;
                req.session.role = "admin";
                res.redirect('/add');
            } 
            else {
                req.session.userId = username;
                req.session.role = "student";
                res.redirect('/userProfile');
            }

    }
    catch(error){
        console.error('Authentication failed:', error);

        // Redirect back to login with error query parameter
        res.redirect('/login?error=Authentication failed.'); 
    }

});

app.get('/getEquipment', requireLogin,rateLimiter, async (req, res) => {
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

app.get('/getUser', (req, res) => {
    console.log('get request received: ', req.url);

    try {
        if (req.session.userId) {
            res.status(200).send(req.session.userId);
        }
        else {
            res.status(500).send();
        }
    }
    catch (error) {
        console.error("Error in /getUser route:", error.message);
        res.status(500).send();
    }
});

app.post('/data', (req, res) => {
    console.log('post request received:', req.url);
    const requestData = req.body;
    console.log('received data: ', requestData);
    res.send('received post request. data received: ', JSON.stringify(requestData));
});

app.post('/checkout', rateLimiter, async(req, res) => {
    console.log('request received:', req.url);
    // console.log('request type:', req.body.type);
    // console.log('request body:', req.body);

    if (client) {
        if (req.body.type == "validate") {
            console.log('request type validated:', req.body.type);

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
        console.log('request type NOT validated:', req.body.type);

        res.status(500).send("Sorry there's a problem with the website!" +
            "Please try again later.");
    }
});

app.post('/userprofiledata',requireLogin, async(req, res) => {
    console.log(req.body);
    const query = req.body;
    //const query = {Checkout_Status: username};
    // need to modify/add new read operation that can return multiple documents?
    const result = await read(client, "InventoryDB", "Robotics_Lab", query);
    res.status(200).send(result);
});

app.post('/makereturn', requireLogin, async(req, res) => {
    console.log('request received:', req.url);
    console.log(req.body);

    const filter = {"id": req.body.id};

    const Checkout_Status = {}
    const updateDB = {"Checkout_Status": Checkout_Status,
                              "Available": "Yes"};
    
    try{
        const result = await update(client, "InventoryDB", "Robotics_Lab", filter, updateDB);
        console.log(result);
        if (result){
            console.log('Checkout status cleared successfully.');
            res.status(200).send("clear");
        }
        else {
            console.log('Failed to clear status.');
            res.status(500).send('Failed to clear status.');
        }

    } catch (error){
        console.error('Error:', error);
        res.status(500).send('An error occured while clearing Checkout_Status.');
    }
});

app.post('/', rateLimiter,  async(req, res) => {
    console.log('\nrequest received:', req.url);

        if (client) {
            if (req.body.type == "read") {
                console.log(req.body.input);
                const query = {id: req.body.input};
                const result = await read(client, "InventoryDB", "Robotics_Lab", query);
                res.status(200).json({message: result});
            }
            else if (req.body.type == "update") {
                const filter = req.body.filter;
                const updateDB = req.body.update;
                const result = await update(client,"InventoryDB", "Robotics_Lab",
                    filter, updateDB);// returns string
                res.status(200).json({message : result}); //0 or 1
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
                const document = req.body.data;
                const result = await add(client,"InventoryDB", "Robotics_Lab",
                    document);// returns string
                res.status(200).json({message: result});
                // res.status(200).send(result);
            }
            else if (req.body.type == "addUser") {
                console.log('\n User Data: ', req.body.userInfo);
                try {
                    var userInfo = req.body.userInfo;
                    const hashedPassword = await hashPassword(userInfo.password, 10);
                    userInfo.password = hashedPassword;

                    const result = await addUser(client,"InventoryDB", "Roster", userInfo);
                    res.status(200).json({ message: result});
                } catch (error) {
                    if(error.errorResponse && error.errorResponse.code === 11000){
                        res.status(500).json({ error: "Duplicate Username Error."});
                    } else {
                        console.error("Error adding user:", error.errorResponse);
                        res.status(500).json({ error: "An error occurred while adding the user."});
                    }
                }
            }
            else if (req.body.type == "removeUser") {
                console.log('Removing User: ', req.body.input);
                const query = { "username": req.body.input };
                const result = await remove(client, "InventoryDB", "Roster", query);
                //console.log(result.deletedCount);
                if (result.deletedCount == 1) {
                    res.status(200).json({ success: true, message: 'Document removed successsfully.' });
                } else {
                    res.status(404).json({ success: false, message: 'Document not found or already removed.' });
                }
            }
        }else{
            res.status(500).send("Sorry there's a problem with the website!" +
            "Please try again later.");
        }
});

app.get('/test', (req, res) => {
    // console.log("\nThis is a test route for our automated testing framework.\n");
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
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

function getClient() {
    return new Promise((resolve, reject) => {
        if (client) {
            resolve(client);
        } else {
            // If client is not available, wait for it to be initialized
            const interval = setInterval(() => {
                if (client) {
                    clearInterval(interval);
                    resolve(client);
                }
            }, 1000); // Check every second
        }
    });
}

module.exports = {app, getClient};