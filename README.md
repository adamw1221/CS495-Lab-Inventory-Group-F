# CS495 - Lab Inventory Project

## Project Focus
Our job is to build a web application to help the Robotics Lab manage inventory​

The web app will allow users to add, update, remove, and read lab equipment. It will also allow users to check out this equipment and notify users when it is due back.​

Final Demo Link: https://youtu.be/L_HsYMrAULM

## Team Member Bios

### Preston Mazzei
Senior of Computer Science at UA

email: pjmazzei@crimson.ua.edu

mobile: (803) 719-1314

### Blake Cantrell
Senior of Computer Science at UA

email: btcantrell@crimson.ua.edu

mobile: (912) 288-4170

### Owen Campbell
Senior of Computer Science at UA

email: odcampbell@crimson.ua.edu

mobile: (334) 328-5115

### Adam Wrote
Senior of Computer Science and Mechanical Engineering at UA

email: awwrote@crimson.ua.edu

mobile: (702) 630-9946

Our Lab Inventory site is a web application that uses Node Js, Express Js, and Mongodb (Atlas). 
# How To Install Software

### 1 Install Node.js (LTS) and NPM 
1.	In your terminal/command prompt, run these commands to see if you have Node and Npm: 

    1.	**node -v** and **npm -v**
       
    2.	You should see something like “**v20.11.0 and 10.5.2**” respectively

2.	If not, you can download an installer for your system then run it and follow on screen instructions:
    
    1.	The will install both Node and Npm: https://nodejs.org/en/download
    2.	Here's documentation for Node: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs

### 2	Install Git
1.	Run this command to see if you have git installed: 
    
    1.	**git --version** 
    
    2.	You should get a response like "**git version 2.33.0**" 

2.	If not, you will need to install git for your device:
    
    1.	(e.g., windows 64 bit) via: https://git-scm.com/downloads

3.  Use all default settings. There are also tutorial videos for this on YouTube     https://youtu.be/dqFJVEIJEU0?si=ZWT3sDrYuDu8fiaw

### 3	Setting up your local git repo with our remote repo:
1.	Use this command to make a copy of the remote repository so you can get stuff from it and send stuff to it. 
    
    2.	**git clone https://github.com/adamw1221/CS495-Lab-Inventory-Group-F.git**
    
    3.	You should now have the folder **CS495-Lab-Inventory-Group-F**

2.	Navigate into that folder with command: **cd CS495-Lab-Inventory-Group-F**
3.	You should now see all of our application code hosted on our main branch on github.

### 4	Setting up a personal branch
This allows you to make changes to your own copy without affecting the main branch.

1.	From CS495-Lab-Inventory-Group-F, use this command: 
    
    1. **git checkout -b featureBranchName**
        1. Feel free to rename featureBranchName to something meaningful
    
    3. You should get a message saying that you switched to the new branch you just created. 
    
    4. Now you are good to make changes to code and commit them: 
        1. See the "**Run Locally**" section first, and our Feature description and our modify/extend sections below offer further guidance
           
        2. **git add .**   (to stage all files that you’ve modified) 
    
    5. When ready to locally “save” those changes, use: **git commit -m "code for this checkpoint"**
    
    6. To send them to your remote feature branch use: **git push origin featureBranchName** . The first time you do this your new branch will become visible on github at https://github.com/adamw1221/CS495-Lab-Inventory-Group-F

### 5	Add Environment Variable File (Deprecated)
((UPDATE - This file should already exist on this branch so you can skip these steps.
Note: Currently, our database and collection names are hardcoded in /js/operations, run_server.js, and server.js, but these names could be added to our .env file for better maintenance.))

This will connect the application to mongodb

1. Create a file named **.env** in the top level of folder **CS495-Lab-Inventory-Group-F**

2. Add this connection string for our generic user (level: project cluster manager):
    1. MONGODB_URI = mongodb+srv://LabAdmin:kNvoF1iXUX3GAfzk@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority
       
    3. To log into our MongoDB Atlas UI at: https://account.mongodb.com/account/login
        1. Username: LabAdmin
           
        2. password: kNvoF1iXUX3GAfzk
    4. If the connection string ever becomes deprecated, Mongo Atlas typically requires you make a new user to generate a new connection string in the proper format. This would be done via the link above.
    5. For security purposes, the network access tab could manage IP address you're allowed to connect to the db from. Currently, there is no such restriction as this is in development, but for deployment, this would need to be changed to accommodate a server hosting solution (so that server could connect) and admin IP's for developmental purposes.

