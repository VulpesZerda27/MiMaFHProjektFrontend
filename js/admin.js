$(document).ready(function() {
    // Fetching users
    function fetchUsers() {
        $.get(window.USER_ENDPOINT, function(data) {
            let rows = "";
            data.forEach(user => {
                rows += `<tr>
                   <td>${user.userId}</td>
                   <td>${user.userFirstName}</td>
                   <td>${user.userLastName}</td>
                   <!-- ... other fields ... -->
                   <td>
                     <button class="btn btn-info btn-sm edit-btn" data-id="${user.userId}">Edit</button>
                     <button class="btn btn-danger btn-sm delete-btn" data-id="${user.userId}">Delete</button>
                   </td>
                 </tr>`;
            });
            $("#users-section table tbody").html(rows);
        });
    }

    fetchUsers();

    // Opening the modal to edit a user
    $(document).on("click", ".edit-btn", function() {
        let userId = $(this).data("id");
        $.get(window.USER_ENDPOINT + `/${userId}`, function(user) {
            $("#userId").val(user.userId);
            $("#userFirstName").val(user.userFirstName);
            $("#userLastName").val(user.userLastName);
            // ... set other fields ...
            $("#userModal").modal("show");
        });
    });

    // Saving changes to a user
    $("#saveUserBtn").click(function() {
        let userId = $("#userId").val();
        let userData = {
            userFirstName: $("#userFirstName").val(),
            userLastName: $("#userLastName").val()
            // ... get other fields ...
        };

        // If userId exists, it's an edit, otherwise it's an add
        if (userId) {
            $.ajax({
                url: window.ADMIN_USER_ENDPOINT + `/${userId}`,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(userData),
                success: function() {
                    $("#userModal").modal("hide");
                    fetchUsers();
                }
            });
        } else {
            $.post("/user", userData, function() {
                $("#userModal").modal("hide");
                fetchUsers();
            });
        }
    });

    // Deleting a user
    $(document).on("click", ".delete-btn", function() {
        let userId = $(this).data("id");
        if (confirm("Are you sure?")) {
            $.ajax({
                url: window.USER_ENDPOINT + `/${userId}`,
                type: "DELETE",
                success: function() {
                    fetchUsers();
                }
            });
        }
    });

    // Opening modal to add a user
    $("#add-user-btn").click(function() {
        $("#userId").val("");
        $("#userFirstName").val("");
        $("#userLastName").val("");
        // ... reset other fields ...
        $("#userModal").modal("show");
    });
});
