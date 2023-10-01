const ENTITY_CONFIG = {
    user: ['id', 'firstName', 'lastName', 'email', 'action'],
    product: ['id', 'productName', 'price', 'description', 'action'],
    // ... Add other entities and their attributes here.
};

document.addEventListener("DOMContentLoaded", function() {
    // Event delegation for dynamically generated edit buttons
    document.querySelector('#data-section tbody').addEventListener('click', function(e) {
        let entityType = document.querySelector('#idHeader').getAttribute('entity-type');

        if (e.target.classList.contains('admin-rights-btn')) {
            const action = e.target.getAttribute('data-action');
            const isConfirmed = confirm(`Are you sure you want to ${action} Admin rights?`);

            if (isConfirmed) {
                const userId = e.target.getAttribute('data-id');

                // Get the user data from the 'Edit' button's data-original-data attribute
                const editButton = document.querySelector(`#edit-button[data-id="${userId}"]`);
                const userDataString = editButton.getAttribute('data-original-data');
                const user = JSON.parse(userDataString);
                let updatedRoles = [];

                if (action === 'revoke') {
                    // Revoke admin rights
                    updatedRoles = user.roles.filter(role => role !== 'ADMIN');
                } else if (action === 'grant') {
                    // Grant admin rights
                    updatedRoles = [...user.roles, 'ADMIN'];
                }

                user.roles = updatedRoles;

                updateEntity('user', userId, user)
                    .then(updatedUser => {
                        // Update the row with the updated user data.
                        fetchUser();
                    })
                    .catch(error => {
                        console.error("Error updating admin rights:", error);
                    });
            }
        }

        if (e.target.classList.contains('status-btn')) {
            const btn = e.target;
            const entityId = btn.getAttribute('data-id');
            const row = btn.closest('tr');
            let isUserEnabled;

            // Fetch current data first
            const currentData = fetchRowData(row, entityType);
                // Check button label to decide action
                if (btn.textContent === 'Disable') {
                    isUserEnabled = Boolean(false);
                } else if (btn.textContent === 'Enable') {
                    isUserEnabled = Boolean(true);
                }
                console.log("isUserEnabled:", isUserEnabled);  // Log the value for verification

               const updatedData = {...currentData, enabled: isUserEnabled};

            // Send the update request
            updateEntity(entityType, entityId, updatedData)
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
            const entityId = e.target.getAttribute('data-id');
            // Confirm deletion with the user
            const isConfirmed = confirm(`Are you sure you want to delete this ${entityType}?`);

            if (isConfirmed) {
                deleteEntity(entityType, entityId)
                    .then(() => {
                        // Dynamically fetch the entities based on the type
                        const fetchEntities = window[`fetch${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`];
                        fetchEntities();
                        console.log(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} deleted successfully`);
                    })
                    .catch(error => {
                        console.error(`Error deleting ${entityType}:`, error);
                    });
            }
        }

        if (e.target.classList.contains('edit-btn')) {
            const btn = e.target;
            const row = btn.closest('tr');

            if (btn.textContent === 'Edit') {
                // Convert static fields to editable fields (e.g., <input> elements)
                Array.from(row.cells).forEach((cell, index) => {
                    if (index !== 0 && !cell.innerHTML.includes('button')) {
                        const inputValue = cell.textContent.trim();
                        cell.innerHTML = `<input type="text" value="${inputValue}" class="form-control">`;
                    }
                });

                // Change the Edit button to Confirm and show Cancel button
                btn.textContent = 'Confirm';
                const cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.className = 'btn btn-secondary btn-sm ml-2 cancel-btn';
                btn.parentNode.appendChild(cancelButton);
            } else if (btn.textContent === 'Confirm') {
                // Get edited values and send them to the backend for updating
                const updatedData = {};
                Array.from(row.cells).forEach((cell, index) => {
                    if (index !== 0 && index !== row.cells.length - 1) {
                        const headerName = document.querySelectorAll('#data-section th')[index].getAttribute('data-header-name');
                        updatedData[headerName] = cell.querySelector('input').value;
                    }
                });

                // Send the update request (assuming you have a function like updateEntity already)
                const entityId = btn.getAttribute('data-id');
                updateEntity(entityType, entityId, updatedData)
                    .then(entity => {
                        // Convert editable fields back to static ones
                        Array.from(row.cells).forEach((cell, index) => {
                            if (index !== 0 && index !== row.cells.length - 1) {
                                cell.textContent = cell.querySelector('input').value;
                            }
                        });
                        btn.textContent = 'Edit'; // Change the button text back to Edit
                        row.querySelector('.cancel-btn').remove(); // Remove the Cancel button
                    })
                    .catch(error => {
                        console.error(`Error updating ${entityType}:`, error);
                    });
            }
        }

        if (e.target.classList.contains('cancel-btn')) {
            const btn = e.target;
            const row = btn.closest('tr');
            const editButton = row.querySelector('#edit-button');

            // Restore the original values from the Edit button's data attribute
            const originalData = JSON.parse(editButton.getAttribute('data-original-data'));

            console.log(originalData);

            let headers = Array.from(document.querySelectorAll('#data-section th'));

            for (const key in originalData) {
                if (originalData.hasOwnProperty(key)) {
                    // Find the header that corresponds to this key
                    const matchingHeader = headers.find(header => header.getAttribute('data-header-name') === key);
                    if (matchingHeader) {
                        const columnIndex = headers.indexOf(matchingHeader);
                        row.cells[columnIndex].textContent = originalData[key];
                    }
                }
            }

            editButton.textContent = 'Edit';

            // Remove the Cancel button
            btn.remove();
        }
    });
});

function fetchRowData(row, entityType) {
    const attributes = ENTITY_CONFIG[entityType];
    const rowData = {};

    attributes.forEach((attribute, index) => {
        // Skip ID and action columns for data extraction
        if (attribute !== 'id' && attribute !== 'action') {
            rowData[attribute] = row.cells[index].textContent;
        }
    });

    return rowData;
}

function updateEntity(entityType, entityId, entityData) {
    const url = `${window[entityType.toUpperCase() + '_ENDPOINT']}/${entityId}`;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        },
        body: JSON.stringify(entityData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating ${entityType}: ${response.statusText}`);
            }
            return response.json();
        });
}

function deleteEntity(entityType, entityId) {
    return fetch(`${window[entityType.toUpperCase() + '_ENDPOINT']}/${entityId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error deleting ${entityType}`);
            }
        });
}


document.addEventListener("DOMContentLoaded", fetchUser);