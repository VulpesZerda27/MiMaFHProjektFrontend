function populateCategoryDropdown() {
    fetchCategories()
        .then(categories => {
            const $categoryDropdown = $("#category-dropdown");
            $categoryDropdown.html(`<li><a value="" class="dropdown-item" href="#">Alle Produkte</a></li>`);
            categories.forEach(cat => {
                $categoryDropdown.append(`<li><a value="${cat.id}" class="dropdown-item" href="#">${cat.name}</a></li>`);
            });
        });
}

function populateProducts(products) {
    document.querySelector('#filtered-products tbody').innerHTML = '';

    const productRows = products.map(createProductPageRow).join('');
    products.map(product => {
        fetchImageForProduct(product)
            .then(blob => {
                const imgElement = document.getElementById(`productImage-${product.id}`);
                setSrcOfImgFromBlob(blob, imgElement);
            })
    });
    document.querySelector('#filtered-products tbody').insertAdjacentHTML('beforeend', productRows);
}

function filterProductsByCategory(products, category) {
    return products.filter(product => product.category.name === category);
}

$(document).ready(function() {
    populateCategoryDropdown();
    fetchProducts()
        .then(products => populateProducts(products))
        .catch(error => console.error("Failed to populate products:", error));
});

$(".dropdown-menu").on("click", ".dropdown-item", function(event) {
    const category = $(this).text();
    if (category === 'Alle Produkte') {
        fetchProducts()
            .then(populateProducts)
            .catch(error => console.error("Failed to populate products:", error));
    } else {
        fetchProducts()
            .then(products => filterProductsByCategory(products, category))
            .then(populateProducts)
            .catch(error => console.error("Failed to filter products:", error));
    }
});

