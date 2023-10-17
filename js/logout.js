// Define logoutUser function
async function logoutUser() {
    const token = localStorage.getItem("accessToken");
    try {
        // Send a GET request to the backend's logout endpoint to invalidate the session/token
        await makeRequest(window.LOGOUT_ENDPOINT, "GET", null, {
            Authorization: `Bearer ${token}`
        });

        // Clear the token from localStorage
        localStorage.removeItem("accessToken");

        // Successful logout message
        console.log("Logged out successfully");

        // Redirect the user to the logout page or any other appropriate page
        window.location.href = "../html/logout.html";
    } catch (error) {
        // Error message for failed logout
        console.error("Failed to logout user:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

// Event listener for the logout button
$("#logout-button").on("click", function(event) {
    event.preventDefault();

    // Call the logoutUser function and handle errors here
    logoutUser().catch(error => {
        console.error("Failed to logout user:", error);
    });
});
