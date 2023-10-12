function createUser(data) {
    makeRequest(window.BACKEND_URL + "/user", "POST", data)
        .then(userData => {
            console.log('User created successfully:', userData);
            // Refresh the data or update the UI as necessary
            populateUserSectionOfAdminDashboard();
        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
}
function createProduct(data) {
    makeRequest(window.PRODUCT_ENDPOINT, "POST", data)
        .then(productData => {
            console.log('Product created successfully:', productData);
            populateProductSectionOfAdminDashboard();
        })
        .catch(error => {
            console.error('Error creating product:', error);
        });
}
function createCategory(data) {
    makeRequest(window.CATEGORY_ENDPOINT, "POST", data)
        .then(categoryData => {
            console.log('Category created successfully:', categoryData);
            populateCategorySectionOfAdminDashboard();
        })
        .catch(error => {
            console.error('Error creating category:', error);
        });
}
function createAuthor(data) {
    makeRequest(window.AUTHOR_ENDPOINT, "POST", data)
        .then(authorData => {
            console.log('Author created successfully:', authorData);
            populateAuthorSectionOfAdminDashboard();
        })
        .catch(error => {
            console.error('Error creating author:', error);
        });
}

function updateUser(id, data) {
    return makeRequest(`${window.BACKEND_URL}/admin/user/${id}`, "PUT", data)
        .then(userData => {
            console.log('User updated successfully:', userData);
            populateUserSectionOfAdminDashboard();
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
}

function updateProduct(id, data) {
    return makeRequest(`${window.PRODUCT_ENDPOINT}/${id}`, "PUT", data)
        .then(productData => {
            console.log('Product updated successfully:', productData);
            populateProductSectionOfAdminDashboard();
        })
        .catch(error => {
            console.error('Error updating product:', error);
        });
}

function updateCategory(id, data) {
    return makeRequest(`${window.CATEGORY_ENDPOINT}/${id}`, "PUT", data)
        .then(categoryData => {
            console.log('Category updated successfully:', categoryData);
            populateCategorySectionOfAdminDashboard();
        })
        .catch(error => {
            console.error('Error updating category:', error);
        });
}

function updateAuthor(id, data) {
    return makeRequest(`${window.AUTHOR_ENDPOINT}/${id}`, "PUT", data)
        .then(authorData => {
            console.log('Author updated successfully:', authorData);
            populateAuthorSectionOfAdminDashboard();
        })
        .catch(error => {
            console.error('Error updating author:', error);
        });
}

function deleteEntity(entityType, entityId) {
    makeRequest(`${window[entityType.toUpperCase() + '_ENDPOINT']}/${entityId}`, 'DELETE')
        .then(data => {
            populateEntitySectionOfAdminDashboard(entityType);
        });
}

function uploadImageForProduct(file) {
    let productId = document.getElementById('imageModal').getAttribute('data-product-id');
    const formData = new FormData();
    formData.append('productImage', file);

    fetch(`${window.BACKEND_URL}/image/${productId}`, {
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
