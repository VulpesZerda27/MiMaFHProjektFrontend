function populateProductDetails(product) {
    const productRow = createProductDetailRow(product);
    fetchImageForProduct(product)
        .then(blob => {
            const imgElement = document.getElementById(`productImage-${product.id}`);
            setSrcOfImgFromBlob(blob, imgElement);
        })
    document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', productRow);

    const addToBasketButtons = document.querySelectorAll('.add-to-basket-btn');

    addToBasketButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            handleAddToBasket(e);
        });
    });
}

function createProductDetailRow(product) {
    const token = localStorage.getItem('accessToken');
    let displayType = 'none';
    if (token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.authorities && decoded.authorities.includes('USER')) {
                displayType = 'block';
            } else {
                displayType = 'none';
            }
        } catch (error) {
            console.error("Error decoding token", error);
            displayType = 'none';
        }
    }
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
            <td><button class="btn btn-primary add-to-basket-btn" style="display: ${displayType};" data-id="${product.id}">Add to Basket</button></td>
        </tr>
    `;
}

$(document).ready(function() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get("id");

    fetchProduct(id)
        .then(product => populateProductDetails(product))
        .catch(error => console.error("Failed to populate product:", error))
});