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
        options.classList.remove('visible');
        setTimeout(() => {
            options.style.maxHeight = "0px"; 
        }, 10);
        icon.classList.remove('rotate'); 
    } else {
        options.style.maxHeight = options.scrollHeight + "px";
        options.classList.add('visible');
        icon.classList.add('rotate'); 
    }
}

async function updateNavbar() {
    const urlParams = new URLSearchParams(window.location.search);
    const userInfo = urlParams.get('userInfo');

    if (userInfo) {
        const user = JSON.parse(decodeURIComponent(userInfo));
        localStorage.setItem("token", user.token);
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        localStorage.setItem("avatar", user.avatar);
        window.history.replaceState({}, document.title, "/index.html"); 
    }

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const avatar = localStorage.getItem("avatar");
    const loginBtn = document.getElementById("login-btn");
    const adminManagerLink = document.querySelector('a[href="manager.html"]'); 

    if (email && token) {
        loginBtn.innerHTML = `<img src="${avatar || '/image/default-avatar.png'}" alt="Avatar" class="avatar"> <p>${name || email}</p>`;
        loginBtn.href = "#"; 
        loginBtn.onclick = logoutUser; // Gán sự kiện đăng xuất

        // Gọi API để kiểm tra quyền
        try {
            const response = await fetch("http://localhost:4000/auth/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log("Thông tin user từ API profile:", data);
            if (response.ok && data.role === "admin") {
                adminManagerLink.style.display = "block"; 
            } else {
                adminManagerLink.style.display = "none"; 
            }
        } catch (error) {
            console.error("Lỗi khi gọi API profile:", error);
            adminManagerLink.style.display = "none"; 
        }
    } else {
        loginBtn.innerHTML = `<i class="fa fa-user"></i> <p>Login</p>`;
        loginBtn.href = "login.html"; 
        loginBtn.onclick = null; 
        adminManagerLink.style.display = "none"; // Ẩn nút Admin Manager nếu chưa đăng nhập
    }
}

function logoutUser() {
    currentEmail = null;
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
let currentFilters = {
    name : '',
    minPrice: null,
    maxPrice: null,
    type: 'all',
    fuel: 'all'
};
// Hàm tải tất cả xe
async function FetchAllCars() {
    try {
        const response = await fetch('/api/cars');
        allCars = await response.json();
        applyAllFilters(); // Áp dụng bộ lọc ngay sau khi tải dữ liệu
    } catch (error) {
        console.error('Lỗi khi tải danh sách xe:', error);
        throw error;
    }
}
// Hàm áp dụng tất cả bộ lọc
function applyAllFilters() {
    try {
        let filteredCars = [...allCars];
        //Lọc theo tên
        if (currentFilters.name.trim() !== '') {
            const searchTerm = currentFilters.name.toLowerCase();
            filteredCars = filteredCars.filter(car => 
                car.name.toLowerCase().includes(searchTerm)
            );
        }
        // Lọc theo giá
        if (currentFilters.minPrice !== null || currentFilters.maxPrice !== null) {
            filteredCars = filteredCars.filter(car => {
                const priceMatch = 
                    (currentFilters.minPrice === null || car.Price >= currentFilters.minPrice) &&
                    (currentFilters.maxPrice === null || car.Price <= currentFilters.maxPrice);
                return priceMatch;
            });
        }
        // Lọc theo loại xe
        if (currentFilters.type !== 'all') {
            filteredCars = filteredCars.filter(car => 
                car.Type.toLowerCase() === currentFilters.type.toLowerCase()
            );
        }
        // Lọc theo nhiên liệu
        if (currentFilters.fuel !== 'all') {
            filteredCars = filteredCars.filter(car => 
                car.Fuel.toLowerCase() === currentFilters.fuel.toLowerCase()
            );
        }
        // Hiển thị kết quả
        loadCars(filteredCars);
    } catch (error) {
        console.error('Lỗi khi áp dụng bộ lọc:', error);
        throw error;
    }
}
function updateNameFilter(name) {
    currentFilters.name = name;
    applyAllFilters();
}
// Các hàm cập nhật bộ lọc
function updatePriceFilter(minPrice, maxPrice) {
    currentFilters.minPrice = minPrice;
    currentFilters.maxPrice = maxPrice;
    applyAllFilters();
}

function updateTypeFilter(type) {
    currentFilters.type = type;
    applyAllFilters();
}

function updateFuelFilter(fuel) {
    currentFilters.fuel = fuel;
    applyAllFilters();
}

// Hàm hiển thị danh sách xe (giữ nguyên)
async function loadCars(cars) {
    try {
        // Lấy phần tử chứa danh sách xe
        const carList = document.getElementById('car-list');
        carList.innerHTML = ''; // Xóa nội dung cũ
        // Duyệt qua từng xe và tạo HTML
        cars.forEach(car => {
            const carHTML = `
                <div class="article">
                            <div class="article-car" onclick="delayedRedirect(${car.id})">
                                <div class="article-car-item act-1">
                                <div>${car.Fuel || 'Động cơ Xăng'}</div>
                            </div>
                            <div class="article-car-item act-2">
                                <img class="act-img" src="${car.URL}" alt="${car.name}">
                            </div>
                            <div class="article-car-item act-3">${car.name}</div>
                            <div class="article-car-item act-4">
                                ${car.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </div>
                            <div class="article-car-item act-5">
                            <div style="padding-right: 20px;">${car.seats ? `${car.seats} chỗ` : '5 chỗ'}</div>
                            <div>|</div>
                        <div style="padding-left: 20px;">${car.transmission ? car.transmission : 'CVT'}</div>
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
module.exports = email;