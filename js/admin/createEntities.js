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