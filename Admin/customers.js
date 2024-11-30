// Kiểm tra xem dữ liệu đơn hàng đã có trong localStorage chưa
let customers = JSON.parse(localStorage.getItem('customers'));

// Nếu chưa có dữ liệu trong localStorage => thì gán giá trị mặc định
if(!customers) {
    customers = [
        {
            id: 1,
            username: '111',
            password: '111',
            status: 'true',
            role: 'customer'
        },
        {
            id: 2,
            username: '222',
            password: '222',
            status: 'true',
            role: 'customer'
        },
        {
            id: 3,
            username: 'caovn',
            password: '333',
            status: 'true',
            role: 'customer'
        },
        {
            id: 4,
            username: 'hainguyen',
            password: 'hainguyen',
            status: 'true',
            role: 'customer'
        },
        {
            id: 5,
            username: 'ngohongvi',
            password: 'vingo',
            status: 'true',
            role: 'customer'
        },
        {
            id: 6,
            username: 'jack',
            password: '9797',
            status: 'true',
            role: 'customer'
        },
        {
            id: 7,
            username: 'diepvien007',
            password: 'diepvien007',
            status: 'true',
            role: 'customer'
        },
        {
            id: 8,
            username: 'thongtindaotao',
            password: 'mssv',
            status: 'false',
            role: 'customer'
        },
        {
            id: 9,
            username: 'nguyenvana',
            password: 'nguyenvana',
            status: 'true',
            role: 'customer'
        },
        {
            id: 10,
            username: '888',
            password: 'maso8',
            status: 'true',
            role: 'customer'
        },
    ]
    // Lưu dữ liệu mặc định vào localStorage
    localStorage.setItem('customers', JSON.stringify(customers));
}