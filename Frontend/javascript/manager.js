function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.querySelector('.content').innerHTML = data;
            // Kiểm tra nếu là dashboard thì load chart
            if (page === "dashboard.html") {
                loadDashboardChart();
            }
        })
        .catch(error => console.error("Error loading page:", error));
}

