function selectOption(element) {
    let parentGroup = element.parentNode;
    let options = parentGroup.querySelectorAll('.filter-option');

    options.forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
}

// Thu gọn hoặc mở rộng bộ lọc
function toggleFilter(header) {
    let options = header.nextElementSibling;
    let icon = header.querySelector('i');

    if (options.classList.contains('visible')) {
        // Thu gọn filter
        options.classList.remove('visible');
        setTimeout(() => {
            options.style.maxHeight = "0px"; 
        }, 10);
        icon.classList.remove('rotate'); // Mũi tên quay xuống
    } else {
        // Mở filter
        options.style.maxHeight = options.scrollHeight + "px"; // Đặt max-height đúng với nội dung
        options.classList.add('visible');
        icon.classList.add('rotate'); // Mũi tên quay lên
    }
}

function updateNavbar() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const loginBtn = document.getElementById("login-btn");

    if (email && token) {
        loginBtn.innerHTML = `<i class="fa fa-user"></i> <p>${email}</p>`;
        loginBtn.href = "#"; // Không cho chuyển trang
        loginBtn.onclick = logoutUser; // Gán sự kiện đăng xuất
    } else {
        loginBtn.innerHTML = `<i class="fa fa-user"></i> <p>Login</p>`;
        loginBtn.href = "login.html"; // Chuyển về trang đăng nhập
        loginBtn.onclick = null; // Xóa sự kiện đăng xuất
    }
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    alert("Bạn đã đăng xuất!");
    updateNavbar(); 
}
// Gọi updateNavbar() ngay khi trang load
document.addEventListener("DOMContentLoaded", updateNavbar);

function loadPage(url) {
    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click(); 
    document.body.removeChild(link);
}
