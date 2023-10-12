function populateProductDetails(product) {
    const productRow = createProductDetailRow(product);
    fetchImageForProduct(product)
        .then(blob => {
            const imgElement = document.getElementById(`productImage-${product.id}`);
            setSrcOfImgFromBlob(blob, imgElement);
        })
    document.querySelector('#data-section tbody').insertAdjacentHTML('beforeend', productRow);
}

function createProductDetailRow(product) {
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

$(document).ready(function() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get("id");

    fetchProduct(id)
        .then(product => populateProductDetails(product))
        .catch(error => console.error("Failed to populate product:", error))
});