function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const carId = getUrlParameter('id');
async function loadCarDetails(carId) {
    try {
        const bannerPath = `./image/img_banner/${carId}.png`;
        const mainImagepath = `./image/img_detail/${carId}.png`;
        
        // Đợi fetch dữ liệu hoàn thành
        const response = await fetch('/api/cars');
        const allCars = await response.json();
        
        // Tìm xe và kiểm tra tồn tại
        const car = allCars.find(item => String(item.id) === String(carId));           
        // Cập nhật DOM
        document.getElementById('carName').textContent = car.name;
        document.getElementById('carBanner').src = bannerPath;
        document.getElementById('carMainImage').src = mainImagepath;
        document.getElementById('carSeats').textContent = car.seats;
        document.getElementById('carType').textContent = car.Type;
        document.getElementById('carFuel').textContent = car.Fuel;
        document.getElementById('carPrice').textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND'}).format(car.Price);
        document.getElementById('description').textContent = car.description;
    } catch (error) {
        console.error('Error loading car details:', error);
        // Xử lý lỗi phù hợp (ví dụ: hiển thị thông báo cho người dùng)
    }
}
loadCarDetails(carId);


// JS cho phần ảnh trong chi tiết xe
const images = ["./image/img_library/img_library_vios/anh1.png", "./image/img_library/img_library_vios/anh2.png", "./image/img_library/img_library_vios/anh3.png", "./image/img_library/img_library_vios/anh4.png", "./image/img_library/img_library_vios/anh5.png", "./image/img_library/img_library_vios/anh6.png"];
let currentIndex = 0;
let prevIndex = 0; // Lưu vị trí ảnh trước đó

function changeImage(step) {
    currentIndex += step;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    updateGallery();
}

function selectImage(index) {
    currentIndex = index;
    updateGallery();
}

function updateGallery() {
    let mainImage = document.getElementById("mainImage");
    let direction = currentIndex > prevIndex ? "left" : "right";
    prevIndex = currentIndex; // Cập nhật vị trí cũ

    // Xác định hướng trượt
    mainImage.classList.add(direction === "left" ? "slide-left" : "slide-right");

    setTimeout(() => {
        mainImage.src = images[currentIndex];
        mainImage.classList.remove("slide-right", "slide-left"); // Xóa hiệu ứng cũ
    }, 500); // Chờ 300ms để ảnh cũ trượt đi

    let thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex);
    });
}

// JS cho phần đăng ký lái thử
const openFormDangKy = document.getElementById('openFormDangKy'); // Lấy phần tử #openFormDangKy
const formDangKy = document.querySelector('.form-dangkylaithu'); // Lấy phần tử với class .form-dangkylaithu
const mainContent = document.querySelector('.container-main'); // Lấy nội dung trang chính
const closeForm = document.getElementById('closeForm'); // Lấy phần tử #closeForm
const checkboxes = document.querySelectorAll('.checkbox'); // Lấy tất cả checkbox
const checkboxGroups = document.querySelectorAll('.checkbox-group'); // Lấy tất cả checkbox-group
const submitButton = document.getElementById('submitButton'); // Lấy nút Đăng ký
const openFormDatLich = document.getElementById('openFormDatLich');  // Button "Đặt lịch xem xe"
const formTitle = document.querySelector('.form-container h1');      // Tiêu đề trong form


