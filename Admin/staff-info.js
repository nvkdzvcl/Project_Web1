document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem('loggedInStaff'));


        // Display user info on the admin page
        document.getElementById('usernameItem').textContent = 'Username: ' + user.username;
        document.getElementById('emailItem').textContent = 'Email: ' + user.email;
    
});
document.getElementById('logoutLink').addEventListener('click', function (e) {
    e.preventDefault(); // Ngừng hành động mặc định của liên kết

    // Xóa dữ liệu 'loggedInStaff' trong localStorage
    localStorage.removeItem('loggedInStaff');
    
    // Tùy chọn: xóa bất kỳ dữ liệu sessionStorage nếu cần

    // Tải lại trang hiện tại
    location.reload();  // Tải lại trang hiện tại
});

// Kiểm tra xem localStorage có chứa 'loggedInAdmin' hay không

document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra nếu không có dữ liệu 'loggedInAdmin' trong localStorage
    if (!localStorage.getItem('loggedInStaff')) {
        // Thêm lớp 'no-interaction' vào body để vô hiệu hóa mọi thao tác người dùng
        document.body.classList.add('no-interaction');
    }
});
