const { hostname, protocol } = window.location;
const baseURL = `${protocol}//${hostname}`;

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
        const response = await fetch(`${baseURL}${endpoint}`, options);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'An error occured during the request.' };
    }
}

async function removeDocument() {

    try {

        const userId = document.getElementById("userIdInput").value.trim();
        
        if(userId.trim() !== ""){
            const data = {
                type: 'removeUser',
                input: userId
            };

            const removeResponse = await postRequest(data);

            if(removeResponse.error){
                alert( removeResponse.error);
            }
            else{
                alert( removeResponse.message);
            }

        }
        else{
            throw new Error('Please enter a UserID.');
        }
        
    } catch (error) {
        console.error('Error removing document:', error);
        alert(error);
    }

}
