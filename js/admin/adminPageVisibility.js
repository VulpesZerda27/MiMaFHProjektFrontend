function checkAdminVisibility() {
    const adminNavItem = document.querySelector(".nav-item a[href='admin.html']").parentNode;
    const token = localStorage.getItem('accessToken');

    if (token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.authorities && decoded.authorities.includes('ADMIN')) {
                adminNavItem.style.display = 'block';
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
}

document.addEventListener("DOMContentLoaded", checkAdminVisibility);