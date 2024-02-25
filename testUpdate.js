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
        // convert response into json and then post into div component
        
        switch(data.postType){
            case 'update':
                const responseText = await response.text();
                console.log('Update result:', responseText);
                document.getElementById('updateResponse').innerText = `Update result: ${responseText}`;
                break;
            
            case 'read': //needs to be create or delete
                const dbData = await response.json();
                document.getElementById('readResponse').innerText = JSON.stringify(dbData, null, 2);
                break;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// needs work to use the postrequest function and pass in the proper data
function printQuery() {  // FIXME: use the post request 
    const idInput = document.getElementById("id-input").value;

    console.log('ID:', idInput);

    // Make the POST request to the server
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idInput,
            postType: 'read', // or the appropriate action type
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Check if 'result' is an array and not undefined
        if (Array.isArray(data.result) && data.result.length > 0) {
            // Display the first document in the response div
            const formattedResult = JSON.stringify(data.result[0], null, 2);
            document.getElementById('readResponse').innerText = `Reference Document For Updating:\n${formattedResult}`;
        } else {
            document.getElementById('readResponse').innerHTML = 'No document found for the given ID';
        }
    })
    .catch(error => {
        console.error('Error in POST request:', error);
        document.getElementById('readResponse').innerText = 'Error in the request';
    });
}

function updateDoc() {
    // const inputData = document.getElementById("document-input").value;
    const filterInput = document.getElementById("filterInput").value;
    const changesInput = document.getElementById("changesInput").value;


    if (filterInput.trim() !== '' && changesInput.trim() !== '') {
        console.log('Filter: ', filterInput);
        console.log('Changes: ', changesInput);

        // Try parsing json
        let filterObject;
        let changesObject;
        try {
            filterObject = parseInputString(filterInput);
            changesObject = parseInputString(changesInput);
        } catch (error) {
            console.error('Error parsing string:', error);
            displayError('Invalid Format', 'updateResponse')
            return;
        }

        // Construct a data object with the filter, update, and Post Type
        const requestData = {
            filter: filterObject,
            update: changesObject,
            postType: 'update'
        };

        // Call the postRequest function with the requestData object
        postRequest(requestData);
  
    } else {
        console.error('Data is empty or undefined');
        document.getElementById('updateResponse').innerText = 'Data is empty or undefined';
    }
}

function debugInput() {
    const inputData = document.getElementById("id-input").value;
    if (inputData) {
        console.log('ID entered:', inputData);

        // taking in 2 docs
        const data = {
            id: inputData,
            postType: 'read'
        };

        // Call the postRequest function with the data object
        postRequest(data);
    } else {
        console.error('ID is empty or undefined');
    }
}

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