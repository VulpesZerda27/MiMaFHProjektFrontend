function populateProduct(product) {
    const productRow = createProductRow(product);
    fetchImageForProduct(product);
    document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', productRow);
}

function createProductRow(product) {
    return `
        <tr>
            <td>
                <img src="" style="height: 200px; display: block; object-fit: contain; width: auto;" id="productImage-${product.id}">
            </td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.category.name}</td> <!-- Assuming category is an object with a name property -->
            <td>${product.author.firstName} ${product.author.lastName}</td> <!-- Assuming author is an object with firstName and lastName properties -->
        </tr>
    `;
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


async function fetchProduct(productId) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        // Get the access token from localStorage
        const accessToken = localStorage.getItem("accessToken");

        // If there's an access token, add the Authorization header
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(`http://localhost:8080/product/${productId}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Product:", data);
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;  // Propagate the error to be handled by the caller.
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get("id");

    fetchProduct(id).then(product => {
        populateProduct(product);
    }).catch(error => {
        console.error("Failed to populate products:", error);
    })
});