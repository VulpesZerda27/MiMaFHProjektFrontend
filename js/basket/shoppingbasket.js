function fetchBasketItems() {
    const token = localStorage.getItem('accessToken');
    let sub;
    if (token) {
        const payload = getPayloadFromToken(token);
        sub = payload.sub;
    }
    makeRequest(`http://localhost:8080/basketItem/${sub}`, "GET")
        .then(handleHTTPErrors)
        .then(response => response.json())
        .then(populateBasket)
}

function populateBasket(basketItems) {
    document.querySelector('#basket-items tbody').innerHTML = '';

    const basketItemRows = basketItems.map(createBasketItemRow).join('');
    basketItems.map(basketItem => {
        fetchImageForProduct(basketItem.product)
            .then(blob => {
                const smallImgElement = document.getElementById(`productImageSmall-${basketItem.product.id}`);
                setSrcOfImgFromBlob(blob, smallImgElement);
                const largeImgElement = document.getElementById(`productImageLarge-${basketItem.product.id}`);
                setSrcOfImgFromBlob(blob, largeImgElement);
            })
    });
    document.querySelector('#basket-items tbody').insertAdjacentHTML('beforeend', basketItemRows);

    let totalPrice = 0;
    basketItems.forEach(basketItem => {
        totalPrice += basketItem.product.price * basketItem.quantity;
    })

    let totalPriceRow = createTotalPriceRow(totalPrice);
    document.querySelector('#basket-items tbody').insertAdjacentHTML('beforeend', totalPriceRow);
}

function handleBasketItemUpdate(e) {
    const row = e.target.closest('tr');
    const basketItemId = e.target.getAttribute('data-id');
    const quantityDropdown = row.querySelector('.quantity-select');
    const quantity = quantityDropdown.options[quantityDropdown.selectedIndex].value;

    const shoppingBasketItemDTO = {
        id: parseInt(basketItemId),
        quantity: parseInt(quantity)
    };

    return makeRequest(`http://localhost:8080/basketItem/${basketItemId}`, 'PUT', shoppingBasketItemDTO)
        .then(response => response.json())
        .catch(error => {
            console.error("There was an error:", error);
        });
}

function handleBasketItemDelete(e) {
    const basketItemId = e.target.getAttribute('data-id');

    return makeRequest(`http://localhost:8080/basketItem/${basketItemId}`, 'DELETE')
        .then(response => response.json())
        .catch(error => {
            console.error("There was an error:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchBasketItems();
    document.querySelector('#basket-items tbody').addEventListener('click', function (e) {
        if (e.target.classList.contains('update-btn')) {
            handleBasketItemUpdate(e)
                .then(fetchBasketItems)
                .then(alert("Successfully updated quantity!"));
        }

        if (e.target.classList.contains('delete-btn')) {
            if(confirm(`Are you sure you want to delete this product from your basket?`)) {
                handleBasketItemDelete(e)
                    .then(fetchBasketItems);
            }
        }
    });
});