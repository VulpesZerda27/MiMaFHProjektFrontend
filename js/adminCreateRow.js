function createUserRow(user) {
    let userStatus;
    if (user.enabled) userStatus = "Disable";
    else userStatus = "Enable";

    return `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>
                <button id="edit-button" class="btn btn-info btn-sm edit-btn" data-id="${user.id}">Edit</button>
                <button id="status-button" class="btn btn-warning btn-sm status-btn" data-id="${user.id}" enabled="${user.enabled}">${userStatus}</button>
                <button id="delete-button" class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">Delete</button>
            </td>
        </tr>
    `;
}

function createProductRow(product) {
    return `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
            <td>${product.author}</td>
            <td>
                <button class="btn btn-info btn-sm edit-btn" data-id="${product.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
            </td>
        </tr>
    `;
}

function createCategoryRow(category) {
    return `
        <tr>
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>
                <button class="btn btn-info btn-sm edit-btn" data-id="${category.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${category.id}">Delete</button>
            </td>
        </tr>
    `;
}

function createAuthorRow(author) {
    return `
        <tr>
            <td>${author.id}</td>
            <td>${author.firstName}</td>
            <td>${author.lastName}</td>
            <td>
                <button class="btn btn-info btn-sm edit-btn" data-id="${author.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${author.id}">Delete</button>
            </td>
        </tr>
    `;
}