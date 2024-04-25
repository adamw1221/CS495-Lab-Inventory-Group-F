  const request = require('supertest');
  const checkoutData = require('../../testData/checkoutData.json');
  const loginData = require('../../testData/login.json');
  const {app, getClient} = require('../js/server_side/server.js');

// console.log('Data: ', checkoutData);
// console.log('App: ', app);

describe('Server API', () => {
  before(async function() {
    this.timeout(10000); // Increase timeout if necessary
    client = await getClient(); // Wait for the client to be available
});
  // Test case for a GET request
  it('Should return "Hello, World!" for GET /me', (done) => {
    request(app)
      .get('/me')
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

  it('Should successfully Validate a part before checkout', (done) => {
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

  it('Should successfully validate login credentials', (done) => {
    request(app)
      .post('/auth/login')
      .send(loginData)
      // .set('Content-Type', 'application/json;charset=utf-8')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        
        if (res.status  === 302 && res.headers.location) {
          const redirectLocation = res.headers.location;
          console.log('Redirect location:', redirectLocation);
          done();
        } else{
          done(new Error('1. Expected status code 200'));
        }
      });
  });

});

after(() => {
  // Close the server
  setTimeout(() => {
    // Close the server
      console.log('Server closed');
      process.exit(0);
  }, 3000); // 5000 milliseconds = 5 seconds
});
