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
      alert(responseText);
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
  const filterInput = document.getElementById("textbox").value;
  const nameInput = document.getElementById("name").value;

  // 2. Formatting
  if (filterInput.trim() !== '') {

      filterObject = parseInputString(filterInput);
      objectName = parseInputString(nameInput);

      // 3. Construct a data object with the filter and Post Type
      const requestData = {
          filter: filterObject,
          name: objectName,
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
