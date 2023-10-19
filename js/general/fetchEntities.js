function fetchProducts() {
    return makeRequest(window.PRODUCT_ENDPOINT, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchProduct(productID) {
    return makeRequest(`${window.PRODUCT_ENDPOINT}/${productID}`, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchCategories() {
    return makeRequest(window.CATEGORY_ENDPOINT, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchCategory(categoryID) {
    return makeRequest(`${window.CATEGORY_ENDPOINT}/${categoryID}`, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchAuthors() {
    return makeRequest(window.AUTHOR_ENDPOINT, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchAuthor(authorID) {
    return makeRequest(`${window.AUTHOR_ENDPOINT}/${authorID}`, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchUsers() {
    return makeRequest(window.USER_ENDPOINT, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchUser(userID) {
    return makeRequest(`${window.USER_ENDPOINT}/${userID}`, 'GET')
        .then(handleHTTPErrors)
        .then(response => response.json())
}

function fetchImageForProduct(product) {
    return makeRequest(`${window.IMAGE_ENDPOINT}/${product.id}`, 'GET')
        .then(response => handleHTTPErrors(response))
        .then(response => response.blob())
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

function setSrcOfImgFromBlob(blob, imgElement){
    const blobUrl = URL.createObjectURL(blob);
    imgElement.src = blobUrl;
}