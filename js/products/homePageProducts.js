//Function to populate the "filtered-products" container with clickable links to detail pages
function populateProducts(products) {
    const filteredProductsContainer = document.querySelector("#product-table tbody");
    console.log(products);
    //clear container
    filteredProductsContainer.innerHTML = "";

    //create list to display filtered products
    // clear current rows from tbody
    document.querySelector('#product-table tbody').innerHTML = '';

    const productRows = products.map(createProductRow).join('');
    products.map(fetchImageForProduct);
    document.querySelector('#product-table tbody').insertAdjacentHTML('beforeend', productRows);
}

function fetchImageForProduct(product) {
    const headers = {};

    // get access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // if access token, add authorization header
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    fetch(`http://localhost:8080/image/${product.id}`, {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const productImage = document.getElementById(`productImage-${product.id}`);
            const blobUrl = URL.createObjectURL(blob);
            productImage.src = blobUrl;
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchProducts().then(products => {
        populateProducts(products);
    }).catch(error => {
        console.error("Failed to populate products:", error);
    })
});
