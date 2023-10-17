async function logoutUser() {
    const token = localStorage.getItem("accessToken");
    try {
        await makeRequest(window.LOGOUT_ENDPOINT, "GET", null, {
            Authorization: `Bearer ${token}`
        });
        localStorage.removeItem("accessToken");
        alert("Logged out successfully");
        window.location.href = "../html/logout.html";
    } catch (error) {
        throw error;
    }
}

$("#logout-button").on("click", function(event) {
    event.preventDefault();

    logoutUser().catch(error => {
        console.error("Failed to logout user:", error);
    });
});
