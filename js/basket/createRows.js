function createBasketItemRow(basketItem) {
    return `
        <tr>
            <td>
                <a href="../html/booksinglepage.html?id=${basketItem.product.id}">
                    <img src="" style="height: 200px; display: block; object-fit: contain; width: auto;" id="productImage-${basketItem.product.id}">
                </a>
            </td>
            <td>${basketItem.product.name}</td>
            <td>${basketItem.product.price}€</td>
            <td>
                <input type="number" class="quantity-input" value="${basketItem.quantity}" min="1" />
            </td>
            <td>
                <button id="edit-button" class="btn btn-info btn-sm update-btn" data-id="${basketItem.id}">Update</button>
                <button id="delete-button" class="btn btn-danger btn-sm delete-btn" data-id="${basketItem.id}">Delete</button>
            </td>
        </tr>
    `;
}

function createTotalPriceRow(totalPrice){
    return `
        <tr>
            <td style="font-size: 1.5em; font-weight: bold;">Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td style="font-size: 1.5em; font-weight: bold;">${totalPrice.toFixed(2)}€</td>
        </tr>
        `;
}
