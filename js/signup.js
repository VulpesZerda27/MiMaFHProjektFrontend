async function registerAndLoginUser(user) {
    makeRequest(window.BACKEND_URL + "/user", "POST", user)
        .then(handleHTTPErrors)
        .then(response => response.json())
        .then(data => {
            console.log("User created successfully", data);

            return loginUser({
                email: $("#email-registration").val(),
                password: $("#password-registration").val()
            })
        })
        .then(handleHTTPErrors)
}

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

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if ($("#password-registration").val() !== $("#password-confirm-registration").val()) {
        alert("Passwords don't match!");
        return;
    }

    registerAndLoginUser({
        email: $("#email-registration").val(),
        password: $("#password-registration").val(),
        firstName: $("#first-name-registration").val(),
        lastName: $("#surname-registration").val(),
    })
        .catch(error => console.error("Failed to register user:", error));
});
