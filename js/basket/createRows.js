function createBasketItemRow(basketItem) {
    return `
    <tr class="d-none d-lg-table-row">
        <td>
            <a href="../html/booksinglepage.html?id=${basketItem.product.id}">
                <img src="" style="height: 200px; display: block; object-fit: contain; width: auto;" id="productImageLarge-${basketItem.product.id}">
            </a>
        </td>
        <td class="col-6 fw-bold" style="font-size: 1.2em;">${basketItem.product.name}</td>
        <td class="col-6 fw-bold" style="font-size: 1.2em;">${basketItem.product.price}€</td>
        <td>
            <select class="quantity-select" style="width: 100%; height: 50px; font-size: 1rem; border: 1px solid #ced4da; border-radius: .25rem; padding: .375rem .75rem;" value="${basketItem.quantity}">
                <option value="1" ${basketItem.quantity == 1 ? 'selected' : ''}>1</option>
                <option value="2" ${basketItem.quantity == 2 ? 'selected' : ''}>2</option>
                <option value="3" ${basketItem.quantity == 3 ? 'selected' : ''}>3</option>
                <option value="4" ${basketItem.quantity == 4 ? 'selected' : ''}>4</option>
                <option value="5" ${basketItem.quantity == 5 ? 'selected' : ''}>5</option>
                <option value="6" ${basketItem.quantity == 6 ? 'selected' : ''}>6</option>
                <option value="7" ${basketItem.quantity == 7 ? 'selected' : ''}>7</option>
                <option value="8" ${basketItem.quantity == 8 ? 'selected' : ''}>8</option>
                <option value="9" ${basketItem.quantity == 9 ? 'selected' : ''}>9</option>
                <option value="10" ${basketItem.quantity == 10 ? 'selected' : ''}>10</option>
            </select>
        </td>
        <td>
            <button id="edit-button" class="btn btn-info btn-lg update-btn" data-id="${basketItem.id}">Update</button>
            <button id="delete-button" class="btn btn-danger btn-lg delete-btn" data-id="${basketItem.id}">Delete</button>
        </td>
    </tr>
    <tr class="d-lg-none">
        <td colspan="5">
            <div class="row">
                <div class="col-6 fw-bold" style="font-size: 1.2em;">${basketItem.product.name}</div>
                <div class="col-6 text-end fw-bold" style="font-size: 1.2em;">${basketItem.product.price}€</div>
            </div>
            <div class="row mt-2">
                <div class="col px-2">
                    <a href="../html/booksinglepage.html?id=${basketItem.product.id}">
                        <img src="" style="width: 100%; object-fit: cover; border-radius: 15px;" id="productImageSmall-${basketItem.product.id}">
                    </a>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-6">
                        <select class="quantity-select" style="width: 100%; height: 50px; font-size: 1rem; border: 1px solid #ced4da; border-radius: .25rem; padding: .375rem .75rem;" value="${basketItem.quantity}">
                            <option value="1" ${basketItem.quantity == 1 ? 'selected' : ''}>1</option>
                            <option value="2" ${basketItem.quantity == 2 ? 'selected' : ''}>2</option>
                            <option value="3" ${basketItem.quantity == 3 ? 'selected' : ''}>3</option>
                            <option value="4" ${basketItem.quantity == 4 ? 'selected' : ''}>4</option>
                            <option value="5" ${basketItem.quantity == 5 ? 'selected' : ''}>5</option>
                            <option value="6" ${basketItem.quantity == 6 ? 'selected' : ''}>6</option>
                            <option value="7" ${basketItem.quantity == 7 ? 'selected' : ''}>7</option>
                            <option value="8" ${basketItem.quantity == 8 ? 'selected' : ''}>8</option>
                            <option value="9" ${basketItem.quantity == 9 ? 'selected' : ''}>9</option>
                            <option value="10" ${basketItem.quantity == 10 ? 'selected' : ''}>10</option>
                        </select>
                </div>
                <div class="col-6">
                    <button id="edit-button" class="btn btn-info w-100 mb-2 update-btn" data-id="${basketItem.id}">Update</button>
                    <button id="delete-button" class="btn btn-danger w-100 delete-btn" data-id="${basketItem.id}">Delete</button>
                </div>
            </div>
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
