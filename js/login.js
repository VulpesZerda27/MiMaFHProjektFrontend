async function loginUser(user){
    makeRequest(window.BACKEND_URL + "/auth/login", "POST", user)
        .then(handleHTTPErrors)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Logged in", data);
            if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                window.location.href = "/";
            }
        })
}

$("#login-button").on("click", function (event) {
    event.preventDefault();

    loginUser({
        email: $("#username-login").val(),
        password: $("#password-login").val()
    })
        .catch(error => console.error("Failed to login user:", error));
});