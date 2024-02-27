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
        
<<<<<<< HEAD
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
=======
        switch(data.postType){
            case 'update':
                const responseText = await response.text();
                const intValue = parseInt(responseText, 10);

                // Check if the parsing was successful
                if (!isNaN(intValue)) {
                    
                    return intValue;
                } else {
                    console.error('Error: Unable to parse responseText as an integer');
                    return -1; 
                }

            case 'read': 
                const dbData = await response.json();
                return dbData;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
>>>>>>> c075a11d643aa70739515c1cfc19e45c105d6e96
    }
}

async function updateDoc() {
    // 1. Get filter and changes
    const filterInput = document.getElementById("filterInput").value;
    const changesInput = document.getElementById("changesInput").value;

    // 2. Formatting
    if (filterInput.trim() !== '' && changesInput.trim() !== '') {

<<<<<<< HEAD
        filterObject = parseInputString(filterInput);
        changesObject = parseInputString(changesInput);
=======
        try {
            filterObject = parseInputString(filterInput);
            changesObject = parseInputString(changesInput);
        } catch (error) {
            console.error('Error parsing string:', error);
            displayError('Invalid Format', 'updateResponse')
            return;
        }
>>>>>>> c075a11d643aa70739515c1cfc19e45c105d6e96

        // 3. Construct a data object with the filter, update, and Post Type
        const requestData = {
            filter: filterObject,
            update: changesObject,
<<<<<<< HEAD
            type: 'update'
=======
            postType: 'update'
>>>>>>> c075a11d643aa70739515c1cfc19e45c105d6e96
        };

        // 4. Call the postRequest function with the requestData object
        const updateResponse = await postRequest(requestData);
        console.log("Update Response: ", updateResponse);
<<<<<<< HEAD

        //5. Check if the update was successful (number set in postRequest)
        if (updateResponse == 1) {
            document.getElementById('updateResponse').innerText = `1 document updated`;
=======
        

        //5. Check if the update was successful (number set in postRequest)
        if (updateResponse == 1) {
         
            document.getElementById('updateResponse').innerText = `1 document updated`;

>>>>>>> c075a11d643aa70739515c1cfc19e45c105d6e96
        }
        else if (updateResponse == 0){
            document.getElementById('updateResponse').innerText = `No document updated`;
        }
        else {
            console.error('Update failed');
<<<<<<< HEAD
            displayError(`Update failed. Please try again later.`, "updateResponse");
=======
            displayError('Update failed', 'updateResponse');
>>>>>>> c075a11d643aa70739515c1cfc19e45c105d6e96
        }
  
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