### 6 Errors
((Update - node_modules should no longer be stored in our github, so you will need to run **npm install** when you first clone our repo.
If node_modules is ever accidentally pushed to github and you happen to pull it down, the command below to remove it will help with errors related to new packages/dependencies 
you might not have that are specified in the package json.))

If the run commands in the next section give you node_module errors, these 2 should fix it.  From the folder CS495-Lab-Inventory-Group-F, run:
1. **rm -rf node_modules**
    1. If you're on powershell or this doesn't work, you can manually delete the node_modules package for the same effect
       
2. **npm install**

  
### 7 Run Locally:
1. If you don't have a node_modules package in your CS495-Lab-Inventory-Group-F folder, or if you just cloned our repo, run this command:
    1. **npm install**
    2. This is a normal part of a node js workflow, as the node_modules build relies on dependencies specified in the package.json. Thus, the package.json is all we need to share among developers.

2. From the folder CS495-Lab-Inventory-Group-F, run the command  **npm start**  to start our server and connect to our database.
   
   1. Or run **node js\server_side\server.js**

3. In your web browser paste and go to: **http://localhost:3000**
  
5. You should be directed to a login page.
   1. For access to all pages -> **username & password: temp2**

   2. For access to student view -> **username & password: classmate**
      
   4. View our following **Feature List** section for more info on how to use our webpage UI.
      
6. To run our automated test, run command: **npm test**
    1. See our test.md file for more info
    
7. Points of interest:
   1. Our html folder holds all of our html files to modify.
   2. Our js/operations folder holds basic CRUD operations that are imported into server.js and used to handle requests that hit our database
   3. Our html pages have <script> header tags that link to javascript files in js/client_side. These client-side files add functionality to our webpages and often make requests to the server, using user input from the webpages.
   4. Server.js is where all of our endpoints are defined and requests are handled.
   5. Auth.js holds helper functions and middleware related to logins, rate limiting, and security. Rate limits currently allow 100 requests per IP address within 10 minutes. Sessions log out users after 30 minutes, but we didn't get to implement a user logout which should be trivial.
   6. Login sends requests from the login form in login.html, so it currently doesn't have/need a clientside js file. Student users can currently see all html pages in the navbar but won't be served admin pages like add, remove, or update.
   7. To view all checked out equipment, hit the Robotics_Lab collection in our db with this query: { "Available": "No" } (mongo db atlas offers a UI for this as well, see **step 5**). Server session data has to be sent via a request/endpoint to the client to be stored in client session. We do this with usernames for example, since login.js has no clientside page to do so and we don't want to expose this in an imbedded js script in the html.
   8. Equipment is often stored in the client session to cut down requests against the database, however, that means opening a new tab is often needed to refresh the client session if the database has been updated. This may not be ideal and could be changed by modifying the eventlistener in testCheckoutParts.js.
   9. Run_server.js sets up our mongodb connection and uses that database as our server session store instead of an external server session (which in our case would be with our server hosting solution heroku). This was not a necessary change, just one of convenience for viewing the sessions.
   10. Test_db_connect.js isn't used in our application, but it can be used in conjunction with js/operations/test_operations.js to hit our database directly without going through the webpage UI. This is useful for defining an update to all of the parts or performing some other one-off CRUD operation.
   11. Our database can also be hit with python scripts via our connection string from **step 5** . We used that to add the parts to the database from an Excel spreadsheet.
   12. "Test" in a filename is just a lingering part of our naming conventions from development.



## Feature List:

### Login Screen
Existing users can log in by providing username and password. There is no way to create a new user from this screen, since not everyone who has access to the url should be able to check out lab equipment. When the "Login" button is clicked, if the username or password are incorrect, or do not exist, the page will respond with "Authentication failed." If one of the two text fields is left blank, the page will provide a pointer labeled "Please fill out this field."

