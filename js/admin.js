function createUserRow(user) {
    return `
        <tr>
            <td>${user.userId}</td>
            <td>${user.userFirstName}</td>
            <td>${user.userLastName}</td>
            <td>${user.userEmail}</td>
            <td>
                <button class="btn btn-info btn-sm edit-btn" data-id="${user.userId}">Edit</button>
                <button class="btn btn-warning btn-sm status-btn" data-id="${user.userId}">Disable</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${user.userId}">Delete</button>
            </td>
        </tr>
    `;
}

document.addEventListener("DOMContentLoaded", function() {
    // Event delegation for dynamically generated edit buttons
    document.querySelector('#users-section tbody').addEventListener('click', function(e) {
        if (e.target.classList.contains('status-btn')) {
            const btn = e.target;
            const userId = btn.getAttribute('data-id');
            const row = btn.closest('tr');
            let isUserEnabled;
            let updatedData;

            // Fetch current data first
            const currentData = {
                userFirstName: row.cells[1].textContent,
                userLastName: row.cells[2].textContent,
                userEmail: row.cells[3].textContent,
            };

            // Check button label to decide action
            if (btn.textContent === 'Disable') {
                isUserEnabled = false;
                updatedData = { ...currentData, isEnabled: isUserEnabled };
            } else if (btn.textContent === 'Enable') {
                isUserEnabled = true;
                updatedData = { ...currentData, isEnabled: isUserEnabled };
            }

            // Send the update request
            updateUser(userId, updatedData)
                .then(user => {
                    console.log('User status updated successfully!', user);
                    // Change the button label only after successful request
                    btn.textContent = isUserEnabled ? 'Disable' : 'Enable';
                })
                .catch(error => {
                    console.error('Error updating user status:', error);
                });
        }

        if (e.target.classList.contains('delete-btn')) {
            const userId = e.target.getAttribute('data-id');
            // Confirm deletion with the user
            const isConfirmed = confirm('Are you sure you want to delete this user?');
            if (isConfirmed) {
                deleteUser(userId)
                    .then(() => {
                        // Remove the row from the table
                        fetchUsers();
                        //e.target.closest('tr').remove();
                        console.log('User deleted successfully');
                    })
                    .catch(error => {
                        console.error('Error deleting user:', error);
                    });
            }
        }

        if (e.target.classList.contains('edit-btn')) {
            const btn = e.target;
            const userId = btn.getAttribute('data-id');
            const row = btn.closest('tr');

            if (btn.textContent === 'Edit') {
                // Store original values
                const originalData = {
                    userFirstName: row.cells[1].textContent,
                    userLastName: row.cells[2].textContent,
                    userEmail: row.cells[3].textContent
                    // Add other fields as necessary
                };
                btn.setAttribute('data-original-data', JSON.stringify(originalData));
                // Convert row data to editable fields
                Array.from(row.cells).forEach((cell, index) => {
                    // Skipping the ID and Action columns
                    if (index !== 0 && index !== row.cells.length - 1) {
                        const inputValue = cell.textContent;
                        cell.innerHTML = `<input type="text" value="${inputValue}" />`;
                    }
                });
                // Add the Cancel button
                const cancelButton = document.createElement('button');
                cancelButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'cancel-btn');
                cancelButton.textContent = 'Cancel';
                btn.after(cancelButton);
                btn.textContent = 'Confirm';
            } else {
                // Fetch data from editable fields
                const userId = btn.getAttribute('data-id');
                const updatedData = {
                    userFirstName: row.cells[1].querySelector('input').value,
                    userLastName: row.cells[2].querySelector('input').value,
                    userEmail: row.cells[3].querySelector('input').value
                };

                updateUser(userId, updatedData)
                    .then(user => {
                        console.log('User updated successfully!', user);
                        // Convert editable fields back to normal
                        Array.from(row.cells).forEach((cell, index) => {
                            if (index !== 0 && index !== row.cells.length - 1) {
                                cell.textContent = cell.querySelector('input').value;
                            }
                        });

                        // Remove the Cancel button
                        row.querySelector('.cancel-btn').remove();
                        btn.textContent = 'Edit';
                    })
                    .catch(error => {
                        console.error('Error updating user:', error);
                    });
            }
        }
        if (e.target.classList.contains('cancel-btn')) {
            const btn = e.target;
            const editButton = btn.previousElementSibling;
            const row = btn.closest('tr');

            // Restore the original values from the Edit button's data attribute
            const originalData = JSON.parse(editButton.getAttribute('data-original-data'));
            row.cells[1].textContent = originalData.userFirstName;
            row.cells[2].textContent = originalData.userLastName;
            row.cells[3].textContent = originalData.userEmail;
            // Add other fields as necessary

            editButton.textContent = 'Edit';

            // Remove the Cancel button
            btn.remove();
        }
    });
});

function updateUser(userId, userData) {
    const url = `${window.ADMIN_USER_ENDPOINT}/${userId}`;
    console.log(userData);
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")  // assuming accessToken is available
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating user: ${response.statusText}`);
            }
            return response.json();
        });
}



function fetchUsers() {
    fetch(window.ADMIN_USER_ENDPOINT, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Users:", data);  // Log the data for inspection

            const userRows = data.map(createUserRow).join('');
            document.querySelector('#users-section tbody').innerHTML = userRows;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}


function editUser(){

}

function disableUser(){

}

function deleteUser(userId) {
    return fetch(`${window.ADMIN_USER_ENDPOINT}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`  // assuming accessToken is stored in window object
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting user');
            }
        });
}

document.addEventListener("DOMContentLoaded", fetchUsers);