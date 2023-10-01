function escapeJsonAttributes(jsonString) {
    return jsonString.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}

function getAdminRightsButton(user) {
    if (user.roles.includes('ADMIN')) {
        return `<button class="btn btn-danger btn-sm admin-rights-btn" data-id="${user.id}" data-action="revoke">Revoke</button>`;
    } else {
        return `<button class="btn btn-success btn-sm admin-rights-btn" data-id="${user.id}" data-action="grant">Grant</button>`;
    }
}

function createUserRow(user) {
    let userStatus;
    if (user.enabled) userStatus = "Disable";
    else userStatus = "Enable";

    const escapedData = escapeJsonAttributes(JSON.stringify(user));
    const adminRightsButton = getAdminRightsButton(user);
    return `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>
                <button id="edit-button" class="btn btn-info btn-sm edit-btn" data-id="${user.id}" data-original-data='${escapedData}'>Edit</button>
                <button id="status-button" class="btn btn-warning btn-sm status-btn" data-id="${user.id}" enabled="${user.enabled}">${userStatus}</button>
                <button id="delete-button" class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">Delete</button>
            </td>
            <td>${adminRightsButton}</td>
        </tr>
    `;
}

function createProductRow(product) {
    const escapedData = escapeJsonAttributes(JSON.stringify(product));
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
                <button id="edit-button" class="btn btn-info btn-sm edit-btn" data-id="${product.id}" data-original-data='${escapedData}'>Edit</button>
                <button id="delete-button" class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
            </td>
        </tr>
    `;
}

function createCategoryRow(category) {
    const escapedData = escapeJsonAttributes(JSON.stringify(category));
    return `
        <tr>
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>
                <button id="edit-button" class="btn btn-info btn-sm edit-btn" data-id="${category.id}" data-original-data='${escapedData}'>Edit</button>
                <button id="delete-button" class="btn btn-danger btn-sm delete-btn" data-id="${category.id}">Delete</button>
            </td>
        </tr>
    `;
}

function createAuthorRow(author) {
    const escapedData = escapeJsonAttributes(JSON.stringify(author));
    return `
        <tr>
            <td>${author.id}</td>
            <td>${author.firstName}</td>
            <td>${author.lastName}</td>
            <td>
                <button id="edit-button" class="btn btn-info btn-sm edit-btn" data-id="${author.id}" data-original-data='${escapedData}'>Edit</button>
                <button id="delete-button" class="btn btn-danger btn-sm delete-btn" data-id="${author.id}">Delete</button>
            </td>
        </tr>
    `;
}