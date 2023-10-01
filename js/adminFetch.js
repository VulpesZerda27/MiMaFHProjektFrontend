function fetchUser() {
    fetch(window.USER_ENDPOINT, {
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
            document.querySelector('#data-section tbody').innerHTML = userRows;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

function fetchProduct() {
    fetch(window.PRODUCT_ENDPOINT, {
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
            console.log("Fetched Products:", data);  // Log the data for inspection

            const productRows = data.map(createProductRow).join('');
            document.querySelector('#data-section tbody').innerHTML = productRows;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function fetchCategory() {
    fetch(window.CATEGORY_ENDPOINT, {
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
            console.log("Fetched Categories:", data);  // Log the data for inspection

            const categoryRows = data.map(createCategoryRow).join('');
            document.querySelector('#data-section tbody').innerHTML = categoryRows;
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

function fetchAuthor() {
    fetch(window.AUTHOR_ENDPOINT, {
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
            console.log("Fetched Authors:", data);  // Log the data for inspection

            const authorRows = data.map(createAuthorRow).join('');
            document.querySelector('#data-section tbody').innerHTML = authorRows;
        })
        .catch(error => {
            console.error('Error fetching authors:', error);
        });
}