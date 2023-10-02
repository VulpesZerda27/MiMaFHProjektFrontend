function createProductRow(product) {
    const escapedData = escapeJsonAttributes(JSON.stringify(product));
    return `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.category.name}</td> <!-- Assuming category is an object with a name property -->
            <td>${product.author.firstName} ${product.author.lastName}</td> <!-- Assuming author is an object with firstName and lastName properties -->
        </tr>
    `;
}

