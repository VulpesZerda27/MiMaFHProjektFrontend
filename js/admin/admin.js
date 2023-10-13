const ENTITY_CONFIG = {
    user: ['id', 'firstName', 'lastName', 'email', 'action'],
    product: ['id', 'productName', 'price', 'description', 'action'],
};

document.addEventListener("DOMContentLoaded", function() {
    populateUserSectionOfAdminDashboard();
    document.querySelector('#data-section tbody').addEventListener('click', function(e) {
        let entityType = document.querySelector('#idHeader').getAttribute('entity-type');

        if (e.target.classList.contains('submit-btn')) {
            handleEntityCreation(e, entityType);
        }

        if (e.target.classList.contains('admin-rights-btn')) {
            handleAdminRightsChange(e);
        }

        if (e.target.classList.contains('status-btn')) {
            handleUserStatusChange(e);
        }

        if (e.target.classList.contains('delete-btn')) {
            handleEntityDeletion(e, entityType);
        }

        if (e.target.classList.contains('edit-btn')) {
            const btn = e.target;
            const row = btn.closest('tr');

            if (btn.textContent === 'Edit') {
                handleEntityEdit(btn, row);
            } else if (btn.textContent === 'Confirm') {
                handleEntityEditConfirmation(btn, row, entityType);
            }
        }

        if (e.target.classList.contains('cancel-btn')) {
            handleCancelOfEntityEdit(e, entityType);
        }

        if (e.target && e.target.classList.contains('image-btn')) {
            handleImageEditModal(e);
        }
    });
});

function handleEntityCreation(e, entityType) {
    const row = e.target.closest('tr');

    const newData = {};
    Array.from(row.cells).forEach((cell, index) => {
        if (index !== 0 && !cell.innerHTML.includes('button')) {
            const headerName = document.querySelectorAll('#data-section th')[index].getAttribute('data-header-name');
            const inputElement = cell.querySelector('input');
            if (inputElement) {
                newData[headerName] = inputElement.value;
            }

            const selectElement = cell.querySelector('select');
            if (selectElement) {
                newData[headerName] = selectElement.options[selectElement.selectedIndex].text;
            }
        }
    });

    switch (entityType) {
        case 'user':
            createUser(newData);
            break;
        case 'product':
            createProduct(newData);
            break;
        case 'author':
            createAuthor(newData);
            break;
        case 'category':
            createCategory(newData);
            break;
        default:
            console.error(`Unknown entityType: ${entityType}`);
            return;
    }
}

function handleAdminRightsChange(e) {
    const action = e.target.getAttribute('data-action');
    const isConfirmed = confirm(`Are you sure you want to ${action} Admin rights?`);

    if (isConfirmed) {
        const userId = e.target.getAttribute('data-id');

        const editButton = document.querySelector(`#edit-button[data-id="${userId}"]`);
        const userDataString = editButton.getAttribute('data-original-data');
        const user = JSON.parse(userDataString);
        let updatedRoles = [];

        if (action === 'revoke') {
            updatedRoles = user.roles.filter(role => role !== 'ADMIN');
        } else if (action === 'grant') {
            updatedRoles = [...user.roles, 'ADMIN'];
        }

        user.roles = updatedRoles;

        updateUser(userId, user);
    }
}

function handleUserStatusChange(e) {
    const btn = e.target;
    const userId = btn.getAttribute('data-id');
    const row = btn.closest('tr');
    let isUserEnabled;

    const currentData = fetchRowData(row, 'user');
    if (btn.textContent === 'Disable') {
        isUserEnabled = Boolean(false);
    } else if (btn.textContent === 'Enable') {
        isUserEnabled = Boolean(true);
    }

    const updatedData = {...currentData, enabled: isUserEnabled};

    updateUser(userId, updatedData)
        .then(() => btn.textContent = isUserEnabled ? 'Disable' : 'Enable')
        .catch(error => {
            console.error('Error updating user status:', error);
        });
}

function fetchRowData(row, entityType) {
    const attributes = ENTITY_CONFIG[entityType];
    const rowData = {};

    attributes.forEach((attribute, index) => {
        if (attribute !== 'id' && attribute !== 'action') {
            rowData[attribute] = row.cells[index].textContent;
        }
    });

    return rowData;
}

function handleEntityDeletion(e, entityType) {
    const entityId = e.target.getAttribute('data-id');

    const isConfirmed = confirm(`Are you sure you want to delete this ${entityType}?`);

    if (isConfirmed) {
        deleteEntity(entityType, entityId);
    }
}

function handleCancelOfEntityEdit(e, entityType) {
    const btn = e.target;
    const row = btn.closest('tr');
    const editButton = row.querySelector('#edit-button');

    populateEntitySectionOfAdminDashboard(entityType);

    editButton.textContent = 'Edit';

    btn.remove();
}

function handleImageEditModal(e) {
    const productId = e.target.getAttribute('data-id');
    const imageModal = document.querySelector('#imageModal');
    imageModal.setAttribute('data-product-id', productId);

    fetchProduct(productId)
        .then(product => {
            fetchImageForProduct(product)
                .then(blob => {
                    const imgElement = document.getElementById(`productImage`);
                    setSrcOfImgFromBlob(blob, imgElement);
                })
        });

    imageModal.style.display = "block";
}

function handleEntityEdit(btn, row) {
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

    btn.textContent = 'Confirm';
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = 'btn btn-secondary btn-sm ml-2 cancel-btn';
    btn.parentNode.appendChild(cancelButton);
}

function handleEntityEditConfirmation(btn, row, entityType) {
    const updatedData = {};
    Array.from(row.cells).forEach((cell, index) => {
        if (index !== 0 && !cell.innerHTML.includes('button')) {
            const headerName = document.querySelectorAll('#data-section th')[index].getAttribute('data-header-name');
            const inputElement = cell.querySelector('input');
            if (inputElement) {
                updatedData[headerName] = inputElement.value;
            }

            const selectElement = cell.querySelector('select');
            if (selectElement) {
                updatedData[headerName] = selectElement.options[selectElement.selectedIndex].text;
            }
        }
    });

    const entityId = btn.getAttribute('data-id');

    switch (entityType) {
        case 'user':
            updateUser(entityId, updatedData)
                .then(() => {
                    btn.textContent = 'Edit';
                    row.querySelector('.cancel-btn').remove();
                })
            break;
        case 'product':
            updateProduct(entityId, updatedData)
                .then(() => {
                    btn.textContent = 'Edit';
                    row.querySelector('.cancel-btn').remove();
                })
            break;
        case 'author':
            updateAuthor(entityId, updatedData)
                .then(() => {
                    btn.textContent = 'Edit';
                    row.querySelector('.cancel-btn').remove();
                })
            break;
        case 'category':
            updateCategory(entityId, updatedData)
                .then(() => {
                    btn.textContent = 'Edit';
                    row.querySelector('.cancel-btn').remove();
                })
            break;
        default:
            console.error(`Unknown entityType: ${entityType}`);
            return;
    }
}

document.querySelector('.close-modal').addEventListener('click', function() {
    closeImageModal();
});

function closeImageModal(){
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
    const imgElement = document.getElementById(`productImage`);
    imgElement.src = "";
}

document.getElementById('uploadButton').addEventListener('click', function() {
    const inputFile = document.getElementById('imageUpload');
    const file = inputFile.files[0];

    if (file) {
        uploadImageForProduct(file);
    }
});