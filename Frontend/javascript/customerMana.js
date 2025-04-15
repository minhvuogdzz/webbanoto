// Mảng lưu trữ khách hàng
let customers = [];

// Hàm lấy danh sách khách hàng từ backend
async function fetchCustomersFromServer() {
    try {
        const response = await fetch("/"); // Ensure this matches the route in CustomerRoute.js
        if (!response.ok) {
            throw new Error("Không thể lấy danh sách khách hàng từ server.");
        }

        const data = await response.json();
        customers = data; // Cập nhật mảng khách hàng từ server
        updateTable(); // Cập nhật bảng hiển thị
    } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
        alert("Đã xảy ra lỗi khi lấy danh sách khách hàng. Vui lòng thử lại.");
    }
}

// Gọi hàm fetchCustomersFromServer khi trang được tải
document.addEventListener("DOMContentLoaded", fetchCustomersFromServer);

// Hàm thêm khách hàng vào bảng
function addCustomer() {
    // Lấy thông tin từ các input
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone').value;
    // const status = document.getElementById('status').value;

    // Kiểm tra nếu tất cả các trường không trống
    if (name && email && phoneNumber) {
        // Gói dữ liệu vào customerData
        const customerData = {
            name,
            email,
            phoneNumber
        };

        // Gửi yêu cầu tạo khách hàng tới server
        fetch('http://localhost:4000/customer/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Customer created:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });

        // Thêm khách hàng vào mảng
        customers.push(customerData);

        // Gọi hàm cập nhật bảng
        updateTable();

        // Xóa giá trị các input sau khi thêm
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
    } else {
        alert('Vui lòng điền đầy đủ thông tin!');
    }
}

// Hàm cập nhật bảng với dữ liệu mới
function updateTable() {
    const tableBody = document.getElementById('customer-table');
    tableBody.innerHTML = '';

    // Duyệt qua mảng khách hàng để tạo các dòng trong bảng
    customers.forEach((customer, index) => {
        const row = document.createElement('tr');

        // Tạo các ô trong bảng
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.status}</td>
            <td>
                <button class="btn btn-warning" onclick="editCustomer(${index})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteCustomer(${index})">Xóa</button>
            </td>
        `;

        // Thêm dòng vào bảng
        tableBody.appendChild(row);
    });
}

// Hàm sửa thông tin khách hàng
function editCustomer(index) {
    const customer = customers[index];
    document.getElementById('name').value = customer.name;
    document.getElementById('email').value = customer.email;
    document.getElementById('phone').value = customer.phone;
    // document.getElementById('status').value = customer.status;

    // Thay đổi hành động của nút Thêm thành Cập nhật
    const addButton = document.querySelector('.btn-primary');
    addButton.textContent = 'Cập nhật khách hàng';
    addButton.onclick = function () {
        updateCustomer(index);
    };
}

// Hàm cập nhật thông tin khách hàng sau khi sửa
function updateCustomer(index) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    // const status = document.getElementById('status').value;

    customers[index] = { name, email, phone, /* status */ };

    // Cập nhật lại bảng
    updateTable();

    // Đổi lại nút Thêm
    const addButton = document.querySelector('.btn-primary');
    addButton.textContent = 'Thêm khách hàng';
    addButton.onclick = addCustomer;

    // Xóa giá trị các input sau khi cập nhật
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

// Hàm xóa khách hàng
function deleteCustomer(index) {
    // Xác nhận xóa
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
        customers.splice(index, 1);
        updateTable();
    }
}
