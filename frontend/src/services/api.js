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
            
            console.log(" DOING THIS .... ")
            if (errorData && Array.isArray(errorData.detail) &&
                errorData.detail.length > 0 &&
                errorData.detail[0].type &&
                errorData.detail[0].msg) {
                return { detail: errorData.detail[0].msg };
            }

            console.log("THEN? ")
            return null; 
          }
          return await response.json();
        } catch (error) {
          console.error("Network Error! ", error);
          return null;
        }
    }

    async deleteItem(id) {
        const url = `${this.baseUrl}/items/${id}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response) {
                return null
            }
            return true

        } catch (error) {
            console.error("Network Error! ", error);
            return null;
        }
    }


    async createItem(name, description) {
        const url = `${this.baseUrl}/items/`;
        const payload = {
            name,
            description
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // Handle error similarly to deleteItem
                console.error("Error creating item! Status: ", response.status);
                const errorData = await response.json().catch(() => null);
                console.error("Error response data: ", errorData);
                return null;
            }

            return await response.json(); // Assuming successful creation returns the created item

        } catch (error) {
            console.error("Network Error! ", error);
            return null;
        }
    }

    
}


