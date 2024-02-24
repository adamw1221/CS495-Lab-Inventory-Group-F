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
        const dbData = response.json();
        document.getElementById('response').innerText = dbData;
    } catch (error) {
        console.error('Error:', error);
    }
}

function printQuery() {
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
            postType: 'update', // or the appropriate action type
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Check if 'result' is an array and not undefined
        if (Array.isArray(data.result) && data.result.length > 0) {
            // Display the first document in the response div
            const formattedResult = JSON.stringify(data.result[0], null, 2);
            document.getElementById('response').innerText = `Reference Document For Updating:\n${formattedResult}`;
        } else {
            document.getElementById('response').innerHTML = 'No document found for the given ID';
        }
    })
    .catch(error => {
        console.error('Error in POST request:', error);
        document.getElementById('response').innerText = 'Error in the request';
    });
}

function updateDoc() {
    const inputData = document.getElementById("id-input").value;
    if (inputData) {
        console.log('ID entered:', inputData);

        // Construct a data object with the ID
        const data = {
            id: inputData,
            postType: 'update'
        };

        // Call the postRequest function with the data object
        postRequest(data);
    } else {
        console.error('ID is empty or undefined');
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
