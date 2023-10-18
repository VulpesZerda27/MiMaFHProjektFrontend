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

    else {
        let errorData = response.json();
        let errorMessage = "";
        switch (response.status) {
            case 400:
                errorMessage = "Bad Request";
                alert(errorMessage);
                break;
            case 401:
                errorMessage = "Unauthorized. Please check your credentials.";
                alert(errorMessage);
                break;
            case 403:
                errorMessage = "Forbidden. You don't have permission to access this.";
                alert(errorMessage);
                break;
            case 404:
                errorMessage = "Not Found. The resource you're looking for doesn't exist.";
                break;
            case 409:
                errorMessage = "Database constraint failed.";
                alert(errorMessage);
                break;
            case 410:
                errorMessage = "Email already registered.";
                alert(errorMessage);
                break;
            case 500:
                errorMessage = "Internal Server Error.";
                alert(errorMessage);
                break;
            default:
                errorMessage = "An unknown error occurred.";
                break;
        }

        if (errorData && errorData.message) {
            errorMessage += ` Details: ${errorData.message}`;
        }
        throw new Error(errorMessage);
    }
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
    const logoutNavItem = document.querySelector("#logout-button").parentNode;
    const shoppingBasketNavItem = document.querySelector(".nav-item a[href*='shoppingbasket.html']").parentNode;
    const loginNavItem = document.querySelector(".nav-item a[href*='login.html']").parentNode;
    const signupNavItem = document.querySelector(".nav-item a[href*='signup.html']").parentNode;
    const token = localStorage.getItem('accessToken');

    if (token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.authorities && decoded.authorities.includes('USER')) {
                logoutNavItem.style.display = 'block';
                shoppingBasketNavItem.style.display = 'block';
                loginNavItem.style.display = 'none';
                signupNavItem.style.display = 'none';
            } else {
                logoutNavItem.style.display = 'none';
                shoppingBasketNavItem.style.display = 'none';
                loginNavItem.style.display = 'block';
                signupNavItem.style.display = 'block';
            }
        } catch (error) {
            console.error("Error decoding token", error);
            logoutNavItem.style.display = 'none';
            shoppingBasketNavItem.style.display = 'none';
            loginNavItem.style.display = 'block';
            signupNavItem.style.display = 'block';
        }
    } else {
        logoutNavItem.style.display = 'none';
        shoppingBasketNavItem.style.display = 'none';
        loginNavItem.style.display = 'block';
        signupNavItem.style.display = 'block';
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
    makeRequest(`${window.BASKETITEM_ENDPOINT}/${sub}/${productId}`, "POST")
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
    userLoggedInVisibility();
});