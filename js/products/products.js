//filter products by category
async function filterProductsByCategory(category) {
    try {
        const products = await fetchProducts();
        return products.filter(product => product.category.name === category);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return []; // Return an empty array or handle the error as you see fit.
    }
}

//populate "filtered-products" container with clickable links to detail pages
 function populateProducts(products) {
     const filteredProductsContainer = document.querySelector("#filtered-products tbody");
    console.log(products);
      //Clear the container
     filteredProductsContainer.innerHTML = "";

      //create list to display the filtered products
     // clear current rows from tbody
     document.querySelector('#filtered-products tbody').innerHTML = '';

     const productRows = products.map(createProductRow).join('');
     products.map(fetchImageForProduct);
     document.querySelector('#filtered-products tbody').insertAdjacentHTML('beforeend', productRows);
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


//event listener for category selection
 document.querySelector(".dropdown-menu").addEventListener("click", function(event) {
     if (event.target && event.target.matches(".dropdown-item")) {
         const selectedCategory = event.target.textContent;
         console.log(selectedCategory);
         filterProductsByCategory(selectedCategory).then(filteredProducts => {
             populateProducts(filteredProducts);
         }).catch(error => {
             console.error("Failed to filter products:", error);
         });
     }
 });

function populateCategoryDropdown() {
    const headers = {
        'Content-Type': 'application/json'
    };

    // get access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // if access token, add authorization header
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    fetch("http://localhost:8080/category", {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(categories => {
            console.log(categories);
            const categoryDropdown = document.getElementById("categoryDropdownList");
            categoryDropdown.innerHTML = categories.map(cat => `<li><a value="${cat.id}" class="dropdown-item" href="#">${cat.name}</a></li>`).join('');
        });
}


document.addEventListener("DOMContentLoaded", function() {
    populateCategoryDropdown();
    fetchProducts().then(products => {
        populateProducts(products);
    }).catch(error => {
        console.error("Failed to populate products:", error);
    })
});
