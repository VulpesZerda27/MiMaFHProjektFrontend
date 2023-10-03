function createProductRow(product) {
    return `
        <tr>
            <td>
                <div>
                      <img src="" href="../html/booksinglepage.html?id=${product.id}" id="productImage-${product.id}">
                </div>
            </td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.category.name}</td> <!-- Assuming category is an object with a name property -->
            <td>${product.author.firstName} ${product.author.lastName}</td> <!-- Assuming author is an object with firstName and lastName properties -->
        </tr>
    `;
}

