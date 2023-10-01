function createUserHeaders() {
    return `
                <th id="idHeader" data-id="user">ID</th>
                <th data-header-name="firstName">First Name</th>
                <th data-header-name="lastName">Last Name</th>
                <th data-header-name="email">Email</th>
                <th>Actions</th>
    `;
}

function createProductHeaders() {
    return `
                <th id="idHeader" data-id="product">ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Author</th>
                <th>Actions</th>
    `;
}

function createCategoryHeaders() {
    return `
                <th id="idHeader" data-id="category">ID</th>
                <th>Name</th>
                <th>Actions</th>
    `;
}

function createAuthorHeaders() {
    return `
                <th id="idHeader" data-id="author">ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
    `;
}