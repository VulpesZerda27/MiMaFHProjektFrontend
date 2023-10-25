function populateProductDetails(product) {
    const productRow = createProductDetailRow(product);
    fetchImageForProduct(product)
        .then(blob => {
            const smallImgElement = document.getElementById(`productImageSmall-${product.id}`);
            setSrcOfImgFromBlob(blob, smallImgElement);
            const largeImgElement = document.getElementById(`productImageLarge-${product.id}`);
            setSrcOfImgFromBlob(blob, largeImgElement);
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
            <!-- Product Name for All Screens -->
            <td class="d-none d-md-table-cell fw-bold" style="font-size: 1.2em;">${product.name}</td>
            
            <!-- Image for Large Screens -->
            <td class="d-none d-md-table-cell" style="vertical-align: top;">
                <a href="../html/booksinglepage.html?id=${product.id}">
                    <img src="" class="img-fluid rounded" style="height: 350px; object-fit: contain; " id="productImageLarge-${product.id}" alt="">
                </a>
            </td>

            <!-- Product Price for Large Screens -->
            <td class="d-none d-md-table-cell fw-bold" style="font-size: 1.2em;">${product.price}€</td>

            <!-- Category and Author for Large Screens -->
            <td class="d-none d-md-table-cell fw-bold" style="font-size: 1.2em;">${product.category.name}</td>
            <td class="d-none d-md-table-cell fw-bold" style="font-size: 1.2em;">${product.author.firstName} ${product.author.lastName}</td>
            <td class="d-none d-md-table-cell" style="font-size: 1.2em; width:500px; word-wrap:break-word;">${product.description}</td>
            
            <!-- Layout for Small Screens -->
            <td class="d-md-none">
                <!-- Name and Price Side by Side -->
                <div class="row">
                    <div class="col-6 text-start fw-bold" style="font-size: 1.2em;" >${product.name}</div>
                    <div class="col-6 text-end fw-bold" style="font-size: 1.2em;" >${product.price}€</div>
                </div>
                
                <!-- Image Below Name and Price -->
                <div class="row mt-2">
                    <div class="col px-4">
                        <a href="../html/booksinglepage.html?id=${product.id}">
                            <img src="" class="img-fluid mb-2 w-100 rounded" style="object-fit: contain;" id="productImageSmall-${product.id}">
                        </a>
                    </div>
                </div>
               
                <div class="row">
                    <div class="fw-bold" style="font-size: 1.2em;" >Kategorie: ${product.category.name}</div>
                </div>
                
                <div class="row">
                    <div class="fw-bold" style="font-size: 1.2em;" >Autor: ${product.author.firstName} ${product.author.lastName}</div>
                </div>
                
                <div class="" >${product.description}</div>
                
                <!-- Add to Basket Button Below the Image -->
                <div class="row mt-2">
                    <div class="col px-2">
                        <button class="btn btn-primary add-to-basket-btn w-100 py-3" style="display: ${displayType};" data-id="${product.id}">Add to Basket</button>
                    </div>
                </div>
            </td>

            <!-- Add to Basket Button for Large Screens -->
            <td class="d-none d-md-table-cell">
                <button class="btn btn-primary add-to-basket-btn" style="display: ${displayType};" data-id="${product.id}">Add to Basket</button>
            </td>
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