openFormDangKy.addEventListener('click', () => {
    formDangKy.style.display = 'flex'; // Hiển thị formDangKy bằng cách đặt display là 'flex'
    mainContent.classList.add('blur-background'); // Làm mờ nền
    formTitle.textContent = 'ĐĂNG KÝ LÁI THỬ'; // Tiêu đề cho "Đăng ký lái thử"
    submitButton.textContent = 'ĐĂNG KÝ LÁI THỬ'; // Đổi nội dung nút
    submitButton.style.backgroundColor = '#f44336'; // Màu đỏ
    checkboxGroups.forEach(group => group.style.display = 'block'); // Hiển thị cả label và checkbox

    // Thêm border-radius cho cả bên trái của form-img
    const formImg = document.querySelector('.form-img');
    formImg.style.borderTopLeftRadius = '0px';
    formImg.style.borderBottomLeftRadius = '0px';

    // Thay đổi ảnh trong form-img
    const formImgElement = formImg.querySelector('img');
    formImgElement.src = './document/volang.jpg'; // Đường dẫn đến ảnh mới
    formImgElement.alt = 'Đặt lịch'; // Thay đổi thuộc tính alt nếu cần            
});
openFormDatLich.addEventListener('click', () => {
    formDangKy.style.display = 'flex'; // Hiển thị form
    mainContent.classList.add('blur-background'); // Làm mờ nền
    formTitle.textContent = 'ĐẶT LỊCH XEM XE'; // Tiêu đề cho "Đặt lịch xem xe"
    submitButton.textContent = 'ĐẶT LỊCH'; // Đổi nội dung nút
    submitButton.style.backgroundColor = '#007BFF'; // Màu xanh
    checkboxGroups.forEach(group => group.style.display = 'none'); // Ẩn cả label và checkbox

    // Thêm border-radius cho cả bên trái của form-img
    const formImg = document.querySelector('.form-img');
    formImg.style.borderTopLeftRadius = '8px';
    formImg.style.borderBottomLeftRadius = '8px';

    // Thay đổi ảnh trong form-img
    const formImgElement = formImg.querySelector('img');
    formImgElement.src = './document/datlich.jpg'; // Đường dẫn đến ảnh mới
    formImgElement.alt = 'Đặt lịch'; // Thay đổi thuộc tính alt nếu cần

    
});

closeForm.addEventListener('click', () => {
    formDangKy.style.display = 'none'; // Ẩn formDangKy
    mainContent.classList.remove('blur-background'); // Xóa hiệu ứng mờ
});
formDangKy.addEventListener('click', (event) => {
     if (event.target === formDangKy) { // Kiểm tra xem người dùng có click vào vùng nền mờ không
        formDangKy.style.display = 'none'; // Ẩn formDangKy
        mainContent.classList.remove('blur-background'); // Xóa hiệu ứng mờ
    }
});
checkboxes.forEach((checkbox) => {
checkbox.addEventListener('change', () => {
    const allChecked = Array.from(checkboxes).every(cb => cb.checked); // Kiểm tra nếu tất cả checkbox được chọn
    if (allChecked) {
        submitButton.classList.add('enabled'); // Kích hoạt nút
        submitButton.style.opacity = '1'; // Xóa hiệu ứng làm mờ
    } else {
        submitButton.classList.remove('enabled'); // Vô hiệu hóa nút
    }
});
});


// Hàm kiểm tra xem tất cả các trường đã được điền đầy đủ chưa
function validateForm() {
    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value;
    const dealer = document.getElementById('dealer').value;
    const date = document.getElementById('date').value;

    // Kiểm tra nếu tất cả các trường đều không rỗng
    if (fullname && phone && city && dealer && date) {
        submitButton.classList.add('enabled'); // Kích hoạt nút
        submitButton.style.pointerEvents = 'auto'; // Cho phép nhấn
        // submitButton.style.opacity = '1'; // Xóa hiệu ứng làm mờ
    } else {
        submitButton.classList.remove('enabled'); // Vô hiệu hóa nút
        submitButton.style.pointerEvents = 'none'; // Không cho phép nhấn
        submitButton.style.opacity = '0.5'; // Làm mờ nút
    }
}
document.getElementById('submitButton').addEventListener('click', function() {
    const name = document.getElementById('fullname').value;
    const email = localStorage.getItem("email");
    const phoneNumber = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const dealer = document.getElementById('dealer').value;
    const date = document.getElementById('date').value;
    const customerData = {
        name,
        email,
        phoneNumber
    };
    // Gửi request tạo customer
    fetch('http://localhost:4000/customer/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
    }).then(async response => {
            if(response.status === 400)
            {
            }else{
                const orderData = {
                    phoneNumber,
                    city,
                    dealer,
                    date,
                    carId
                };
                fetch('http://localhost:4000/order/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                })
                .then(async response => {
                    if(response.status === 201)
                    {
                        console.log("AAAAAAA");
                    }
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Tạo đơn hàng thất bại');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Đơn hàng đã được tạo:', data);
                    // Redirect hoặc làm gì đó sau khi thành công
                })
                .catch(error => {
                    console.error('Lỗi:', error);
                    alert('Lỗi khi đặt xe: ' + error.message);
                });  
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
    
});
// Gắn sự kiện 'input' hoặc 'change' cho các trường trong form
document.getElementById('fullname').addEventListener('input', validateForm);
document.getElementById('phone').addEventListener('input', validateForm);
document.getElementById('city').addEventListener('change', validateForm);
document.getElementById('dealer').addEventListener('change', validateForm);
document.getElementById('date').addEventListener('change', validateForm);

