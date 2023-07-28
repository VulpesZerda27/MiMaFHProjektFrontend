$("#register-button").on("click", function (event) {

    var user = {
        userName: $("#usernameInput").val(),
        password: $("#passwordInput").val(),
        email: $("#emailInput").val(),
        name: $("#nameInput").val(),
        surname: $("#surnameInput").val(),
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/user/add",
        contentType: "application/json",
        data: JSON.stringify(user),
        cors: true,
        success: function (data) {
            console.log("User created successfully", data);
        },
        error: function (error) {
            console.error("Error creating user", error);
        }
    });
});