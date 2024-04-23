const { hostname, protocol } = window.location;
const baseURL = `${protocol}//${hostname}`;

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
    const storedUserData = sessionStorage.getItem("userData");

    if (storedUserData) {
        // if exists, populate table with it
        populateTable(JSON.parse(storedUserData));
    } else {
        // if no data, send request to fetch it
        const requestInput = {};
        requestInput["Checkout_Status.username"] = await getRequest('/getUser');
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

    const storedEquipmentData = sessionStorage.getItem("equipment");
    if (!storedEquipmentData) {
        // If data is not present, fetch it from the API and store it in sessionStorage
        const equipmentData = await fetchEquipmentData();
        sessionStorage.setItem("equipment", JSON.stringify(equipmentData));
    }

    document.getElementById('returnForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
    
        // Get all checkboxes in the table
        const checkboxes = document.querySelectorAll('#userTable tbody input[type="checkbox"]');
    
        // Iterate through checkboxes
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                // Make a POST request to clear out "Checkout_Status"
                console.log(checkbox.parentNode.parentNode);
                clearCheckoutStatus(checkbox.parentNode.parentNode); // Pass the table row
            }
        });
        openPopup("Part(s) successfully returned!");
    });
});

function populateTable(userData) {
    var table = document.getElementById("userTable");
    console.log(userData.length);
    console.log(table);

    if (userData.length > 0){
        userData.forEach(function(obj) {
            var row = table.insertRow();
            
            var checkboxCell = row.insertCell();
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkboxCell.appendChild(checkbox);

            var nameCell = row.insertCell();
            nameCell.textContent = obj["id"];
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
        });
    }
    else {
        var row = table.insertRow();
        var cell = row.insertCell();
        cell.textContent = "You currently have no parts checked out.";
        cell.colSpan = 5;
    }
}

async function fetchEquipmentData() {

    try {
      const response = await fetch(`${baseURL}/getEquipment`);
      
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

async function clearCheckoutStatus(row) {
    console.log(row);

    const itemIdCell = row.querySelector('td:nth-child(2)');
    if (itemIdCell){
        console.log('Content of first cell:', itemIdCell.textContent);
        const itemId = itemIdCell.textContent;
        const data = {};
        data["id"] = itemId

        postRequest(data, "/makereturn").then(res => {
            console.log(res);
            if (res != 0) {
                console.log("UNO");
                row.remove();

                const updatedUserData = JSON.parse(sessionStorage.getItem("userData")).filter(user => user.id !== itemId);
                sessionStorage.setItem("userData", JSON.stringify(updatedUserData));

                populateTable(updatedUserData);
            }
            else {
                console.error('Failed to make return:', res.message);
            }

        }).catch(error => {
            console.error('Error making return:', error);
        })
    }
    else{
        console.error('First cell not found in the row.');
    }
}

function openPopup(errorMessage) {
    document.getElementById('error-message').innerText = errorMessage;
    document.getElementById('popup').style.display = 'block';
}
  
function closePopup(){
    document.getElementById('popup').style.display = 'none';
}

