function populateProducts(products) {
    const productRows = products.map(createProductPageRow).join('');
    products.map(product => {
        fetchImageForProduct(product)
            .then(blob => {
                const imgElement = document.getElementById(`productImage-${product.id}`);
                setSrcOfImgFromBlob(blob, imgElement);
            })
    });
    document.querySelector('#product-table tbody').insertAdjacentHTML('beforeend', productRows);
}

$(document).ready(function() {
    fetchProducts()
        .then(products => populateProducts(products))
        .catch(error => console.error("Failed to populate products:", error))
});
