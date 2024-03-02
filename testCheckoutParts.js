async function fetchEquipmentData() {

    let options = {
        method: 'GET',
        headers: {
            'Content-Type':
                'application/json;charset=utf-8'
        },
    }

    try {
      // Replace 'http://localhost:3000/api/products' with your actual API endpoint
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
        const response = await fetch('http://localhost:3000', options);
        
        const responseText = await response.text();
        const intValue = parseInt(responseText, 10);

        // Check if the parsing was successful
        if (!isNaN(intValue)) {
            return intValue;
        } else {
            console.error('Error: Unable to parse responseText as an integer');
            return -1; 
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    // Check if equipment data is stored in sessionStorage
    const storedEquipmentData = sessionStorage.getItem("equipmentData");
  
    if (storedEquipmentData) {
      // If data is present in sessionStorage, use it to populate the dropdown
      populateDropdown(JSON.parse(storedEquipmentData));
    } else {

        // If data is not present, fetch it from the API and store it in sessionStorage
        const equipmentData = await fetchEquipmentData();
        console.log("EqData: ", equipmentData);
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


  function populateDropdown(equipmentData) {
    const dropdown = document.getElementById("equipmentDropdown");
  
    // Clear existing options
    dropdown.innerHTML = "";
  
    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select Equipment";
    dropdown.appendChild(defaultOption);
  
    // Add equipment options
    if (Array.isArray(equipmentData)) {
        equipmentData.forEach((equipment) => {
        const option = document.createElement("option");
        option.value = equipment.name; // Replace with the actual ID or identifier of the equipment
        option.text = equipment.name + ' - ' + equipment.id; // Replace with the actual property representing the equipment name
        dropdown.appendChild(option);
        });
    }else {
        console.error('Invalid or non-array data received:', equipmentData);
    }
  }
  
  function handleEquipmentSelection(selectedEquipment) {
    // Replace with your logic to handle the selected equipment
    //Insert Post request here
    console.log("Selected Equipment ID:", selectedEquipment);
    // Add your additional logic here, such as displaying details or initiating checkout.
  }
  

///OLD UPDATE CODE 
// async function checkoutParts() {
//     // 1. Get filter and changes
//     const filterInput = document.getElementById("search").value;
//     const changesInput = document.getElementById("part?").value;

//     // 2. Formatting
//     if (filterInput.trim() !== '' && changesInput.trim() !== '') {

//         filterObject = parseInputString(filterInput);
//         changesObject = parseInputString(changesInput);

//         // 3. Construct a data object with the filter, update, and Post Type
//         const requestData = {
//             input: { projection: { name: 1, id: 1, _id: 0 } },
//             type: 'getEquipment'
//         };

//         // 4. Call the postRequest function with the requestData object
//         const updateResponse = await postRequest(requestData);
//         console.log("Update Response: ", updateResponse);

//         //5. Check if the update was successful (number set in postRequest)
//         if (updateResponse == 1) {
//             document.getElementById('updateResponse').innerText = `1 document updated`;
//         }
//         else if (updateResponse == 0){
//             document.getElementById('updateResponse').innerText = `No document updated`;
//         }
//         else {
//             console.error('Update failed');
//             displayError(`Update failed. Please try again later.`, "updateResponse");
//         }
  
//     } else {
//         console.error('A data field is empty or undefined');
//         document.getElementById('updateResponse').innerText =
//             'A data field is empty or undefined';
//     }
// }

// // Helper Functions
// function parseInputString(inputString) {
//     try {
//         // Attempt to parse the input as JSON
//         return JSON.parse(inputString);
//     } catch (error) {
//         // If JSON parsing fails, treat it as a list of key-value pairs
//         const keyValuePairs = inputString.split(',').map(pair => pair.trim());

//         const resultObject = {};
//         keyValuePairs.forEach(pair => {
//             const [key, ...valueParts] = pair.split(':').map(item => item.trim());
//             const value = valueParts.join(':').trim();

//             if (key && value) {
//                 resultObject[key] = value;
//             }
//         });

//         return resultObject;
//     }
// }

// function displayError(message, responseId) {
//     const errorElement = document.getElementById(responseId);
//     errorElement.innerText = message;
// }
