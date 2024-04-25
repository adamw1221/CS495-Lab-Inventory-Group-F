  const request = require('supertest');
  const checkoutData = require('../testData/checkoutData.json');
  const loginData = require('../testData/login.json');
  const addUserData = require('../testData/addUser.json');
  const removeData = require('../testData/removeUser.json');
  const removePart = require('../testData/removePart.json');
  const addPart = require('../testData/addPart.json');
  const {app, getClient} = require('../js/server_side/server.js');


describe('Server API', () => {
  before(async function() {
    this.timeout(10000); // Increase timeout if necessary
    client = await getClient(); // Wait for the client to be available
});
  // Test case for a GET request
  it('Should return "Hello, World!" for GET /test', (done) => {
    console.log("\n\n ----- Starting Base Test -----\n");

    request(app)
      .get('/test')
      .expect(200) // Expecting HTTP status code 200
      .end((err, res) => {
        if (err) return done(err); // Pass the error to Mocha if there's an error

        // Assert response text
        if (res.text !== 'Hello, World!') {
          return done(new Error('Unexpected response'));
        }

        // If everything is fine, call done() to indicate test completion
        done();
      });
  });

  // Add User Test
  it('Should successfully Add new user', (done) => {
    console.log("\n\n ----- Starting Add User Test -----\n");

    request(app)
      .post('/')
      .send(addUserData)
      .set('Content-Type', 'application/json;charset=utf-8')
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        if (res.status  == 200 ) {
          const message = res.body.message;
          console.log(`\nResponse Message: ${message}`);
          done();
        } 
        else if(res.status  == 500 ){
          done(new Error(res.body.error));
        }
        else{
          done(new Error('1. Expected status code 200'));
        }
      });
  });

   // Login Validation Test
  it('Should successfully Validate Login Credentials', (done) => {
    console.log("\n\n ----- Starting Validate Login Test -----\n");

    request(app)
      .post('/auth/login')
      .send(loginData)
      // .set('Content-Type', 'application/json;charset=utf-8')
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const loginRedirect  = '/login?error=Authentication%20failed.';
        const redirectLocation = res.headers.location;
        console.log('\nRedirect location:', redirectLocation);

        if (res.status  === 302 && (redirectLocation !== loginRedirect )) {
          console.log('Response status:', res.status);
          done();
        } else{
          done(new Error('1. Expected status code 200'));
        }
      });
  });

  // Remove User Test
  it('Should successfully Remove new user', (done) => {
    console.log("\n\n ----- Starting Remove User Test -----\n");

    request(app)
      .post('/')
      .send(removeData)
      .set('Content-Type', 'application/json;charset=utf-8')
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        if (res.status  == 200 ) {
          const message = res.body.message;
          console.log(`\nResponse Message: ${message}`);
          done();
        } 
        else if(res.status  == 500 ){
          done(new Error(res.body.error));
        }
        else{
          done(new Error('1. Expected status code 200'));
        }
      });
  });

  // Add Part Test
  it('Should successfully Add new part', (done) => {
    console.log("\n\n ----- Starting Add Part Test -----\n");

    request(app)
      .post('/')
      .send(addPart)
      .set('Content-Type', 'application/json;charset=utf-8')
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        if (res.status  == 200 ) {
          const message = res.body.message;
          console.log(`\nResponse Message: ${message}`);
          done();
        } 
        else if(res.status  == 500 ){
          done(new Error(res.body.error));
        }
        else{
          done(new Error('1. Expected status code 200'));
        }
      });
  });

  // Checkout Validate Test
  it('Should successfully Validate a part before checkout', (done) => {
    console.log("\n\n ----- Starting Validate Part Test -----\n");

    request(app)
      .post('/checkout')
      .send(checkoutData)
      .set('Content-Type', 'application/json;charset=utf-8')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        if (res.status !== 200) {
          return done(new Error('Expected status code 200'));
        }
        if(res.body[0] !== "No issues"){
          return done(new Error('One or more issues with checkout!'));
        }

        // Add more assertions as needed
        done();
      });
  });

 // Remove Part Test
  it('Should successfully Remove new part', (done) => {
    console.log("\n\n ----- Starting Remove Part Test -----\n");

    request(app)
      .post('/')
      .send(removePart)
      .set('Content-Type', 'application/json;charset=utf-8')
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        if (res.status  == 200 ) {
          const message = res.body.message;
          console.log(`\nResponse Message: ${message}`);
          done();
        } 
        else if(res.status  == 500 ){
          done(new Error(res.body.error));
        }
        else{
          done(new Error('1. Expected status code 200'));
        }
      });
  });

});

after(() => {
  setTimeout(() => {
    // Close the server
      console.log('Server closed');
      process.exit(0);
  }, 3000); // 5000 milliseconds = 5 seconds
});
