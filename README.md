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
    
    1.	https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
        1.	This will install both Node and Npm

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
    
    2. You should get a message saying that you switched to the new branch you just created. 
    
    3. Now you are good to make changes to code and commit them: 
        1. See the "**Add Environment Variable File**" section first, and our Feature description and our modify/extend sections below offer further guidance
           
        2. **git add .**   (to stage all files that you’ve modified) 
    
    4. When ready to locally “save” those changes, use: **git commit -m "code for this checkpoint"**
    
    5. To send them to your remote feature branch use: **git push origin featureBranchName** . The first time you do this your new branch will become visible on github at https://github.com/adamw1221/CS495-Lab-Inventory-Group-F

### 5	Add Environment Variable File 
(UPDATE - This file should already exist on this branch, along with the **headers** from step 6. If so, you can skip these steps.)

This will connect the application to mongodb

1. Create a file named **.env** in the top level of folder **CS495-Lab-Inventory-Group-F**

2. Add this connection string for our generic user:
    1. MONGODB_URI = mongodb+srv://LabAdmin:kNvoF1iXUX3GAfzk@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority
       
    3. To log into our MongoDB Atlas UI at: https://account.mongodb.com/account/login
        1. Username: LabAdmin
           
        2. password: kNvoF1iXUX3GAfzk

### 6 Errors
If the run commands in the next section give you node_module errors, this should fix it.  From the folder CS495-Lab-Inventory-Group-F, run:
1. **rm -rf node_modules**
    1. If you're on powershell or this doesn't work, you can manually delete the node_modules package for the same effect
       
2. **npm install**

Also if the local server seems like it isn't serving routes, you can check the console with inspect or F12 on some machines.
Those can likely be fixed by replacing the **headers** of our files in **js/client_side** with the following lines. These specify the port locally but may not work with our hosting solution: 

    const { hostname, protocol, port } = window.location;

    const baseURL = `${protocol}//${hostname}:${port}`;
  
### 7 Run Locally:
1. From the folder CS495-Lab-Inventory-Group-F, run the command  **npm start**  to start our server and connect to our database.
   
   1. Or run **node js\server_side\server.js**

3. In your web browser paste and go to: **http://localhost:3000**
  
5. You should be directed to a login page.
   1. For access to all pages -> **username & password: temp2**

   2. For access to student view -> **username & password: classmate**
   
6. See our section below on Hosting for deploying with Heroku


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
