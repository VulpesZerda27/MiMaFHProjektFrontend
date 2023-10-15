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

$("#register-button").on("click", function (event) {
    event.preventDefault();
    console.log("Button clicked");

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