### Checkout Parts
On the checkout parts page, when the page is loaded, a dropdown of all available lab equipment is populated. This list is taken via MongoDB query. Once the page is loaded, the user can select an equipment to checkout from the "Select Equipment" dropdown, then select a checkout date/time and return date/time from the remaining form fields. Once the user is done configuring the checkout parameters, they can click the "Checkout" button. When the button is pressed, two main processes take place, in sequence:
1. The data validation process takes place. All form fields are saved, then the fields are immediately cleared. The fields are wrapped into a document and sent to the server side for validation via http Post request. Each field is validated to make sure a possible checkout is being requested. The equipment ID is cross checked with the information from MongoDB to make sure the selected equipment is available. The dates and times selected are checked to make sure the return date is not before the checkout date, neither date is in the past, and that the checkout period isn't too long. If there are one or more problems, the server will return with a list of issues, and if there are no issues, the server will return an empty list.
2. After data validation, if the server returned any issues, it notifies the user via an alert message, and does not proceed with the checkout process. Otherwise, one of these three cases takes place:
- Case One: The equipment is not available. The user is notified of this, and no checkout is attempted.
- Case Two: The equipment is available, but the `Request_Needed` field is marked as `"Yes"`. The user is notified that a special request needs to be made to the instructor to verify that the user is certified/authorized to check out the equipment. *Note: Currently, the rest of this pipeline is nonexistent, since there was not enough time to implement an automated email service.* Thus, no checkout is attempted, and the process ends.
- Case Three: The equipment is available, and no request is needed. A request is sent to the middleware server to update the MongoDB database for the document corresponding to the checked out equipment. The `Checkout_Status` and `Available` fields are updated to reflect the change, and some fields are recorded about the checkout itself, such as the checkout date/time, the return date/time, and the username of the user who checked out the equipment. If the DB operation was successful, the user is notified that their equipment was successfully checked out.

### Update Parts
This page is for admin level users only (developers and professors). The user can input text into two different fields. The "Equipment ID" field is the name of the equipment that the user wants to modify. The "Changes" field is a json document format listing each field of the document and what to change it to. After inputting data, the user can click the "Update Equipment" button. When the button is clicked, a request is sent to the middleware server to handle the input validation and the MongoDB query generation. The server checks to make sure the given "Equipment ID" matches an existing ID, the "Changes" field is valid JSON, and the fields of the JSON document are all valid/existing fields for the equipment. After this check is completed, a MongoDB update query is generated using the given data. When the operation is completed, the user is notified that the update was successful. *Note: The style and functionality of the update page are not fully finished and are on the project backlog.*

### Add Parts
This page is for admin level users only (developers and professors). The user can input information into the form fields. These fields correspond to the types of information that is expected to be stored for each lab equipment part. After the user has finished filling out the fields, they can click on the "Add Part" button. When clicked, this wraps the input (after first shortening and formatting them) into a JSON document and sends an http Post request to the middleware server. There, the input is checked to see if each field has a correct input type. *Note: The exact specifics are not validated, such as if the given MAC address is valid. This is a task on the project backlog.* The server then processes the MongoDB operation with the `addOne()` function, and sends the result (whether the operation was successful or not) to the user.

### Add User
This page is for admin level users only (developers and professors). The user can Enter a new username and password into the two text form fields, then they can select whether this user is a "Student" type or "Admin" type. Then, the user can click the "Add User" button. Once clicked, the feilds are saved, then cleared from the page, then wrapped into a document and sent to the middleware via http post request for processing. Once there, the middleware calls the `addUser()` function, which is similar to the `addOne()` function. It attempts to add the (hashed) username and password into the user database, and returns a variety of return codes, depending on whether it was successful, or if it returned an error, such as a duplicate entry or other error. These errors, if any, are returned to the client and displayed to the user via alert message. If the operation was successful, the user is notified.

### Remove Old Parts
This page is for admin level users only (developers and professors). The user can enter an equipment ID (such as "turtlebot13a") into the "Equipment ID" form field. Once entered, they can click the "Remove Part" button, which sends an http request to the server. Once received, the server attempts to perform a remove operation on the database, and returns to the user a message denoting whether the operation was successful or not.

### Remove Old user
This page is for admin level users only (developers and professors). This process is exactly the same as the "Remove Old Parts" tab, except it interacts with the user database instead of the equipment database.

### My Checkouts
Once this page is loaded, an http get request is sent to the server. This request is just to verify the username associated with the session. Once that username is obtained, a post request is sent back to the server. The server then prepares a query statement to select all documents in the equipment database that have a matching `username` in the `Checkout_Status` object attribute. An array of these documents (if any) is returned to the client. Once received, the client performs a loop function that dynamically creates the necessary table html DOM elements to populate the table with the equipment name, checkout date, return date, and status, where the latter is a comparison between the checkout/return dates and the current date. "Status" has three possible values:
- "Awaiting": When the current date is before the checkout date. The cell is colored yellow.
- "OK": When the current date is between the checkout date and the return date. The cell is colored green.
- "Overdue": When the current date is after the return date. The cell is colored red.
The date values in the table are formatted using the default string conversion from JavaScript `Date()` objects. *Note: A feature that provides a placeholder when the user has no checked out equipment was meant to be implemented, but is in the project backlog.*

