function createProductRow(product) {
    return `
        <tr>
            <td>
                <a href="../html/booksinglepage.html?id=${product.id}">
                    <img src="" style="height: 200px; display: block; object-fit: contain; width: auto;" id="productImage-${product.id}">
                </a>
            </td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category.name}</td> <!-- Assuming category is an object with a name property -->
            <td>${product.author.firstName} ${product.author.lastName}</td> <!-- Assuming author is an object with firstName and lastName properties -->
        </tr>
    `;
}

