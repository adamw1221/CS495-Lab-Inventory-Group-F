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
        1.

2. Server stability

    1. **Reason:** If our server goes down, a user might be able to navigate between pages (if they're available at all), but again they would be useless if there was nothing to handle requests.
    2. **Test:**
    
        1. Sned a manual HTTP "HEAD" request to our applications URL with this command:
        2. **curl -I https://lab-inventory-6d96bc525443.herokuapp.com/login**

3. User login

    1. **Reason:** If no one can login then the site's functionality won't be available for any requests to be made.

4. Checkout part

    1. **Reason:** This is our application's primary use case and one of the only pages visable to students so it's critical that it works at all times.

5. Return part

    1. **Reason:** This feature is only high risk because if it fails, any (physically) returned equipment is unavailable until it's fixed or an admin manually handles returns which would be extensive overhead.This could lead to checkout functionality being useless with nothing available.
  
## User Acceptance Testing
Run the command  **npm start**  to start our server and connect to our database.

