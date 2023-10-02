async function fetchProduct() {
    try {
        const response = await fetch("http://localhost:8080/product", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Products:", data);
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;  // Propagate the error to be handled by the caller.
    }
}

function populateCategoryDropdown() {
    fetch("http://localhost:8080/category", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(categories => {
            console.log(categories);
            const categoryDropdown = document.getElementById("categoryDropdownList");
            categoryDropdown.innerHTML = categories.map(cat => `<li><a value="${cat.id}" class="dropdown-item" href="#">${cat.name}</a></li>`).join('');
        });
}