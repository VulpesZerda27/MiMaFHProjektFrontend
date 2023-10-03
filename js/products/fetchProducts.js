async function fetchProducts() {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        // get access token from localStorage
        const accessToken = localStorage.getItem("accessToken");

        // if access token, add authorization header
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch("http://localhost:8080/product", {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Products:", data);
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}