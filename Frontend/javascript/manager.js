function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;

            // Kiểm tra nếu là dashboard thì khởi tạo biểu đồ
            if (page === "dashboard.html") {
                loadDashboardChart();
            }
        })
        .catch(error => console.error("Error loading page:", error));
}

