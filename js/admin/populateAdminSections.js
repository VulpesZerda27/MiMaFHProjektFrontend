function populateUserSectionOfAdminDashboard() {
    populateUserSectionHeaders();
    fetchUsers()
        .then(data => {
            document.querySelector('#data-section tbody').innerHTML = '';
            const createUserInputRowHTML = createUserInputRow();
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', createUserInputRowHTML);
            const userRows = data.map(createUserRow).join('');
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', userRows);
        })
        .catch(error => console.error('Error fetching users:', error));
}

function populateUserSectionHeaders(){
    document.querySelector('#data-section tr').innerHTML = createUserHeaders();
}

function populateProductSectionOfAdminDashboard() {
    populateProductSectionHeaders();
    fetchProducts()
        .then(data => {
            document.querySelector('#data-section tbody').innerHTML = '';
            const createProductInputRowHTML = createProductInputRow();
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', createProductInputRowHTML);
            const productRows = data.map(createProductRow).join('');
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', productRows);

            populateCategoryDropdown();
            populateAuthorDropdown();
        })
        .catch(error => console.error('Error fetching products:', error));
}

function populateProductSectionHeaders(){
    document.querySelector('#data-section tr').innerHTML = createProductHeaders();
}

function populateCategorySectionOfAdminDashboard() {
    populateCategorySectionHeaders();
    fetchCategories()
        .then(data => {
            document.querySelector('#data-section tbody').innerHTML = '';
            const createCategoryInputRowHTML = createCategoryInputRow();
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', createCategoryInputRowHTML);
            const categoryRows = data.map(createCategoryRow).join('');
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', categoryRows);
        })
        .catch(error => console.error('Error fetching categories:', error));
}

function populateCategorySectionHeaders(){
    document.querySelector('#data-section tr').innerHTML = createCategoryHeaders();
}

function populateAuthorSectionOfAdminDashboard() {
    populateAuthorSectionHeaders();
    fetchAuthors()
        .then(data => {
            document.querySelector('#data-section tbody').innerHTML = '';
            const createAuthorInputRowHTML = createAuthorInputRow();
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', createAuthorInputRowHTML);
            const authorRows = data.map(createAuthorRow).join('');
            document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', authorRows);
        })
        .catch(error => console.error('Error fetching authors:', error));
}

function populateAuthorSectionHeaders() {
    document.querySelector('#data-section tr').innerHTML = createAuthorHeaders();
}

function populateCategoryDropdown() {
    fetchCategories()
        .then(categories => {
            const categoryDropdown = document.querySelector('.category-select');
            categoryDropdown.innerHTML = categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
        });
}

function populateAuthorDropdown() {
    fetchAuthors()
        .then(authors => {
            const authorDropdown = document.querySelector('.author-select');
            authorDropdown.innerHTML = authors.map(author => `<option value="${author.id}">${author.firstName} ${author.lastName}</option>`).join('');
        });
}