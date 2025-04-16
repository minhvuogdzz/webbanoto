// Mảng lưu trữ khách hàng
let customers = [];

// Hàm lấy danh sách khách hàng từ backend
async function fetchCustomersFromServer() {
    try {
        const response = await fetch("http://localhost:4000/customer/list"); // Đúng route theo router.get("/list", ...)
        if (!response.ok) {
            throw new Error("Không thể lấy danh sách khách hàng từ server.");
        }

        const data = await response.json();
        customers = data; // Giả sử BE trả về mảng khách hàng
        updateTable();    // Hàm cập nhật lại UI
    } catch (error) {
        alert("Đã xảy ra lỗi khi lấy danh sách khách hàng. Vui lòng thử lại.");
    }
}

// Gọi hàm fetchCustomersFromServer khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    const interval = setInterval(() => {
        const tableBody = document.getElementById("customer-table");
        if (tableBody) {
            clearInterval(interval); // Đã tìm thấy, dừng loop
            fetchCustomersFromServer(); // Gọi hàm ở đây
        }
    }, 100); // Kiểm tra mỗi 100ms
});

// // Re-fetch customer 
// document.addEventListener("visibilitychange", () => {
//     if (document.visibilityState === "visible") {
//         fetchCustomersFromServer();
//     }
// });

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
            .then(async response => {
                const data = await response.json();
                alert(data.message);
                if (response.status === 201) {
                    customers.push(customerData);
                    updateTable();
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('phone').value = '';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert('Vui lòng điền đầy đủ thông tin!');
    }
}

// Hàm cập nhật bảng với dữ liệu mới
function updateTable() {
    const tableBody = document.getElementById('customer-table');
    if (!tableBody) {
        console.error("Element with ID 'customer-table' not found in the DOM.");
        return;
    }

    tableBody.innerHTML = ''; // Clear the table before updating

    // Populate the table with customer data
    customers.forEach((customer, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phoneNumber}</td>
            <td>
                <button class="btn btn-warning" onclick="editCustomer(${index})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteCustomer(${index})">Xóa</button>
            </td>
        `;
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
async function updateCustomer(index) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone').value;
    
    // Kiểm tra dữ liệu nhập vào
    if (!name || !email || !phoneNumber) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Tạo đối tượng customer mới để gửi lên backend
    const updatedCustomer = {
        name,
        email,
        phoneNumber
    };

    const customer = customers[index];

    try {
        // Gửi yêu cầu PUT lên server để cập nhật khách hàng
        const response = await fetch(`http://localhost:4000/customer/${customer._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        });

        if (!response.ok) {
            throw new Error("Cập nhật khách hàng thất bại");
        }

        // Cập nhật lại dữ liệu trong mảng customers
        customers[index] = { ...customer, ...updatedCustomer };

        alert("Cập nhật thành công!");

        // Cập nhật lại bảng
        updateTable();

        // Đổi lại nút thành "Thêm khách hàng" sau khi cập nhật
        const addButton = document.querySelector('.btn-primary');
        addButton.textContent = 'Thêm khách hàng';
        addButton.onclick = function () {
            addCustomer();
        };

        // Xóa thông tin trong form sau khi cập nhật
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
    } catch (error) {
        alert("Đã xảy ra lỗi khi cập nhật khách hàng.");
    }
}

// Hàm xóa khách hàng
async function deleteCustomer(index) {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
        try {
            const customerId = customers[index]._id; // Lấy ID thực tế
            const response = await fetch(`http://localhost:4000/customer/${customerId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Xoá khách hàng thất bại");
            }

            alert("Xoá thành công!");
            // Cập nhật lại danh sách khách hàng
            customers.splice(index, 1);
            updateTable();
        } catch (error) {
            alert("Đã xảy ra lỗi khi xoá khách hàng.");
        }
    }
}