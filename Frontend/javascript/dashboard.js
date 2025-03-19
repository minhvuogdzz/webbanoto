function loadDashboardChart() {
    console.log("🔄 Đang khởi tạo biểu đồ...");

    let salesCtx = document.getElementById("salesChart");
    if (salesCtx) {
        console.log("✅ Found #salesChart, initializing chart...");
        const salesData = {
            labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
            datasets: [{
                label: "Revenue (Tỷ VND)",
                data: [8, 8.7, 10, 13, 9, 15],  
                backgroundColor: "rgba(54, 162, 235, 0.3)",  
                borderColor: "rgb(55, 130, 170)",  
                borderWidth: 3,  
                pointBackgroundColor: "rgba(255, 255, 255, 1)",  
                pointBorderColor: "rgba(255, 99, 132, 1)",  
                pointRadius: 6,  
                tension: 0.3
            }]
        };

        const config = {
            type: "line",
            data: salesData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: "white", font: { weight: "bold" } }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: "white", font: { weight: "bold" } },
                        grid: { color: "rgba(255, 255, 255, 0.2)" } 
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: "white", font: { weight: "bold" } },
                        grid: { color: "rgba(255, 255, 255, 0.2)" }
                    }
                }
            }
        };

        new Chart(salesCtx, config);
    } else {
        console.error("Lỗi: Không tìm thấy #salesChart!");
    }

    let carsCtx = document.getElementById("topSellingCarsChart");
    if (carsCtx) {
        console.log("✅ Found #topSellingCarsChart, initializing chart...");
        const topSellingCarsData = {
            labels: ["SUV", "Sedan", "Electric Car", "Sevice Car"],
            datasets: [{
                label: "Top Selling Car Models",
                data: [30, 50, 20, 40],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.8)",  
                    "rgba(255, 159, 64, 0.8)",  
                    "rgba(153, 102, 255, 0.8)", 
                    "rgba(255, 99, 132, 0.8)"   
                ],
                borderColor: "rgba(255, 255, 255, 1)",  
                borderWidth: 1
            }]
        };

        const topSellingCarsConfig = {
            type: "pie",
            data: topSellingCarsData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: "white", font: { weight: "bold" } }
                    }
                }
            }
        };

        new Chart(carsCtx, topSellingCarsConfig);
    } else {
        console.error("Lỗi: Không tìm thấy #topSellingCarsChart!");
    }
}
