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

            // Clear the current rows from tbody
            document.querySelector('#data-section tbody').innerHTML = '';

            // Now add the create input row
            const createUserInputRowHTML = createUserInputRow();
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', createUserInputRowHTML);

            const userRows = data.map(createUserRow).join('');
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', userRows);
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

            // Clear the current rows from tbody
            document.querySelector('#data-section tbody').innerHTML = '';

            const createProductInputRowHTML = createProductInputRow();
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', createProductInputRowHTML);

            const productRows = data.map(createProductRow).join('');
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', productRows);

            populateCategoryDropdown(`.category-select`);
            populateAuthorDropdown('.author-select');
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

            // Clear the current rows from tbody
            document.querySelector('#data-section tbody').innerHTML = '';

            const createCategoryInputRowHTML = createCategoryInputRow();
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', createCategoryInputRowHTML);

            const categoryRows = data.map(createCategoryRow).join('');
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', categoryRows);
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

            // Clear the current rows from tbody
            document.querySelector('#data-section tbody').innerHTML = '';

            const createAuthorInputRowHTML = createAuthorInputRow();
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', createAuthorInputRowHTML);

            const authorRows = data.map(createAuthorRow).join('');
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', authorRows);
        })
        .catch(error => {
            console.error('Error fetching authors:', error);
        });
}