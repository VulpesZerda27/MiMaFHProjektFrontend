const ENTITY_CONFIG = {
    user: ['id', 'firstName', 'lastName', 'email', 'action'],
    product: ['id', 'productName', 'price', 'description', 'action'],
    // ... Add other entities and their attributes here.
};

document.addEventListener("DOMContentLoaded", function() {
    // Event delegation for dynamically generated edit buttons
    document.querySelector('#data-section tbody').addEventListener('click', function(e) {
        let entityType = document.querySelector('#idHeader').getAttribute('data-id');

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
            const userId = btn.getAttribute('data-id');
            const row = btn.closest('tr');

            if (btn.textContent === 'Edit') {
                // Store original values
                const originalData = {};
                Array.from(row.cells).forEach((cell, index) => {
                    // Skipping the ID and Action columns
                    if (index !== 0 && index !== row.cells.length - 1) {
                        const headerName = cell.getAttribute('data-header-name'); // Assuming each cell has a data-header-name attribute.
                        originalData[headerName] = cell.textContent;
                    }
                });
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
                const updatedData = {};
                Array.from(row.cells).forEach((cell) => {
                    const headerName = cell.getAttribute('data-header-name');
                    if (headerName) { // Checks if headerName is not null or undefined
                        updatedData[headerName] = cell.querySelector('input').value;
                    }
                });

                console.log(updatedData);

                updateEntity(entityType ,userId, updatedData)
                    .then(entity => {
                        console.log(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} updated successfully!`, entity);
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
                        console.error(`Error updating ${entityType}:`, error);
                    });
            }
        }
        if (e.target.classList.contains('cancel-btn')) {
            const btn = e.target;
            const editButton = btn.previousElementSibling;
            const row = btn.closest('tr');

            // Restore the original values from the Edit button's data attribute
            const originalData = JSON.parse(editButton.getAttribute('data-original-data'));

            let columnIndex = 1; // Assuming that data starts from the second column (index 1)
            for (const key in originalData) {
                if (originalData.hasOwnProperty(key)) {
                    row.cells[columnIndex].textContent = originalData[key];
                    columnIndex++;
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