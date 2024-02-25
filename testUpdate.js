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
            
            case 'read':
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
    const inputData = document.getElementById("document-input").value;

    if (inputData) {
        console.log('Input Data:', inputData);

        // Try parsing json
        let data;
        try {
            data = JSON.parse(inputData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            document.getElementById('updateResponse').innerText = 'Invalid JSON format';
            return;
        }

        // Check if the parsed data is an array with a length of 2
        if (Array.isArray(data) && data.length === 2) {

            // Extract filter and update values
            const [filter, update] = data;

            // Construct a data object with the filter, update, and Post Type
            const requestData = {
                filter: filter,
                update: update,
                postType: 'update'
            };

            // Call the postRequest function with the requestData object
            postRequest(requestData);
        } else {
            const errorMessage = 'Invalid input: Must be a list ' +
                'with a length of 2, in JSON format';

            console.error(errorMessage);
            document.getElementById('updateResponse').innerText = errorMessage;
        }
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
