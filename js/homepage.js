function populateProducts(products) {
    const productRows = products.map(createProductPageRow).join('');
    products.map(product => {
        fetchImageForProduct(product)
            .then(blob => {
                const smallImgElement = document.getElementById(`productImageSmall-${product.id}`);
                setSrcOfImgFromBlob(blob, smallImgElement);
                const largeImgElement = document.getElementById(`productImageLarge-${product.id}`);
                setSrcOfImgFromBlob(blob, largeImgElement);
            })
    });
    document.querySelector('#product-table tbody').insertAdjacentHTML('beforeend', productRows);

    const addToBasketButtons = document.querySelectorAll('.add-to-basket-btn');

    addToBasketButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            handleAddToBasket(e);
        });
    });
}

$(document).ready(function() {
    fetchProducts()
        .then(products => populateProducts(products))
        .catch(error => console.error("Failed to populate products:", error))
});
