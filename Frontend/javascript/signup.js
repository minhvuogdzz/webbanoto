document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngăn chặn load lại trang

    // Lấy dữ liệu từ form
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    //kiểm tra mật khẩu
    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Gửi dữ liệu tới server xử lý ngoại lệ
    try {
        const response = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: username, email, password }),
        });

        const data = await response.json();
        alert(data.message); // Hiển thị thông báo từ server

        if (response.ok) {
            window.location.href = "login.html"; // Chuyển sang trang đăng nhập
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
});