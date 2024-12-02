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
    // Kiểm tra xem localStorage có chứa 'loggedInAdmin' hay không
    if (!localStorage.getItem('loggedInAdmin')) {
        // Nếu không có dữ liệu 'loggedInAdmin', loại bỏ thẻ <script> của admin-orders.js
        var script = document.getElementById('adminOrdersScript');
        if (script) {
            script.parentNode.removeChild(script);  // Loại bỏ thẻ <script> khỏi DOM
        }
    }
});
