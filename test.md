# CS495 - Lab Inventory Test Documentation

## Automated Testing
We've implemented automated testing for the following components of our web application: **Checkout Part**, **Login**, **Add User**, and **Add Part**. To achieve this we used **Mocha**, **Chai**, and **Suspertest** testing frameworks which are easily accessible by Node js.

**Mocha** is a flexible JavaScript test framework that provides an api for defining test suites. **Chai** offers an assertion library compatible with Mocha for verifying test results. Finally, **Supertest** is a library for testing HTTP servers and offers an api for sending HTTP requests in Node.js. We chose this for our testing stack because our webpage handles everything with requests made to our server and this stack allows us to send mock user input for each component with relative ease.

To hold that mock user input, we created json files for each component. When the test script is run, a component test will hit the database using that data, including request headers identical to those in its client-side javascript file. Then the response is verified with assertions, a second request is made to verify the DB has been altered, and that response is also verified with assertions. 

This testing workflow ensures we're sending the right data, getting it in the request, sucessfully hitting the DB, and ultimately that these features work as expected.


## High Risk Features
Certain features have a bigger impact on our application's usefulness than others. Those features are, **database connectivity, server stability, user login, checkout part, and return part**. These tests involve a mixture of automated and manual but could be adapted to be fully automated in the future.

1. Database Connectivity

    1. **Reason:** We have a MongoDB Atlas database that holds our equipment and user data. If we lose connection to it then our server won't be able to fulfill any requests, making the application useless.
    2. **Test:** 
        1. In your terminal, try to hit our DB using the mongo CLI (command line interface), via our connection string. Run this command:
            1. **mongosh "mongodb+srv://LabAdmin:kNvoF1iXUX3GAfzk@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority"**
        2. This should be the response upon a successful connection
            1. ![Good Result](img/mongosh_pic.png)
            2. Enter **"exit"** to leave the mongo CLI

2. Server Stability

    1. **Reason:** If our server goes down a user might be able to navigate between pages (if they're available at all), but they would be inactive if there was nothing to handle requests.
    2. **Test:**
        1. In your terminal, send a manual HTTP "HEAD" request to our application's URL with this command:
            1. **curl -I https://lab-inventory-6d96bc525443.herokuapp.com/login**
        2. You should get this response: **HTTP/1.1 200 OK**
        3. An error would return something like **HTTP/1.1 404 Not Found**
        4. You can also paste the link **https://lab-inventory-6d96bc525443.herokuapp.com/login** into your browser to  visit the site. If it serves you the login page then the server is up. Otherwise, you should get a heroku error message page.

3. User Login

    1. **Reason:** If no one can log in then the site's functionality won't be available for any requests to be made
    
    2. **Test:**
        1. Covered by our automatic test
        2. For manual testing you can visit our heroku login link above and enter **classmate** for username and password. You should be redirected to a student view after successfully logging in. 
        3. If this doesn't work (or another username/password combination known to be in the db), you should remain on the login page.

4. Checkout Part

    1. **Reason:** This is our application's primary use case and one of the only pages visible to students so it's critical that it works at all times.
    
    2. **Test:**
        1 Covered by our automatic test.
        2. For manual testing you can visit our heroku page above and log in with **classmate** 
        3. Pick an available piece of equipment from the dropdown. Select valid checkout dates/times and returns, then press the checkout button.
        4. You should get a notification that it was successfully checked out.
    
5. Return Part

    1. **Reason:** This feature is only high risk because if it fails, any (physically) returned equipment is unavailable until it's fixed or an admin manually handles returns which would be extensive overhead. This could lead to checkout functionality being useless with nothing available.
   
    2. **Test:**
        1. For manual testing you can visit our heroku page above and log in with **classmate** 
        2. Follow the instructions to checkout a part from **section 4**
        3. Navigate to the **Return Parts** page. You should see your new equipment in a table on the screen. If not, open the page in a new tab to fully refresh the session.
        4. Select the small square on the far left-hand side of the equipment in the table in the Return column. 
        5. Add a description, then press submit. You should get a notification saying the return was successful.
  
## User Acceptance Testing


The following tests require user interaction with the corresponding webpages and are verifiable (after logging in) by on-screen response or completing a complementary action.

**Website Link**: https://lab-inventory-6d96bc525443.herokuapp.com/login

**Username & Password**: **temp2**

### Major Features

1. Add Part 

    1. Go to Add Part page
    2. Enter **"testPart"** for *equipment name, type, and room number.*
    3. Click the buttons for *working, available, and mobile*
    4. Click **Add part**
    5. You should get a notification of a successful add
    6. Can further verify via Update or Remove
    7. ![Add Part](img/addpart.png)

2. Update Part 

    1. Go to Update Part page
    2. Enter **"id : testPart"** for *Equipment Id*
        1. Otherwise, you can check the Checkout Parts page dropdown to get an available ID for a part to change. (Just change it back to **"Yes"** afterward).
    3. Enter **"Available : Never"** for *Changes*
    4. Click **Update Equipment**
    5. You should get a notification of a document successfully updated
    6. Can further verify by repeating this update, which will show that 0 documents were updated.
   
3. Login

    1.  Visit our login link above
    2. Enter **classmate** for username and password 
    3. You should be redirected to **"My Checkouts"** (in a student view) after successfully logging in. 
        1. If this doesn't work you should remain on the login page
    4. If you attempt to visit any of the pages above (add, update, remove) you should get an error screen, forcing you to go back to the Checkout or Return page.
    5. ![Add Part](img/no_auth.png)

4. Checkout Part

    1.  Go to Checkout Parts
    2. Select **"testPart"** from the dropdown
    3. Enter today's date for *Checkout Date*
    4. Enter a future time for the *Checkout Time*
    5. Enter a future date for *Return Date*
    6. Enter a future time for *Return Time*
    7. Click the *Checkout* button
    8. You should get a notification for a successful checkout
    9. This can be verified by opening a new tab and visiting your **"My Checkouts"** page where the new equipment should be displayed.
    
5.  Remove Part (Requires being logged in as an admin, i.e., **temp2**)

    1. Go to Remove Old Parts page
    2. Enter **"testPart"** for *EquipmentID*
        1. If it doesn't exist you can follow the Add step above to add it
    3. Click **Remove part**
    4. You should get a notification of a successful removal
    5. Can further verify via Update or Remove for *testPart*


### Other Test Cases
6. Login with wrong or missing username/password
7. After 30 minutes of being logged in, attempt to return directly to a non-login page
8. Attempt to add existing equipment
9. Attempt to add equipment without filling in form
10. Attempt to add an unavailable username on Add User
11. Attempt to update non-existing equipment
12. Attempt to update equipment with empty form
13. Attempt to checkout multiple parts (desired functionality? backlog)
14. Attempt to checkout unavailable part
15. Attempt checkout with invalid dates/times
16. Attempt to update part to available while it's checked out (desired functionality? backlog)
17. Attempt to remove user while logged in as that user
18. Attempt to remove last user in database
