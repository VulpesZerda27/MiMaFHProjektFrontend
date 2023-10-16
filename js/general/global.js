function makeRequest(url, method, data) {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
        'Content-Type': 'application/json'
    };

    if (accessToken && !isTokenExpired(accessToken)) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    let config = {
        method: method,
        headers: headers,
        mode: "cors"
    };

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
        config.body = JSON.stringify(data);
    }

    return fetch(url, config);
}

function handleHTTPErrors(response) {
    if (response.ok) return response;

    return response.json().then(errorData => {
        let errorMessage = "";
        switch (response.status) {
            case 400:
                errorMessage = "Bad Request";
                break;
            case 401:
                errorMessage = "Unauthorized. Please check your credentials.";
                break;
            case 403:
                errorMessage = "Forbidden. You don't have permission to access this.";
                break;
            case 404:
                errorMessage = "Not Found. The resource you're looking for doesn't exist.";
                break;
            case 500:
                errorMessage = "Internal Server Error.";
                break;
            default:
                errorMessage = "An unknown error occurred.";
                break;
        }

        // Attach any server-sent error messages
        if (errorData && errorData.message) {
            errorMessage += ` Details: ${errorData.message}`;
        }

        throw new Error(errorMessage);
    });
}

function isTokenExpired(token) {
    try {
        const encodedPayload = token.split('.')[1];
        const decodedPayload = atob(encodedPayload); // Use atob() to decode base64
        const payload = JSON.parse(decodedPayload);

        const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds

        return payload.exp < currentTimestamp;
    } catch (e) {
        console.error("Error decoding token:", e);
        return true; // If there's an error decoding, consider it expired
    }
}

function adminLoggedInVisibility() {
    const adminNavItem = document.querySelector(".nav-item a[href*='admin.html']").parentNode;
    const token = localStorage.getItem('accessToken');

    if (token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.authorities && decoded.authorities.includes('ADMIN')) {
                adminNavItem.style.display = 'block';
            } else {
                adminNavItem.style.display = 'none';
            }
        } catch (error) {
            console.error("Error decoding token", error);
            adminNavItem.style.display = 'none';
        }
    } else {
        adminNavItem.style.display = 'none';
    }
}

function userLoggedInVisibility(){
    const token = localStorage.getItem('accessToken');

    if(token){

    }
}

function handleAddToBasket(e) {
    const productId = e.target.getAttribute('data-id');
    const token = localStorage.getItem('accessToken');
    let sub;
    if (token) {
        const payload = getPayloadFromToken(token);
        sub = payload.sub;
    }
    makeRequest(`http://localhost:8080/user/basket/${sub}/${productId}`, "POST")
        .then(handleHTTPErrors)
        .then(alert("Product added to Basket!"));
}

function getPayloadFromToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
}

document.addEventListener("DOMContentLoaded", function (){
    adminLoggedInVisibility();
});