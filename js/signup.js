$("#register-button").on("click", function (event) {
    event.preventDefault();
    console.log("Button clicked");
    var user = {
        userPassword: $("#password-registration").val(),
        userEmail: $("#email-registration").val(),
        userFirstName: $("#first-name-registration").val(),
        userLastName: $("#surname-registration").val(),
    };

    $.ajax({
        type: "POST",
        url: window.BACKEND_URL + "/user",
        contentType: "application/json",
        data: JSON.stringify(user),
        cors: true,
        success: function (data) {
            console.log("User created successfully", data);
            window.location.href = "/";
        },
        error: function (error) {
            console.error("Error creating user", error);
        }
    });

    $.ajax({
        type: "POST",
        url: window.BACKEND_URL + "/auth/login",
        contentType: "application/json",
        data: JSON.stringify(user),
        cors: true,
        success: function (data) {
            console.log("Logged in", data);
            if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                window.location.href = "/";
            }},
        error: function (error) {
            console.error("Error logging in", error);
        }
    });
});