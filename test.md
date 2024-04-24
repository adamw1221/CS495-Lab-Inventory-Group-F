# CS495 - Lab Inventory Test Documentation

## Automated Testing
We've implemented automated testing for the following components of our web application: **Checkout Part**, **Login**, **Add User**, and **Add Part**. To achieve this we used **Mocha**, **Chai**, and **Suspertest** testing frameworks which are easily accessible by Node js.

**Mocha** is a flexible JavaScript test framework that provides an api for defining test suites. **Chai** offers an assertion library compatible with Mocha for verifying test results. Finally, **Supertest** is a library for testing HTTP servers and offers an api for sending HTTP requests in Node.js. We chose this for our testing stack because our webpage handles everything with requests made to our server and this stack allows us to send mock user input for each component with relative ease.

To hold that mock user input, we created json files for each component. When the test script is run, a component test will hit the database using that data, including request headers identical to those in its client-side javascript file. Then the response is verified with assertions, a second request is made to verify the DB has been altered, and that response is also verified with assertions. 

This testing workflow ensures we're sending the right data, getting it in the request, sucessfully hitting the DB, and ultimately that these features work as expected.


## High Risk Features
Certain features have a bigger impact on our application's usefulness than others. Those features are, **database connectivity, server stability, user login, checkout part, and return part**. These test involve a mixture of automated an manual but could be adaptaed to be fully automated in the future.

1. Database connectivity

    1. **Reason:** We have a MongoDB Atlas database that holds our equipment and user data. If lose conenction to it then our server won't be able to fulfil any requests, making the application useless.
    2. **Test:** 
        1. In your terminal, try to hit our DB using the mongo CLI (command line interface), via our connection string. Run this command:
            1. **mongosh "mongodb+srv://LabAdmin:kNvoF1iXUX3GAfzk@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority"**
        2. This should be the response upon a successful connection.
            1. ![Good Result](images/mongosh_pic.png)

2. Server stability

    1. **Reason:** If our server goes down, a user might be able to navigate between pages (if they're available at all), but again they would be useless if there was nothing to handle requests.
    2. **Test:**
    
        1. In your terminal, send a manual HTTP "HEAD" request to our application's URL with this command:
            1. **curl -I https://lab-inventory-6d96bc525443.herokuapp.com/login**
        2. You should get this response: **HTTP/1.1 200 OK**
        3. An error would return something like **HTTP/1.1 404 Not Found**
        4. You can also past the link **https://lab-inventory-6d96bc525443.herokuapp.com/login** into your browser to  visit the site. If it serves you the login page then the server is up. Otherwise you should get a heroku error message page.

3. User login

    1. **Reason:** If no one can login then the site's functionality won't be available for any requests to be made.
    
    2. **Test:**
        1. Covered by our automatic test.
        2. For manual testing you can visit our heroku login link above and enter **classmate** for username and password. You should be redirected to a student view after succesfully loging in. 
        3. If this doesn't work (or another username/password combination known to be in the db), you should remain on the login page.

4. Checkout part

    1. **Reason:** This is our application's primary use case and one of the only pages visable to students so it's critical that it works at all times.
    
    2. **Test:**
        1. Covered by our automatic test.
        2. For manual testing you can visit our heroku page above and log in with **classmate**. 
        3. Pick an available piece of equipment from the dropdown. Select valid checkout dates/times and returns, then press the checkout button.
        4. You should get a notification that it was sucessfully checked out.
    
5. Return part

    1. **Reason:** This feature is only high risk because if it fails, any (physically) returned equipment is unavailable until it's fixed or an admin manually handles returns which would be extensive overhead.This could lead to checkout functionality being useless with nothing available.
   
    2. **Test:**
        1. For manual testing you can visit our heroku page above and log in with **classmate**. 
        2. Follow the instructions to cehckout a part from **section 4**.
        3. Navigate to the **Return Parts** page. You should see your new equipment. If not, open the page in a enw tab to fully refresh the session.
        4. Select the small square on the far left-hand side of the equipment in the table in the Return column. 
        5. Add a description, then press submit. You should get a notification saying the return was succesful.
  
## User Acceptance Testing


The following tests require user interaction with the corresponding webpages and are verifiable (after logging in) by on screen response or completing a complementary action.

**Website Link**: https://lab-inventory-6d96bc525443.herokuapp.com/login

**Username & Password**: **temp2**

1. Add Part 

    1. Go to Add Part page
    2. Enter **"testPart"** for *equipment name, type, and room number.*
    3. Click the buttons for *working, available, and mobile*
    4. Click Add part
    5. You should get a notification of a successful add.
    6. Can further verify via Update or Remove
    7. ![Add Part](img/addparts.png)

2. Update Part 

    1. Input: ID and Value of existing equipment and Key-Value pairs with updated values 

    2. Expected: Successful update notification and updates applied to respective equipment in database 

    3. Can further verify by repeating the Update which will notify user the values are already present 

3. Checkout Part 

    1. Input: Valid form values 

    2. Expected: Successful checkout notification and corresponding checkout information in respective equipment’s document  

    3. Can be verified by repeating the checkout which should notify the user it’s unavailable 

    4. Can also input invalid form values then attempt checkout to ensure error handling is sufficient 

4.  Remove Part 

    1. Input: Existing equipment ID 

    2. Expected: Successful removal notification and removal of equipment from database 

    3. Can verify with attempt at Update or Checkout which should both notify the user the operation is unsuccessful/impossible 

5. Server Hosting 

    1. First: Standup website using hosting solution (Heroku?) 

    2. Test: Attempt to have team members on different devices successfully use any of the CRUD operations on the website 

    3. Expected: The website features should be responsive for this hosting solution as when we run the server locally. The database should reflect any successful operations. 


Webpage Views based on user type 

Input: Valid user login credentials 

Expected: Upon successful login, students should see a view for checkout parts and teachers should have view to perform CRUD operations, along with other respective features 

