# CS495 - Lab Inventory Test Documentation

### Automated Testing
We've implemented automated testing for the following use cases of our web application: Checkout Part, Login, Add User, and Add Part. To achieve this we used mocha, chai, and susperset testing frameworks which are easily accessible by Node js.

Mocha is a flexible JavaScript test framework that provides an api for defining test suites. Chai offers an assertion library compatible with Mocha for verifying test results. Finally, Supertest is a library for testing HTTP servers offering an api for sending HTTP requests in Node.js. We chose this for our testing stack because our webpage handles everything with requests made to our server and this stack allows us to mock user input for each component with relative ease.

We created a json file that replicated the corresponding page's user input for each component (or use case). When the test script is run, a component test will hit the database using that data, and request headers identical to those in its client-side javascript file. Then the response is verified with assertions, a second request is made to verify the DB has been altered, and that response is also verified with assertions. 

This testing workflow ensures we're sending the right data, getting it in the request,sucessfully hitting the DB, and ultimately that these features work as expected.


### User Acceptance Testing
If the run commands in the next section give you node_module errors, this should fix it:
  
### Run:
Run the command  **npm start**  to start our server and connect to our database.

