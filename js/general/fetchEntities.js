function fetchProducts() {
    return makeRequest("http://localhost:8080/product", 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchProduct(productID) {
    return makeRequest(`http://localhost:8080/product/${productID}`, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchCategories() {
    return makeRequest("http://localhost:8080/category", 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchCategory(categoryID) {
    return makeRequest(`http://localhost:8080/category/${categoryID}`, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchAuthors() {
    return makeRequest("http://localhost:8080/bookAuthor", 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchAuthor(authorID) {
    return makeRequest(`http://localhost:8080/bookAuthor/${authorID}`, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchUsers() {
    return makeRequest("http://localhost:8080/admin/user", 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchUser(userID) {
    return makeRequest(`http://localhost:8080/user/${userID}`, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchImageForProduct(product) {
    makeRequest(`http://localhost:8080/image/${product.id}`, 'GET')
        .then(response => handleHTTPErrors(response))
        .then(response => response.blob())
        .then(blob => setSrcOfImgFromBlob(blob, `productImage-${product.id}`))
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

function setSrcOfImgFromBlob(blob, elementId){
    const productImage = document.getElementById(elementId);
    const blobUrl = URL.createObjectURL(blob);
    console.log(blobUrl);
    productImage.src = blobUrl;
}