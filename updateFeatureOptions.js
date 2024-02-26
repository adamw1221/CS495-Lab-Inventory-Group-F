// After the successful update, make a read request, hopefully returns same object..
    // const readRequestData = {
    //     id: filterObject, 
    //     postType: 'read'
    // };

    // // Make the read request
    // const readResponse = await postRequest(readRequestData);

    // // Display the read response on the webpage
    // if (readResponse && readResponse.length >= 1) {
    //     document.getElementById('updateResponse').innerText = JSON.stringify(
    //         readResponse[0], null, 2);
    // } else {
    //     document.getElementById('updateResponse').innerText =
    //         `0 document(s) updated`;
    // }