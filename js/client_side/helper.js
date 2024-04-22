const { hostname, protocol } = window.location;
const baseURL = `${protocol}//${hostname}`;

export async function fetchEquipmentData() {

    try {
      const response = await fetch(`${baseURL}/getEquipment`);
      
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
