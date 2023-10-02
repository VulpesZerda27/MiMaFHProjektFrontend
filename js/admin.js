const ENTITY_CONFIG = {
    user: ['id', 'firstName', 'lastName', 'email', 'action'],
    product: ['id', 'productName', 'price', 'description', 'action'],
    // ... Add other entities and their attributes here.
};

document.addEventListener("DOMContentLoaded", function() {
    // Event delegation for dynamically generated edit buttons
    document.querySelector('#data-section tbody').addEventListener('click', function(e) {
        let entityType = document.querySelector('#idHeader').getAttribute('entity-type');

        if (e.target.classList.contains('submit-btn')) {
            const row = e.target.closest('tr');
            const entityType = document.querySelector('#idHeader').getAttribute('entity-type');

            const newData = {};
            Array.from(row.cells).forEach((cell, index) => {
                if (index !== 0 && !cell.innerHTML.includes('button')) {
                    const headerName = document.querySelectorAll('#data-section th')[index].getAttribute('data-header-name');
                    // Check if the cell contains an input element
                    console.log(headerName);
                    const inputElement = cell.querySelector('input');
                    if (inputElement) {
                        newData[headerName] = inputElement.value;
                    }

                    // Check if the cell contains a select element
                    const selectElement = cell.querySelector('select');
                    if (selectElement) {
                        newData[headerName] = selectElement.options[selectElement.selectedIndex].text;
                        console.log(selectElement.options[selectElement.selectedIndex].text)
                    }
                }
            });

            const createEntity = window[`create${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`];
            const fetchEntities = window[`fetch${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`];

            createEntity(newData)
                .then(entity => {
                    console.log(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} added successfully!`, entity);
                    fetchEntities();
                })
                .catch(error => {
                    console.error(`Error adding ${entityType}:`, error);
                });
        }

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
                        const headerName = document.querySelectorAll('#data-section th')[index].getAttribute('data-header-name');

                        if(headerName == 'category'){
                            cell.innerHTML = `<select class="category-edit-select"> </select>`;
                            populateCategoryDropdown('.category-edit-select');
                        }
                        else if(headerName == 'author'){
                            cell.innerHTML =`<select class="author-edit-select"> </select>`;
                            populateAuthorDropdown('.author-edit-select');
                        }
                        else{
                        const inputValue = cell.textContent.trim();
                        cell.innerHTML = `<input type="text" value="${inputValue}" class="form-control">`;
                    }
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
                    if (index !== 0 && !cell.innerHTML.includes('button')) {
                        const headerName = document.querySelectorAll('#data-section th')[index].getAttribute('data-header-name');
                        // Check if the cell contains an input element
                        console.log(headerName);
                        const inputElement = cell.querySelector('input');
                        if (inputElement) {
                            updatedData[headerName] = inputElement.value;
                        }

                        // Check if the cell contains a select element
                        const selectElement = cell.querySelector('select');
                        if (selectElement) {
                            updatedData[headerName] = selectElement.options[selectElement.selectedIndex].text;
                            console.log(selectElement.options[selectElement.selectedIndex].text)
                        }
                    }
                });

                // Send the update request (assuming you have a function like updateEntity already)
                const entityId = btn.getAttribute('data-id');
                updateEntity(entityType, entityId, updatedData)
                    .then(entity => {
                        // Convert editable fields back to static ones

                        const fetchEntities = window[`fetch${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`];
                        fetchEntities();

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

            const fetchEntities = window[`fetch${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`];
            fetchEntities();

            editButton.textContent = 'Edit';

            // Remove the Cancel button
            btn.remove();
        }

        if (e.target && e.target.classList.contains('image-btn')) {
            const productId = e.target.getAttribute('data-id');
            document.querySelector('#imageModal').setAttribute('data-product-id', productId);

            fetchImageForProduct(productId);  // Implement this function to fetch and display image

            const modal = document.getElementById('imageModal');
            modal.style.display = "block";
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

function fetchImageForProduct(productId) {
    fetch(`${window.BACKEND_URL}/product/image/${productId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const productImage = document.getElementById('productImage');
            const blobUrl = URL.createObjectURL(blob);
            productImage.src = blobUrl;
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

function uploadImageForProduct(file) {
    let productId = document.getElementById('imageModal').getAttribute('data-product-id');
    const formData = new FormData();
    formData.append('productImage', file);

    fetch(`${window.IMAGE_ENDPOINT}/${productId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.querySelector('.close-modal').click();
            alert("Image uploaded successfully!");
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
}

// Close the modal
document.querySelector('.close-modal').addEventListener('click', function() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
});

// Image upload handling
document.getElementById('uploadButton').addEventListener('click', function() {
    const inputFile = document.getElementById('imageUpload');
    const file = inputFile.files[0];

    if (file) {
        // Implement the function to upload the image to the backend
        uploadImageForProduct(file);
    }
});

document.addEventListener("DOMContentLoaded", fetchUser);