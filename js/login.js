$("#login-button").on("click", function (event) {
    event.preventDefault();
    console.log("Button clicked");
    var user = {
        email: $("#username-login").val(),
        password: $("#password-login").val(),
    };

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
    //            window.location.href = "/";
        }},
        error: function (error) {
            console.error("Error logging in", error);
        }
    });
});