const products = [
    { id: 1, name: "Achtsam Morden", category: "Krimis" },
    { id: 2, name: "Das Kind in mir will achtsam morden", category: "Krimis" },
    { id: 3, name: "Erzählende Affen", category: "Sachbücher" },
    { id: 4, name: "Kein Stress Kochbuch", category: "Sachbücher" },
    { id: 5, name: "Max und Moritz", category: "Kinderbücher" },
    { id: 6, name: "Struwwelpeter", category: "Kinderbücher" },
];

// filter products by category
function filterProductsByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    return filteredProducts;
}


// Function to populate the "filtered-products" container with clickable links to detail pages
function populateFilteredProducts(products) {
    const filteredProductsContainer = document.getElementById("filtered-products");

    // Clear the container
    filteredProductsContainer.innerHTML = "";

    // Create a list to display the filtered products
    const productList = document.createElement("ul");
    productList.className = "list-group";

    products.forEach(product => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";

        // Create a clickable link to the detail page for each product
        const productLink = document.createElement("a");
        productLink.href = `../html/booksinglepage.html?id=${product.id}`;
        productLink.textContent = product.name;
        listItem.appendChild(productLink);

        productList.appendChild(listItem);
    });

    filteredProductsContainer.appendChild(productList);
}


// Event listener for category selection
document.querySelector(".dropdown-menu").addEventListener("click", function(event) {
    if (event.target && event.target.matches(".dropdown-item")) {
        const selectedCategory = event.target.textContent;
        const filteredProducts = filterProductsByCategory(selectedCategory);
        populateFilteredProducts(filteredProducts);
    }
});