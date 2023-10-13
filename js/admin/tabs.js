const tabNavElementIds = ['#user-tab', '#product-tab', '#category-tab', '#author-tab'];

$("#user-tab").on('click', function (e) {
    tabNavElementIds.forEach(id => $(id).removeClass('active'))
    $(e.target).addClass('active');
    populateUserSectionOfAdminDashboard();
})

$("#product-tab").on('click', function (e) {
    tabNavElementIds.forEach(id => $(id).removeClass('active'))
    $(e.target).addClass('active');
    populateProductSectionOfAdminDashboard();
})

$("#category-tab").on('click', function (e) {
    tabNavElementIds.forEach(id => $(id).removeClass('active'))
    $(e.target).addClass('active');
    populateCategorySectionOfAdminDashboard();
})

$("#author-tab").on('click', function (e) {
    tabNavElementIds.forEach(id => $(id).removeClass('active'))
    $(e.target).addClass('active');
    populateAuthorSectionOfAdminDashboard();
})

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('user-tab').click();
});


