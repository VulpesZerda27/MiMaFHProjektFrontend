//Function to populate the "filtered-products" container with clickable links to detail pages
function populateProducts(products) {
    const filteredProductsContainer = document.querySelector("#product-table tbody");
    console.log(products);
    //Clear the container
    filteredProductsContainer.innerHTML = "";

    //Create a list to display the filtered products
    // Clear the current rows from tbody
    document.querySelector('#product-table tbody').innerHTML = '';

    const productRows = products.map(createProductRow).join('');
    products.map(fetchImageForProduct);
    document.querySelector('#product-table tbody').insertAdjacentHTML('beforeend', productRows);
}

function fetchImageForProduct(product) {
    // Start with the base headers (empty in this case, but could have more headers in the future)
    const headers = {};

    // Get the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // If there's an access token, add the Authorization header
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    fetch(`http://localhost:8080/product/image/${product.id}`, {
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
