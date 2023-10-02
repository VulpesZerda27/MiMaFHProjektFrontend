document.querySelector('.nav-tabs').addEventListener('click', function(e) {
    // Check if the clicked element is an anchor tag with a nav-link class
    if (e.target.tagName === 'A' && e.target.classList.contains('nav-link')) {
        const tabs = ['user', 'product', 'category', 'author'];
        const clickedTab = e.target.id.split('-')[0];

        tabs.forEach(tab => {
            if (tab === clickedTab) {
                document.getElementById(`${tab}-tab`).classList.add('active');
                const fetchFunction = window[`fetch${tab.charAt(0).toUpperCase() + tab.slice(1)}`];
                if (typeof fetchFunction === 'function') fetchFunction();

                document.querySelector('#data-section tbody').innerHTML = '';

                const createHeadersFunction = window[`create${tab.charAt(0).toUpperCase() + tab.slice(1)}Headers`];

                if (typeof createHeadersFunction === 'function') {
                    const headers = createHeadersFunction();
                    document.querySelector('#data-section tr').innerHTML = headers;
                }
            } else {
                document.getElementById(`${tab}-tab`).classList.remove('active');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('user-tab').click();
});


