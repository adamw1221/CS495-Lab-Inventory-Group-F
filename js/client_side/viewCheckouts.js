const { hostname, protocol, port } = window.location;
const baseURL = `${protocol}//${hostname}:${port}`;

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
      const response = await fetch(`${baseURL}${endpoint}`, options);
      
      const responseJson = await response.json();
      return responseJson;
  
    } catch (error) {
        console.error('Error:', error);
    }
  }

  async function getRequest(endpoint) {
    try {
        const response = await fetch(`${baseURL}${endpoint}`);
        const responseText = await response.text();
        return responseText;
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    // check for data in session storage
    const storedPartData = sessionStorage.getItem("partData");

    if (storedPartData) {
        // if exists, populate table with it
        populateTable(JSON.parse(storedPartData));
    } else {
        // if no data, send request to fetch it
        var partData = [];
        const requestInput = {"Available": "No" };
        postRequest(requestInput, "/getCheckedOutParts").then(response => {
            console.log(response);
            if (Array.isArray(response)) {
                partData = response;
                console.log(partData);
            } else {
                console.log("error: response object is not array");
            }
            populateTable(partData);
            // store new data in session storage
            sessionStorage.setItem("partData", JSON.stringify(partData));
        });
    }

});

function populateTable(userData) {
    var table = document.getElementById("userTable");
    console.log(userData);
    console.log(table);

    userData.forEach(function(obj) {
        var row = table.insertRow();
        
        var userCell = row.insertCell();
        const username = obj["Checkout_Status"]["username"];
        userCell.textContent = username;

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
            statusCell.style.backgroundColor = "red";
        }
        else if (Date.now() < checkoutDate) {
            statusCell.textContent = "AWAITING";
            statusCell.style.backgroundColor = "yellow";
        }
        else {
            statusCell.textContent = "OK";
            statusCell.style.backgroundColor = "green";
        }
        /*
        Object.keys(obj).forEach(function(key) {
            console.log(key);
            var cell = row.insertCell();
            cell.textContent = obj[key];
        });
        */
    });
}


