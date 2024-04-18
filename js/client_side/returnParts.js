async function postRequest(data, endpoint) {
    // configure options for post request
    let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
  
    try {
      // send request while providing data parameter
      const response = await fetch('http://localhost:3000' + endpoint, options);
      
      const responseJson = await response.json();
      return responseJson;
  
    } catch (error) {
        console.error('Error:', error);
    }
  }

document.addEventListener("DOMContentLoaded", async function () {
    // check for data in session storage
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
        // if exists, populate table with it
        populateTable(JSON.parse(storedUserData));
    } else {
        // if no data, send request to fetch it
        const requestInput = {};
        requestInput["Checkout_Status.username"] = "temp";
        var userData = [];
        postRequest(requestInput, "/userprofiledata").then(response => {
            console.log(response);
            if (Array.isArray(response)) {
                userData = response;
                console.log(userData);
            } else {
                console.log("error: response object is not array");
            }
            populateTable(userData);
            // store new data in session storage
            sessionStorage.setItem("userData", JSON.stringify(userData));
        });
    }
});

function populateTable(userData) {
    var table = document.getElementById("userTable");
    console.log(userData);
    console.log(table);
    userData = JSON.parse(userData);
    userData = Array.from(userData);

    try {
        if (Array.isArray(userData)){
        //userData = JSON.parse(userData);
            userData.forEach(function(obj) {
                console.log("Checkout status data type:", typeof obj["Checkout_Status.username"]);
                if (obj["Checkout_Status"] !== null) {
                    console.log('UNO!!!');
                    var row = table.insertRow();
                    
                    var nameCell = row.insertCell();
                    nameCell.textContent = obj["name"];
                    var checkoutCell = row.insertCell();
                    const checkoutDate = new Date(obj["Checkout_Status"]["checkoutDate"]);
                    checkoutCell.textContent = checkoutDate.toString();
                    var returnCell = row.insertCell();
                    const returnDate = new Date(obj["Checkout_Status"]["returnDate"]);
                    returnCell.textContent = returnDate.toString();
                    var statusCell = row.insertCell();
                    // maybe figure out how to dynamically style here? not sure if conditional formatting is possible on a css file
                    if (Date.now() > returnDate) {
                        statusCell.textContent = "OVERDUE";
                    }
                    else if (Date.now() < checkoutDate) {
                        statusCell.textContent = "AWAITING";
                    }
                    else {
                        statusCell.textContent = "OK";
                    }
                }
                else {
                    console.log('Invalid user data format.', obj);
                }
            });
        }
        else {
            console.error('User data is undefined.');
        }
    }
    catch (error){
        console.error('Error: ', error);
    }
}

document.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Validate description field
  const description = document.getElementById('description').value.trim();
  if (description == '') {
    alert('Please provide a description.');
    return;
  }

  // Handle file upload validation if needed

  // Prepare form data for submission (you can send this via AJAX or prepare for email submission)
  const formData = new FormData(form);
  // Example: You can access form data using formData.get('description'), formData.get('file'), etc.

  // log form data to console
  for (let data of formData.entries()) {
    console.log(data[0] + ': ' + data[1]);
  }

});

async function returnPart(){

    var selectedEquipment = null;
    

    postRequest(data, "/return").then(res => {
        console.log(res);
        response = res;
  
        if(response[0] == "No issues"){

        }
    });
}

