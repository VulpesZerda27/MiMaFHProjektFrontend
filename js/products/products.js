//filter products by category
async function filterProductsByCategory(category) {
    try {
        const products = await fetchProduct();
        return products.filter(product => product.category.name === category);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return []; // Return an empty array or handle the error as you see fit.
    }
}

  //Function to populate the "filtered-products" container with clickable links to detail pages
 function populateFilteredProducts(products) {
     const filteredProductsContainer = document.querySelector("#filtered-products tbody");
    console.log(products);
      //Clear the container
     filteredProductsContainer.innerHTML = "";

      //Create a list to display the filtered products
     // Clear the current rows from tbody
     document.querySelector('#filtered-products tbody').innerHTML = '';

     const productRows = products.map(createProductRow).join('');
     products.map(fetchImageForProduct);
     document.querySelector('#filtered-products tbody').insertAdjacentHTML('beforeend', productRows);
 }

function fetchImageForProduct(product) {
    fetch(`http://localhost:8080/product/image/${product.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        }
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


  //Event listener for category selection
 document.querySelector(".dropdown-menu").addEventListener("click", function(event) {
     if (event.target && event.target.matches(".dropdown-item")) {
         const selectedCategory = event.target.textContent;
         console.log(selectedCategory);
         filterProductsByCategory(selectedCategory).then(filteredProducts => {
             populateFilteredProducts(filteredProducts);
         }).catch(error => {
             console.error("Failed to filter products:", error);
         });
     }
 });

document.addEventListener("DOMContentLoaded", populateCategoryDropdown);