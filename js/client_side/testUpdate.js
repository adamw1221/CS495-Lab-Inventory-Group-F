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
        
        const responseJson = await response.json();

        var intValue=0;
        if(responseJson.error){
            alert(responseJson.error);
        }
        else{
            intValue = parseInt(responseJson.message, 10);
        }

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

async function updateDoc() {
    // 1. Get filter and changes
    const filterInput = document.getElementById("filterInput").value;
    const changesInput = document.getElementById("changesInput").value;

    // 2. Formatting
    if (filterInput.trim() !== '' && changesInput.trim() !== '') {

        filterObject = parseInputString(filterInput);
        changesObject = parseInputString(changesInput);

        // 3. Construct a data object with the filter, update, and Post Type
        const requestData = {
            filter: filterObject,
            update: changesObject,
            type: 'update'
        };

        // 4. Call the postRequest function with the requestData object
        const updateResponse = await postRequest(requestData);
        console.log("Update Response: ", updateResponse);

        //5. Check if the update was successful (number set in postRequest)
        if (updateResponse == 1) {
            openPopup('1 document updated');
        }
        else if (updateResponse == 0){
            openPopup('No document updated');
        }
        else {
            console.error('Update failed');
            openPopup('Update failed. Please try again later.');
        }
  
    } else {
        console.error('A data field is empty or undefined');
        openPopup('A data field is empty or undefined');
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

function openPopup(errorMessage) {
    document.getElementById('error-message').innerText = errorMessage;
    document.getElementById('popup').style.display = 'block';
}
  
function closePopup(){
    document.getElementById('popup').style.display = 'none';
}
