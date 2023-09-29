document.addEventListener("DOMContentLoaded", function() {
    const adminNavItem = document.querySelector(".nav-item a[href='admin.html']").parentNode;

    // Check if token exists in local storage
    const token = localStorage.getItem('accessToken');

    if (token) {
        try {
            // Decode the token
            const decoded = jwt_decode(token);

            // Check role and show or hide the Admin link accordingly
            if (decoded.role && decoded.role === 'ADMIN') {
                adminNavItem.style.display = 'block'; // or whatever default display style you prefer
            } else {
                adminNavItem.style.display = 'none';
            }
        } catch (error) {
            console.error("Error decoding token", error);
            adminNavItem.style.display = 'none';
        }
    } else {
        adminNavItem.style.display = 'none';
    }
});
