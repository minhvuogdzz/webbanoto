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
    const urlParams = new URLSearchParams(window.location.search);
    const userInfo = urlParams.get('userInfo');

    if (userInfo) {
        const user = JSON.parse(decodeURIComponent(userInfo));
        localStorage.setItem("token", user.token);
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        localStorage.setItem("avatar", user.avatar);
        window.history.replaceState({}, document.title, "/index.html"); // Remove query params from URL
    }

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const avatar = localStorage.getItem("avatar");
    const loginBtn = document.getElementById("login-btn");

    if (email && token) {
        //loginBtn.innerHTML = `<img src="${avatar}" alt="Avatar" class="avatar"> <p>${name || email}</p>`;
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
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
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

let allCars = [];

async function FetchAllCars() {
    try {
        const response = await fetch('/api/cars');
        allCars = await response.json();
    } catch (error) {
        console.error('Lỗi khi tải danh sách xe:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
    loadCars(allCars);
}

let filterByPriceCar = [];

async function FilterByPrice(minPrice, maxPrice) {
    try {
        // Lọc trực tiếp từ allCars
        filterByPriceCar = allCars.filter(car => 
        car.Price >= minPrice && car.Price <= maxPrice
        );
        loadCars(filterByPriceCar); // Hiển thị kết quả lọc
    } catch (allCars) {
        console.error('Lỗi khi lọc xe theo giá:', error);
        throw error;
    }
}

// Hàm để hiển thị danh sách xe
async function loadCars(cars) {
    try {
        // Lấy phần tử chứa danh sách xe
        const carList = document.getElementById('car-list');
        carList.innerHTML = ''; // Xóa nội dung cũ
        // Duyệt qua từng xe và tạo HTML
        cars.forEach(car => {
            const carHTML = `
                <div class="article" onclick="delayedRedirect(${car.id})">
                    <div class="article-car">
                        <div class="article-car-item act-1">
                            <div>${car.Fuel || 'Động cơ Xăng'}</div>
                        </div>
                        <div class="article-car-item act-2">
                            <img class="act-img" src="${car.URL || '/image/1.png'}" alt="${car.name}">
                        </div>
                        <div class="article-car-item act-3">${car.name}</div>
                        <div class="article-car-item act-4">
                            ${car.Price}
                            <p style="font-size: 12px; position: absolute; top: -3px; right: 116px;">${car.currency || 'VNĐ'}</p>
                        </div>
                        <div class="article-car-item act-5">
                            <div style="padding-right: 20px;">${car.seats || '5 chỗ'}</div>
                            <div>|</div>
                            <div style="padding-left: 20px;">${car.transmission || 'Số tự động'}</div>
                        </div>
                    </div>
                </div>
            `;
            carList.insertAdjacentHTML('beforeend', carHTML);
        });
    } catch (error) {
        console.error('Lỗi khi tải danh sách xe:', error);
        document.getElementById('car-list').innerHTML = '<p>Không thể tải danh sách xe. Vui lòng thử lại sau.</p>';
    }
}
