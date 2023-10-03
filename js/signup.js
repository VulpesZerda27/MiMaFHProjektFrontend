$("#register-button").on("click", function (event) {
    event.preventDefault();
    console.log("Button clicked");

    if($("#password-registration").val() == $("#password-confirm-registration").val()) {
        var user = {
            password: $("#password-registration").val(),
            email: $("#email-registration").val(),
            firstName: $("#first-name-registration").val(),
            lastName: $("#surname-registration").val(),
        };

        $.ajax({
            type: "POST",
            url: window.BACKEND_URL + "/user",
            contentType: "application/json",
            data: JSON.stringify(user),
            cors: true,
            success: function (data) {
                console.log("User created successfully", data);
                var loginUser = {
                    email: $("#email-registration").val(),
                    password: $("#password-registration").val(),
                };
                $.ajax({
                    type: "POST",
                    url: window.BACKEND_URL + "/auth/login",
                    contentType: "application/json",
                    data: JSON.stringify(loginUser),
                    cors: true,
                    success: function (data) {
                        console.log("Logged in", data);
                        if (data.accessToken) {
                            localStorage.setItem("accessToken", data.accessToken);
                            window.location.href = "/";

                        }
                    },
                    error: function (error) {
                        console.error("Error logging in", error);
                    }
                });

            },
            error: function (error) {
                console.error("Error creating user", error);
            }
        });
    }
    else {
        alert("Passwords don't match!");
    }
});