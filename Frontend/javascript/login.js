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

        console.log("Dữ liệu gửi lên API:", { email: emailOrUser, password: password });

        try {
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailOrUser, password: password }),
            });

            const data = await response.json();
            console.log("Phản hồi từ API:", response.status, data);

            if (response.ok) {
                alert("Đăng nhập thành công!");
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username); // Store username
                localStorage.setItem("email", emailOrUser); // Store email
                setTimeout(() => {
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
});

//jwt
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    const data = JSON.parse(atob(response.credential.split('.')[1]));
    console.log("User Info:", data);
s
    document.getElementById("user-avatar").src = data.picture;
    document.getElementById("user-name").innerText = "Xin chào, " + data.name;
    document.getElementById("user-info").style.display = "block";
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "1013513995188-gjqtc0alja2057keaoa9u0lk626a143r.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    document.getElementById("google-login").addEventListener("click", function () {
        google.accounts.id.prompt(); 
    });
};

