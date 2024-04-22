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
        // convert response into json and then post into div component
        const dbData = await response.json();
        console.log(dbData.message);
        if(dbData.error){
            alert(dbData.error);
        }
        document.getElementById('response').innerText = await dbData["0"]["MAC"];
    } catch (error) {
        console.error('Error:', error);
    }
}

function searchById() {
    data = {};
    data["type"] = "read";
    data["input"] = document.getElementById("id-input").value;
    postRequest(data);
}

function debugInput() {
    const inputData = document.getElementById("id-input");
    console.log(inputData.value);
    return inputData.value;
}
