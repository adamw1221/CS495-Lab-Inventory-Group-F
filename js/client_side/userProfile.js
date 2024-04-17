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
    const storedUserData = sessionStorage.getItem("equipmentData");
    if (storedUserData) {
        // if exists, populate table with it
        populateTable(storedUserData);
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
            sessionStorage.setItem("userData", userData);
        });
    }

    const storedEquipmentData = sessionStorage.getItem("equipment");
    if (!storedEquipmentData) {
        // If data is not present, fetch it from the API and store it in sessionStorage
        const equipmentData = await fetchEquipmentData();
        sessionStorage.setItem("equipment", JSON.stringify(equipmentData));
    }
});

function populateTable(userData) {
    var table = document.getElementById("userTable");
    console.log(userData);
    console.log(table);

    userData.forEach(function(obj) {
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
        /*
        Object.keys(obj).forEach(function(key) {
            console.log(key);
            var cell = row.insertCell();
            cell.textContent = obj[key];
        });
        */
    });
}

async function fetchEquipmentData() {

    try {
      const response = await fetch('http://localhost:3000/getEquipment');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData.data; // Assuming the data property is available in the response
  
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

/*
document.addEventListener("DOMContentLoaded", async function () {
    // Check if equipment data is stored in sessionStorage
    const storedEquipmentData = sessionStorage.getItem("equipmentData");
  
    if (storedEquipmentData) {
      // If data is present in sessionStorage, use it to populate the dropdown
      populateDropdown(JSON.parse(storedEquipmentData));
    } else {

        // If data is not present, fetch it from the API and store it in sessionStorage
        const equipmentData = await fetchEquipmentData();
        // console.log("EqData: ", equipmentData);
        populateDropdown(equipmentData);
          // Store equipment data in sessionStorage
        sessionStorage.setItem("equipmentData", JSON.stringify(equipmentData));
    }
  
    // Add event listener to the dropdown
    const dropdown = document.getElementById("equipmentDropdown");
    dropdown.addEventListener("change", function () {
      const selectedEquipment = dropdown.value;
      // Call your client-side function with the selected equipment
      handleEquipmentSelection(selectedEquipment);
    });
  });
*/

/*
function buildTable(data) {
    var table = document.createElement("table");
    
    // Create table header
    var header = table.createTHead();
    var headerRow = header.insertRow();
    Object.keys(data[0]).forEach(function(key) {
        var th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });
    
    // Create table body
    var body = table.createTBody();
    data.forEach(function(obj) {
        var row = body.insertRow();
        Object.keys(obj).forEach(function(key) {
            var cell = row.insertCell();
            cell.textContent = obj[key];
        });
    });
    
    return table;
}

// Example data
var dataArray = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "San Francisco" },
    { name: "Doe", age: 40, city: "Los Angeles" }
];

// Get the table container element
var tableContainer = document.getElementById("table-container");

// Build the table and append it to the container
tableContainer.appendChild(buildTable(dataArray));

*/