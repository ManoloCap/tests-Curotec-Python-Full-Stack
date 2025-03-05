export default class APIConnector {
    constructor() {
        this.baseUrl = 'http://localhost:8000';
    }

    async getItems(page, perPage) {
        const url = `${this.baseUrl}/items?per_page=${perPage}&page=${page}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching items:', error);
            return null;
        }
    }
}