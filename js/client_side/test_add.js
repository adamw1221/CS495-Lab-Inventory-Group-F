const { hostname, protocol } = window.location;
const baseURL = `${protocol}//${hostname}`;

async function postRequest(data) {
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
    const response = await fetch(`${baseURL}`, options);
    
    const responseText = await response.json();

    if(responseText.error){
        alert( responseText.error);
    }
    else{
        alert( responseText.message);
    }
      /*const intValue = parseInt(responseText, 10);

      // Check if the parsing was successful
      if (!isNaN(intValue)) {
          return intValue;
      } else {
          console.error('Error: Unable to parse responseText as an integer');
          return -1; 
      }*/

  } catch (error) {
      console.error('Error:', error);
  }
}

async function addDoc() {
  // 1. Get filter
  const idInput = document.getElementById("textbox").value;
  const nameInput = document.getElementById("name").value;
  var macInput = null;
  if (document.getElementById("mac").value == "") {
    macInput = null;
  } else {
    macInput = document.getElementById("mac").value;
  }
  var statusInput = null;
  if (document.querySelector('input[name="status"]:checked')) {
    statusInput = "Working";
  } else {
    statusInput = "Broken";
  }
  var availableInput = null;
  if (document.querySelector('input[name="available"]:checked')) {
    availableInput = "Yes";
  } else {
    availableInput = "No";
  }
  var mobileInput = null;
  if (document.querySelector('input[name="mobile"]:checked')) {
    mobileInput = "Yes";
  } else {
    mobileInput = "No";
  }
  const roomInput = document.getElementById("room").value;
  var requestInput = null;
  if (document.querySelector('input[name="request"]:checked')) {
    requestInput = "Yes";
  } else {
    requestInput = "No";
  }

  // 2. Formatting
  if (idInput.trim() !== '' && nameInput.trim() !== '') {

      //filterObject = parseInputString(filterInput);
      //objectName = parseInputString(nameInput);

      // 3. Construct a data object with the filter and Post Type
      const requestData = {
          data: {
            id: idInput,
            name: nameInput,
            MAC: macInput,
            Status: statusInput,
            Available: availableInput,
            Mobile: mobileInput,
            Room: roomInput,
            Request_Needed: requestInput,
            Checkout_Status: null
          },

          type: 'add'
      };

      // 4. Call the postRequest function with the requestData object
      const updateResponse = await postRequest(requestData);
      /*console.log("Update Response: ", updateResponse);

      //5. Check if the update was successful (number set in postRequest)
      if (updateResponse == 1) {
          document.getElementById('updateResponse').innerText = `1 document added`;
      }
      else if (updateResponse == 0){
          document.getElementById('updateResponse').innerText = `No document added`;
      }
      else {
          console.error('Add failed');
          displayError(`Add failed. Please try again later.`, "updateResponse");
      }*/

  } else {
      console.error('A data field is empty or undefined');
      document.getElementById('updateResponse').innerText =
          'A data field is empty or undefined';
  }
}

// Helper Functions
function parseInputString(inputString) {
  try {
      // Attempt to parse the input as JSON
      return JSON.parse(inputString);
  } catch (error) {
      // If JSON parsing fails, treat it as a list of key-value pairs
      const keyValuePairs = inputString.split(',').map(pair => pair.trim());

      const resultObject = {};
      keyValuePairs.forEach(pair => {
          const [key, ...valueParts] = pair.split(':').map(item => item.trim());
          const value = valueParts.join(':').trim();

          if (key && value) {
              resultObject[key] = value;
          }
      });

      return resultObject;
  }
}

function displayError(message, responseId) {
  const errorElement = document.getElementById(responseId);
  errorElement.innerText = message;
}

document.addEventListener("DOMContentLoaded", async function () {
    const storedEquipmentData = sessionStorage.getItem("equipment");
  
    if (!storedEquipmentData) {
        // If data is not present, fetch it from the API and store it in sessionStorage
        const equipmentData = await fetchEquipmentData();
        sessionStorage.setItem("equipment", JSON.stringify(equipmentData));
    }
});

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
