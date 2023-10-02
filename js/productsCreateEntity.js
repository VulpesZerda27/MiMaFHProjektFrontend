function createProduct(data) {
    fetch(window.PRODUCT_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(productData => {
            console.log('Product created successfully:', productData);
            fetchProduct();
        })
        .catch(error => {
            console.error('Error creating product:', error);
        });
}


function createCategory(data) {
    fetch(window.CATEGORY_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(categoryData => {
            console.log('Category created successfully:', categoryData);
            fetchCategory();
        })
        .catch(error => {
            console.error('Error creating category:', error);
        });
}

function createAuthor(data) {
    fetch(window.AUTHOR_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(authorData => {
            console.log('Author created successfully:', authorData);
            fetchAuthor();
        })
        .catch(error => {
            console.error('Error creating author:', error);
        });
}