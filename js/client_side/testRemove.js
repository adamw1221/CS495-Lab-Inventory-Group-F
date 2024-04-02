async function postRequest(data){
    let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(`${baseURL}`, options);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'An error occured during the request.' };
    }
}

async function removeDocument() {
    const partId = document.getElementById("partIdInput").value.trim();
    
    const data = {
        type: 'remove',
        input: partId
    };

    try {
        const removeResponse = await postRequest(data);
        console.log("Remove Response: ", removeResponse);

        if (removeResponse.success){
            document.getElementById('removeResponse').innerText = removeResponse.message;
        } else {
            console.error('Removal failed:', removeResponse.message);
            document.getElementById('removeResponse').innerText = 'Removal failed: ' + removeResponse.message;
        }
    } catch (error) {
        console.error('Error removing document:', error);
        document.getElementById('removeResponse').innerText = 'An error occured while removing the document.';
    }

}
