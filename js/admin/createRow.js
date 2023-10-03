function escapeJsonAttributes(jsonString) {
    return jsonString.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}

function getAdminRightsButton(user) {
    if (user.roles.includes('ADMIN')) {
        return `<button class="btn btn-danger btn-sm admin-rights-btn" data-id="${user.id}" data-action="revoke">Revoke</button>`;
    } else {
        return `<button class="btn btn-secondary btn-sm admin-rights-btn" data-id="${user.id}" data-action="grant">Grant</button>`;
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
            <td>X</td>
            <td>
                <button id="edit-button" class="btn btn-info btn-sm edit-btn" data-id="${user.id}" data-original-data='${escapedData}'>Edit</button>
                <button id="status-button" class="btn btn-warning btn-sm status-btn" data-id="${user.id}" enabled="${user.enabled}">${userStatus}</button>
                <button id="delete-button" class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">Delete</button>
            </td>
            <td>${adminRightsButton}</td>
        </tr>
    `;
}

function createUserInputRow() {
    return `
        <tr>
            <td>#</td>
            <td><input type="text" placeholder="First Name" /></td>
            <td><input type="text" placeholder="Last Name" /></td>
            <td><input type="text" placeholder="Email" /></td>
            <td><input type="text" placeholder="Password" /></td>
            <td><button class="btn btn-primary submit-btn">Submit</button></td>
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
            <td>${product.category.name}</td> <!-- Assuming category is an object with a name property -->
            <td>${product.author.firstName} ${product.author.lastName}</td> <!-- Assuming author is an object with firstName and lastName properties -->
            <td>
                <button id="edit-button" class="btn btn-info btn-sm edit-btn" data-id="${product.id}" data-original-data='${escapedData}'>Edit</button>
                <button id="delete-button" class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
                <button id="image-button" class="btn btn-secondary btn-sm image-btn" data-id="${product.id}">Bild</button>
            </td>
        </tr>
    `;
}

function createProductInputRow() {
    return `
        <tr>
            <td>#</td>
            <td><input type="text" placeholder="Name"></td>
            <td><input type="text" placeholder="Description"></td>
            <td><input type="number" placeholder="Price" step="0.01"></td>
            <td><input type="number" placeholder="Quantity"></td>
            <td>
                <select class="category-select">
                    <!-- options will be dynamically populated -->
                </select>
            </td>
            <td>
                <select class="author-select">
                    <!-- options will be dynamically populated -->
                </select>
            </td>
            <td><button class="btn btn-primary submit-btn">Submit</button></td>
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

function createCategoryInputRow() {
    return `
        <tr>
            <td>#</td>
            <td><input type="text" placeholder="Name"></td>
            <td><button class="btn btn-primary submit-btn">Submit</button></td>
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

function createAuthorInputRow() {
    return `
        <tr>
            <td>#</td>
            <td><input type="text" placeholder="First Name"></td>
            <td><input type="text" placeholder="Last Name"></td>
            <td><button class="btn btn-primary submit-btn">Submit</button></td>
        </tr>
    `;
}

function populateCategoryDropdown(identifier) {
    fetch(window.CATEGORY_ENDPOINT, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(categories => {
            const categoryDropdown = document.querySelector(identifier);
            categoryDropdown.innerHTML = categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
        });
}

function populateAuthorDropdown(identifier) {
    fetch(window.AUTHOR_ENDPOINT, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(authors => {
            const authorDropdown = document.querySelector(identifier);
            authorDropdown.innerHTML = authors.map(author => `<option value="${author.id}">${author.firstName} ${author.lastName}</option>`).join('');
        });
}
