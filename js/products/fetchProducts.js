async function fetchProducts() {
    try {
        // Start with the base headers
        const headers = {
            'Content-Type': 'application/json'
        };

        // Get the access token from localStorage
        const accessToken = localStorage.getItem("accessToken");

        // If there's an access token, add the Authorization header
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
        throw error;  // Propagate the error to be handled by the caller.
    }
}