### Return Parts
This page works similarly to the "My Checkouts" page for the first element. The table will populate all of the user's checked out items, except those that have not yet reached the checkout date. Additionally, the table includes a button selector to select which equipment is being returned. Below the table, there are two form fields. The first is a text entry where the user can describe where exactly the part was returned. The second is a file upload component, where the user can browse their local storage for an image to upload, showing where the part was returned. The description text field is required to have at least some text (i.e. not blank), but the file upload is optional. Once the user is done, they can click the "Submit" button. Once clicked, a request is sent to the server. The server then constructs an update query to the MongoDB database to change the selected document's `Available` field to `Yes` and `Checkout_Status` field to `null`. If this operation was successful, the server returns a response that triggers an alert message on the client side, indicating that the return was successful.

### Other Features
- The navigation bar and other component styling is designed to adjust relative text sizes and object scaling for smaller screens, such as a tablet or phone. These are present in the stylesheet's screen media queries at the bottom.
- There is a planned feature where the navigation bar html DOM is dynamically generated when the logged in user lands on our site so that the tabs are only visible with the proper permissions (student or admin), but this feature is on the backlog.



## How to Modify/Extend Software:
Our project involves a front-end of HTML files with CSS elements, with functionality implemented with JavaScript. Our back-end is our server, which uses MongoDB. Our front end can be changed by modifying our CSS and HTML files or adding additional HTML files for any additional pages. The JavaScript files can be manipulated similarly. Our dependencies are listed in our package.json file, under “dependencies”. We used Heroku to host our website and server. Heroku hosts our code by installing the dependencies itself, so those dependencies are not installed on our GitHub. To host on another platform, there are a few things that might need changed. Heroku assigns a port dynamically to an application, so our program first gets that port from Heroku, and then applies it in each of the JavaScript files for each of the web pages. To host on another platform, this might need to be updated, depending on how that platform assigns a port value. Our backlog and test cases can be found on GitHub, along with instructions for running those test cases. For our code styling, we attempted to follow the conventions listed in the link below: 
https://www.w3schools.com/js/js_conventions.asp 



## Frequently Asked Questions (FAQs):
### How do I install the software?
- Follow the step-by-step installation guide provided in the documentation, including installing Node.js, NPM, and Git. Make sure to set up environment variables and dependencies as instructed. If you encounter any issues during installation, refer to the troubleshooting section or seek assistance from the development team.

### How do I log in to the application?
- Use the provided login screen to enter your username and password. Note that there is no option to create a new user from this screen. If you forget your credentials, contact the system administrator for assistance in resetting your password.

### How do I checkout lab equipment?
- Navigate to the "Checkout Parts" section, select the equipment you want to checkout, specify checkout and return dates/times, and click the "Checkout" button. Follow the prompts and alerts for any errors or special requests. For additional assistance with the checkout process, refer to the user guide or contact support for help.

### How do I return lab equipment?
- Visit the "Return Parts" page, select the equipment you wish to return, provide a description of where it was returned, and optionally upload an image. Click the "Submit" button to complete the return process. After returning equipment, ensure that the status is updated accordingly and verify that the returned equipment is no longer listed under your account.



## Troubleshooting:
### Installation Issues:
- Ensure you have correctly installed Node.js, NPM, and Git as per the provided instructions. Verify that environment variables are set up correctly, and dependencies are installed without errors. If you encounter any issues during installation, double-check your system requirements and reinstall.

### Database Connection Problems:
- Make sure you have set up the environment variables correctly, especially the MongoDB connection string. Verify that the MongoDB Atlas UI credentials are accurate and allow access to the database. If you experience difficulties connecting to the database, ensure that your network settings and firewall configurations permit the required connections.

### Frontend and Backend Integration:
- Be aware of the frontend and backend components' interactions. Check for proper routing and data validation between the client-side and server-side components. If you notice any inconsistencies or unexpected behavior, review the code for potential integration issues and consult the development team for assistance.

### Hosting Considerations:
- If deploying the application to a different hosting platform than Heroku, ensure that port assignments and other platform-specific configurations are adjusted accordingly in the code. Test the application thoroughly on the new hosting environment to identify any compatibility issues or performance concerns before deploying it for production use.

### Hosting Node Module Issues:
- During development many files had trouble getting read from the node modules when hosting to the Heroku server. If you run any issues regarding files from the installed node modules, ensure that your configurations for ignoring files is set up correctly. If the issue persists, refer to the installation guide to uninstall and reinstall the node modules. 
- `@mongodb-js/saslprep`: This file contains invalid characters and cannot be read from the modules. This file is not crucial to the program and can be ignored.
