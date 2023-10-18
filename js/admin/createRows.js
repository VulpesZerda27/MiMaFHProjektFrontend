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
            <td>${product.category.name}</td>
            <td>${product.author.firstName} ${product.author.lastName}</td>
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

function createProductPageRow(product) {
    const token = localStorage.getItem('accessToken');
    let displayType = 'none';
    if (token) {
        try {
            const decoded = jwt_decode(token);
            console.log(decoded);
            if (decoded.authorities && decoded.authorities.includes('USER')) {
                displayType = 'block';
            } else {
                displayType = 'none';
            }
        } catch (error) {
            console.error("Error decoding token", error);
            displayType = 'none';
        }
    }
    return `
        <tr>
            <td>
                <a href="../html/booksinglepage.html?id=${product.id}">
                    <img src="" style="height: 200px; display: block; object-fit: contain; width: auto;" id="productImage-${product.id}">
                </a>
            </td>
            <td>${product.name}</td>
            <td>${product.price}€</td>
            <td>${product.category.name}</td>
            <td>${product.author.firstName} ${product.author.lastName}</td>
            <td><button class="btn btn-primary add-to-basket-btn" style="display: ${displayType};" data-id="${product.id}">Add to Basket</button></td>
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
