function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;

            //Kiem tra neu la dashboard thi load chart
            if (page === "dashboard.html") {
                loadDashboardChart();
            }
        })
        .catch(error => console.error("Error loading page:", error));
}

