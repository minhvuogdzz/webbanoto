// Hàm vẽ biểu đồ, tách riêng để có thể gọi lại sau khi load
function loadDashboardChart() {
    console.log("🔄 Đang khởi tạo biểu đồ...");

    let salesCtx = document.getElementById("salesChart");
    if (salesCtx) {
        console.log("✅ Found #salesChart, initializing chart...");
        const salesData = {
            labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
            datasets: [{
                label: "Revenue (Tỷ VND)",
                data: [8, 8.7, 10, 13, 9, 15],  // Biến động mạnh hơn
                backgroundColor: "rgba(54, 162, 235, 0.3)",  // Xanh dương nhạt
                borderColor: "rgb(55, 130, 170)",  // Đỏ cam
                borderWidth: 3,  // Đường đậm hơn
                pointBackgroundColor: "rgba(255, 255, 255, 1)",  // Điểm trắng
                pointBorderColor: "rgba(255, 99, 132, 1)",  // Viền đỏ cam
                pointRadius: 6,  // Điểm lớn hơn
                tension: 0.3  // Làm đường có độ cong nhẹ
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
                        grid: { color: "rgba(255, 255, 255, 0.2)" } // Đường lưới nhạt
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
        console.error("❌ Lỗi: Không tìm thấy #salesChart!");
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
                    "rgba(75, 192, 192, 0.8)",  // Xanh ngọc
                    "rgba(255, 159, 64, 0.8)",  // Cam
                    "rgba(153, 102, 255, 0.8)", // Tím
                    "rgba(255, 99, 132, 0.8)"   // Hồng đỏ
                ],
                borderColor: "rgba(255, 255, 255, 1)",  // Viền trắng
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
        console.error("❌ Lỗi: Không tìm thấy #topSellingCarsChart!");
    }
}
