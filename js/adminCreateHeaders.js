function createUserHeaders() {
    return `
                <th id="idHeader" entity-type="user">ID</th>
                <th data-header-name="firstName">First Name</th>
                <th data-header-name="lastName">Last Name</th>
                <th data-header-name="email">Email</th>
                <th>Actions</th>
                <th>Admin rights</th>
    `;
}

function createProductHeaders() {
    return `
                <th id="idHeader" data-id="product">ID</th>
                <th data-header-name="name">Name</th>
                <th data-header-name="description">Description</th>
                <th data-header-name="price">Price</th>
                <th data-header-name="quantity">Quantity</th>
                <th data-header-name="category">Category</th>
                <th data-header-name="author">Author</th>
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