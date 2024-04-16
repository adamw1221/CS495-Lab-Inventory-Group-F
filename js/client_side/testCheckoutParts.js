const { hostname, protocol } = window.location;
const baseURL = `${protocol}//${hostname}`;

async function fetchEquipmentData() {

    try {
      const response = await fetch('http://localhost:3000/getEquipment');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData.data; // Assuming the data property is available in the response
  
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

async function postRequest(data, endpoint) {
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
    const response = await fetch('http://localhost:3000' + endpoint, options);
    
    const responseJson = await response.json();
    return responseJson;

  } catch (error) {
      console.error('Error:', error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
    // Check if equipment data is stored in sessionStorage
    const storedEquipmentData = sessionStorage.getItem("equipmentData");
  
    if (storedEquipmentData) {
      // If data is present in sessionStorage, use it to populate the dropdown
      populateDropdown(JSON.parse(storedEquipmentData));
    } else {

        // If data is not present, fetch it from the API and store it in sessionStorage
        const equipmentData = await fetchEquipmentData();
        // console.log("EqData: ", equipmentData);
        populateDropdown(equipmentData);
          // Store equipment data in sessionStorage
        sessionStorage.setItem("equipmentData", JSON.stringify(equipmentData));
    }
  
    // Add event listener to the dropdown
    const dropdown = document.getElementById("equipmentDropdown");
    dropdown.addEventListener("change", function () {
      const selectedEquipment = dropdown.value;
      // Call your client-side function with the selected equipment
      handleEquipmentSelection(selectedEquipment);
    });
  });


  function populateDropdown(equipmentData) {
    const dropdown = document.getElementById("equipmentDropdown");
  
    // Clear existing options
    dropdown.innerHTML = "";
  
    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select Equipment";
    dropdown.appendChild(defaultOption);
  
    // Add equipment options
    if (Array.isArray(equipmentData)) {
        equipmentData.forEach((equipment) => {
        const option = document.createElement("option");
        option.value = equipment.id; // Replace with the actual ID or identifier of the equipment
        option.text = equipment.name + ' - ' + equipment.id; // Replace with the actual property representing the equipment name
        dropdown.appendChild(option);
        });
    }else {
        console.error('Invalid data received:', equipmentData);
    }
  }
  
  //This function is probably not needed or could be updated
  function handleEquipmentSelection(selectedEquipment) {
    //Insert Post request here
    console.log("Selected Equipment ID:", selectedEquipment);

    // assuming selectedEquipment is actually an ID
    const data = {};
    data["type"] = "read";
    data["input"] = selectedEquipment;

    postRequest(data, "/").then(response => {
      console.log(response);
      // need error handling to ensure response is proper form

      // temporary: dump json into div text
      // document.getElementById("partInfo").innerText = JSON.stringify(response);
    });

    // Add your additional logic here, such as displaying details or initiating checkout.
  }
  
async function checkoutPart() {

  // 1.0: pull data
  var selectedEquipment = null;
  var checkoutDate = null;
  var checkoutTime = null;
  var returnDate = null;
  var returnTime = null;
  try {
    selectedEquipment = document.getElementById("equipmentDropdown").value;
    checkoutDate = document.getElementById("checkoutDate").value;
    checkoutTime = document.getElementById("checkoutTime").value;
    returnDate = document.getElementById("returnDate").value;
    returnTime = document.getElementById("returnTime").value;

    emptyVal = isEmpty(selectedEquipment, checkoutDate, checkoutTime, returnDate, returnTime);
    if(emptyVal){
      throw new Error('All fields are required.');
    }
  }
  catch(err) {
    openPopup(err);
    return;
    // alert("Input Error, ", err);
  }
  finally {
    // 1.1: clear input fields (security)
    document.getElementById("equipmentDropdown").value ="";
    document.getElementById("checkoutDate").value ="";
    document.getElementById("checkoutTime").value ="";
    document.getElementById("returnDate").value ="";
    document.getElementById("returnTime").value ="";
    // preston: i'm not sure whether i can just set dom element values here to null or not, will have to test
  }
  // START-DEBUG
  console.log(selectedEquipment);
  console.log(checkoutDate);
  console.log(checkoutTime);
  console.log(returnDate);
  console.log(returnTime);

  // Comment out lines in finally to test 
  // console.log("Fields post clean");

  // console.log("equipmentDropdown: ", document.getElementById("equipmentDropdown").value)
  // console.log("checkoutDate: ", document.getElementById("checkoutDate").value)
  // console.log("checkoutTime: ",document.getElementById("checkoutTime").value)
  // console.log("returnDate: ",document.getElementById("returnDate").value)
  // console.log("returnTime: ",document.getElementById("returnTime").value)
  // END-DEBUG

  // 2.0: send request to verify that checkout is possible
  const data = {};
  data["type"] = "validate"
  data["input"] = {
    "selectedEquipment": selectedEquipment,
    "checkoutDate": checkoutDate,
    "checkoutTime": checkoutTime,
    "returnDate": returnDate,
    "returnTime": returnTime,
    "username": "myusername",
  };
  var response;
  postRequest(data, "/checkout").then(res => {
    console.log(res);
    response = res;

    if(response[0] == "No issues"){
      // 4.0: possible + no request needed: send request to perform checkout
      console.log("Res: No issues");
      // modify data object to change request type and add user info
      // NOTE: NEED TO GET USER INFO, PLACEHOLDER IS BEING USED
      data["type"] = "checkout";
      // incomplete
      postRequest(data, "/checkout").then(res => {});
      openPopup("Checkout successful!");
    }
    else if (response.length == 1 && response[0] == 
      "Email professor to verify your permissions for this equipment."){

    // 5.0: possible + request needed: produce alert giving user the option to send request email
      console.log("Res: Email professor to..");
      openPopup("Email professor to verify your permissions for this equipment.");

    }
    else{
      // 6.0: impossible: notify user
      openPopup("Invalid checkout or return date! Please select another.");
      console.log("Res: Issues..");
    }
  });

  // 3.0: handle response (possible/impossible, request needed?)
  

  // 7.0: handle db op response (if applicable)
}

function openPopup(errorMessage) {
  document.getElementById('error-message').innerText = errorMessage;
  document.getElementById('popup').style.display = 'block';
}

function closePopup(){
  document.getElementById('popup').style.display = 'none';
}

function isEmpty(...args){
  for (let i = 0; i < args.length; i++) {
    console.log(`Arg ${i}: ${args[i]}`);
    if(args[i] == ""){
      return true;
    }
  }
  return false;
}
