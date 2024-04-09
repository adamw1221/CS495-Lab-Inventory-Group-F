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

  } catch (error) {
    alert("There was an error trying to add user.");
  }
}

async function addUser() {
  // 1. Get filter
    try{

        const userId = document.getElementById("userId").value;
        const password = document.getElementById("password").value;
        var userTypeButton = document.querySelector('input[name="userType"]:checked');

        // 2. Formatting
        if (userId.trim() !== '' && password.trim() !== '' && userTypeButton) {

            // 3. Construct a data object with the filter and Post Type
            const requestData = {
                userInfo: {
                    "username": userId,
                    "password": password,
                    "userType": userTypeButton.value,
                },
                type: 'addUser'
            };

            // 4. Call the postRequest function with the requestData object
            const updateResponse = await postRequest(requestData);

        } else {
            throw new Error('All fields are required.');
        }
    }
    catch(err){
        alert(err);
    }
}