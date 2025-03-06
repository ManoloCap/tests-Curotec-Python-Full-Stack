export default class APIConnector {
    constructor() {
        this.baseUrl = 'http://localhost:8000';
    }

    async getItems(page, perPage) {
        const url = `${this.baseUrl}/items?per_page=${perPage}&page=${page}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            // Parse the error response if possible
            const errorData = await response.json().catch(() => null);
            // Now handle the error response
            console.log(`HTTP Error! Status: ${response.status}`);
            console.log(errorData);
      
            if (response.status === 404 && errorData && errorData.detail) {
              console.log("ERROR WITH DETAIL! ", errorData.detail);
              return errorData;
            }
            
            return null; 
          }
          return await response.json();
        } catch (error) {
          console.error("Network Error! ", error);
          return null;
        }
    }
}