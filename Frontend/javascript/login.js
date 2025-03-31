document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("Không tìm thấy phần tử #loginForm");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Ngăn chặn form reload

        const emailOrUser = document.getElementById("emailOrUser").value.trim();
        const password = document.getElementById("password").value.trim();

        console.log("Dữ liệu gửi lên API:", { emailOrUser, password });

        // Phân biệt giữa email và username
        const isEmail = emailOrUser.includes("@");
        const payload = isEmail
            ? { email: emailOrUser, password }
            : { username: emailOrUser, password };

        try {
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Phản hồi từ API:", response.status, data);

            if (response.ok) {
                alert("Đăng nhập thành công!");
                console.log("Token nhận được từ server:", data.token); // Debug token
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username || ""); 
                localStorage.setItem("email", data.email || ""); 
                localStorage.setItem("role", data.role || ""); 
                setTimeout(() => {
                    fetchProfile(); // Gọi API lấy profile
                    window.location.href = "index.html";
                }, 500);
            } else {
                alert(data.message || "Đăng nhập thất bại!");
            }
        } catch (error) {
            alert("Không thể kết nối với server!");
            console.error("Lỗi kết nối:", error);
        }
    });

    // Google login
    document.getElementById("google-login").addEventListener("click", function () {
        window.location.href = "http://localhost:4000/auth/google";
    });

    // Thêm sự kiện để gọi API profile
    const profileButton = document.getElementById("fetchProfileButton");
    if (profileButton) {
        profileButton.addEventListener("click", fetchProfile);
    }
});

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    const data = JSON.parse(atob(response.credential.split('.')[1]));
    console.log("User Info:", data);

    localStorage.setItem("token", response.credential);
    localStorage.setItem("email", data.email);
    localStorage.setItem("name", data.name);
    localStorage.setItem("avatar", data.picture);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}

// Example: Fetch profile after login
async function fetchProfile() {
    const token = localStorage.getItem("token");
    console.log("Token được lấy từ localStorage:", token); // Debug token

    if (!token) {
        console.error("Không tìm thấy token trong localStorage!");
        alert("Bạn cần đăng nhập trước khi lấy thông tin profile!");
        return;
    }

    try {
        const response = await fetch("http://localhost:4000/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Gửi token trong Authorization Header
                "Content-Type": "application/json"
            }
        });

        console.log("Phản hồi từ API profile:", response.status); // Debug response status
        const data = await response.json();
        console.log("Dữ liệu nhận được từ API profile:", data); // Debug dữ liệu nhận được

        if (response.ok) {
            alert(`Lấy thông tin profile thành công!\nTên: ${data.name}\nEmail: ${data.email}`);
        } else {
            alert(data.message || "Không thể lấy thông tin profile!");
        }
    } catch (error) {
        console.error("Lỗi khi gọi API profile:", error);
        alert("Đã xảy ra lỗi khi lấy thông tin profile!");
    }
}


