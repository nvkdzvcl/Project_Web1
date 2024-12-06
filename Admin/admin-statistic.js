// Format tiền việt
function formatCurrencyVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}


// thong ke
// Hàm lọc thống kê theo khoảng thời gian
// Trả về danh sách đã lọc
function filterOrdersByDate(orders){
    // lấy ngày bắt đầu + kết thúc
    const startDate = document.querySelector('#start-date-filter').value;
    const endDate = document.querySelector('#end-date-filter').value;

    // kiểm tra ngày hợp lệ ngày kết thúc > ngày bắt đầu
    if (new Date(startDate) > new Date(endDate)) {
        alert('Ngày không hợp lệ!');
        startDate.focus();
        return orders;
    }

    if(startDate){
        orders = orders.filter(order => new Date(order.date) >= new Date(startDate));
    }
    
    if(endDate){
        orders = orders.filter(order => new Date(order.date) <= new Date(endDate));
    }

    return orders;

}
// Tạo thống kê mặt hàng
function displayStatisticType() {
    // lấy danh sách đơn hàng
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    // lấy danh sách sản phẩm
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // lọc theo khoảng thời gian
    orders = filterOrdersByDate(orders);

    // đối tượng chứa thông tin thống kê
    let statisticType = {};

    // lấy thông tin thống kê
    orders.forEach(order => {
        order.orderItems.forEach(orderItem => {
            let product = products.find(p => p.id === orderItem.productId);
            
            if(product) {
                let type = product.type;
    
                // Nếu loại mặt hàng chưa tồn tại trong thống kê thì khởi tạo
                if(!statisticType[type]){
                    statisticType[type] = {
                        quantity: 0,
                        totalCost: 0,
                    }
                }
                
                let sizes = orderItem.sizes;
                sizes.forEach(size => {
                    statisticType[type].quantity += size.quantity;
                    let price = 0;
                    let pSize = product.sizes.find(pSize => pSize.size === size.size);
                    if(pSize){
                        price = pSize.price;
                    }   
                    statisticType[type].totalCost += size.quantity * price;
                });
            } 

        });
    });

    // Hiển thị thông tin thống kê trong bảng
    const statisticTableType = document.querySelector('.statistic-table-type tbody');
    statisticTableType.innerHTML = ''; // Xóa dữ liệu cũ trước khi hiển thị
    let totalRevenue = 0;   // Tổng doanh thu
    
    for(let type in statisticType) {
        totalRevenue += statisticType[type].totalCost;  // Tính tổng doanh thu
        let row = document.createElement('tr');
        row.onclick = () => showTypeDetail(type);
        row.innerHTML = `
            <td>${type}</td>
            <td>${statisticType[type].quantity}</td>
            <td>${formatCurrencyVND(statisticType[type].totalCost)}</td>
        `;


        statisticTableType.appendChild(row);
    }
    const tableTfootRevenue = document.querySelector('.statistic-table-type tfoot');
    tableTfootRevenue.innerHTML = `
        <tr>
            <td colspan="2"><strong>Tổng thu:</strong></td>
            <td class="total-revenue">${formatCurrencyVND(totalRevenue)}</td>
        </tr>
    `;
}

// Trang hiện tại của thống kê theo mặt hàng
let currentPageTypeDetail = 1;
// số lượng item trên 1 trang
let itemTypeDetailPerPage = 6;

// Xem chi tiết các sản phẩm được bán ra của mặt hàng
function showTypeDetail(type) {
    // lấy danh sách sản phẩm
    let products = JSON.parse(localStorage.getItem('products')) || [];
    // lọc sản phẩm theo mặt hàng
    products = products.filter(product => product.type === type);
    // lấy danh sách đơn hàng
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Thêm phần title cho chi tiết mặt hàng
    const typeDetailTitle = document.querySelector('.type-detail-title');
    typeDetailTitle.textContent = `Mặt hàng ${type}`;

    // Thêm sự kiện cho sắp xếp theo việc bán chạy nhất / ế nhất
    const typeDetailFilter = document.getElementById('type-detail-filter');
    typeDetailFilter.addEventListener('change', () => {
        currentPageTypeDetail = 1;
        const type = document.querySelector('.type-detail-title').textContent.replace('Mặt hàng ', '');
        showTypeDetail(type);
    });
    
    
    // Mảng chứa các sản phẩm được bán ra của mặt hàng
    let prods = [];

    products.forEach(product => {
        let sizes = [];
        let prodCost = 0;
        orders.forEach(order => {
            order.orderItems.forEach(orderItem => {
                if(orderItem.productId === product.id) {
                    orderItem.sizes.forEach(oSize => {
                        let pSize = product.sizes.find(pSize => pSize.size === oSize.size);
                        if(pSize) {
                            // Kiểm tra trong mảng kết quả có size này chưa
                            let size = sizes.find(size => size.size === pSize.size);
                            if(size) {
                                size.quantity += oSize.quantity;
                            }
                            else {
                                sizes.push({
                                    size: pSize.size,
                                    quantity: oSize.quantity,
                                    price: pSize.price
                                });
                            }
                            prodCost += pSize.price * oSize.quantity;
                        }
                    });
                }
            });
        });
        // Thêm sản phẩm mới vào mảng
        prods.push({
            id: product.id,
            name: product.name,
            sizes: sizes,
            totalCost: prodCost
        });
        
    });
    // in html ở đây
    // Kiểm tra điều kiện đang chọn (bán chạy nhất/bán ế nhất) để sắp xếp
    if(typeDetailFilter.value === 'best_selling') {
        prods.sort((a, b) => b.totalCost - a.totalCost);
    }
    if(typeDetailFilter.value === 'least_selling') {
        prods.sort((a, b) => a.totalCost - b.totalCost);
    }

    const typeDetailBody = document.querySelector('.type-detail-table tbody');
    typeDetailBody.innerHTML = '';

    let startIndex = (currentPageTypeDetail - 1) * itemTypeDetailPerPage;
    let endIndex = Math.min(startIndex + itemTypeDetailPerPage, prods.length);

    for(let i = startIndex; i < endIndex; i++) {
        if(prods[i].sizes.length === 0) {
            typeDetailBody.innerHTML += `
                <tr>
                    <td rowspan="1">${prods[i].id}</td>
                    <td rowspan="1">${prods[i].name}</td>
                    <td></td>
                    <td>0</td>
                    <td>${formatCurrencyVND(0)}</td>
                    <td rowspan="1">${formatCurrencyVND(0)}</td>
                </tr>
            `;
        }
    
        prods[i].sizes.forEach((size, index) => {
            let count = prods[i].sizes.length;
            let row = `
                <tr>
                    <td rowspan="${count}">${prods[i].id}</td>
                    <td rowspan="${count}">${prods[i].name}</td>
                    <td>${size.size}</td> <!-- Đảm bảo sử dụng đúng kích thước -->
                    <td>${size.quantity}</td>
                    <td>${formatCurrencyVND(size.price)}</td>
                    <td rowspan="${count}">${formatCurrencyVND(prods[i].totalCost)}</td>
                </tr>
            `;
            if (index > 0) {
                row = `
                    <tr>
                        <td>${size.size}</td>
                        <td>${size.quantity}</td>
                        <td>${formatCurrencyVND(size.price)}</td>
                    </tr>
                `;
            }
            typeDetailBody.innerHTML += row;
        });

    }
    displayTypeDetailPagination(prods.length, type);

    document.querySelector('.wrap-statistic-type-detail').style.display = 'block';
}

// Hàm phân trang khi in ra chi tiết các sản phảm
function displayTypeDetailPagination(length, type) {
    let pagination = document.querySelector('.type-detail-pagination');
    
    pagination.innerHTML = '';

    let totalPages = Math.ceil(length / itemTypeDetailPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        let pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.classList.add('pagination-btn');
        pageBtn.addEventListener('click', () => {
            currentPageTypeDetail = i;
            showTypeDetail(type);
        });
        if(i === currentPageTypeDetail) {
            pageBtn.className = 'active-pagination-btn';
        }
        pagination.appendChild(pageBtn);
    }
}


// Hàm tắt hiển thị chi tiết các sản phẩm được phân theo mặt hàng
function closeTypeDetail() {
    document.querySelector('.wrap-statistic-type-detail').style.display = 'none';
    document.querySelector('#type-detail-filter').value = 'best_selling';
}


// Tạo thống kê theo khách hàng
// Trang hiện tại của thống kê theo khách hàng
let currentPageStatistic = 1;
// Số lượng item trên 1 trang
let itemStatisticPerPage = 9;

// hàm in ra danh sách các khách hàng đã mua
function displayStatisticCustomer(){
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const address = JSON.parse(localStorage.getItem('address')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Lọc danh sách đơn theo khoảng thời gian
    orders = filterOrdersByDate(orders);

    // Mảng thống kê chứa các thông tin khách hàng
    let statisticCustomerArray = [];

    orders.forEach(order => {   // Duyet qua danh sach don hang
        let customer = customers.find(cus => cus.id === order.customerId);  // Tim khach hang cua don hang hien tai
        if(customer) {  // Ton tai khach hang
            let customerId = customer.id;

            // Kiểm tra khách hàng đã có trong mảng thống kê chưa
            let index = statisticCustomerArray.findIndex(o => o.customerId === customerId);

            if(index == -1) {   //Nếu khách hàng chưa tồn tại trong mảng thống kê
                index = statisticCustomerArray.length;
                let add = address.find(a => a.customerId === customerId);
                statisticCustomerArray.push({   //Thêm thông tin khách hàng vào mảng thống kê
                    customerId: customer.id,
                    name: add.fullname,
                    quantity: 0,
                    totalSpent: 0
                });
            }

            order.orderItems.forEach(orderItem => {
                let product = products.find(p => p.id === orderItem.productId);
                if(product) {
                    orderItem.sizes.forEach(size => {
                        statisticCustomerArray[index].quantity += size.quantity;
    
                        let price = 0;
                        let pSize = product.sizes.find(pSize => pSize.size === size.size);
                        if(pSize) {
                            price = pSize.price;
                        }
                        statisticCustomerArray[index].totalSpent += size.quantity * price;
                    });
                }
            });
            
            
        }
    });
    
    // Thêm html
    const statisticTableCustomer = document.querySelector('.statistic-table-customer tbody');
    statisticTableCustomer.innerHTML = '';

    let startIndex = (currentPageStatistic - 1) * itemStatisticPerPage;
    let endIndex = Math.min(startIndex + itemStatisticPerPage, statisticCustomerArray.length);

    for(let i = startIndex; i < endIndex; i++) {
        statisticTableCustomer.innerHTML += `
            <tr onclick = "showCustomerDetail(${statisticCustomerArray[i].customerId})">
                <td>${statisticCustomerArray[i].customerId}</td>
                <td>${statisticCustomerArray[i].name}</td>
                <td>${statisticCustomerArray[i].quantity}</td>
                <td>${formatCurrencyVND(statisticCustomerArray[i].totalSpent)}</td>
            </tr>
        `;
    }
    displayStatisticCustomerPagination(statisticCustomerArray.length);
    // In ra danh sách 3 khách hàng mua có tổng tiền cao nhất
    displayHighestPayingCustomers(statisticCustomerArray);
}

// Hàm in ra danh sách 3 khách hàng mua hàng với tổng tiển cao nhất
let topCustomer = 3;
function displayHighestPayingCustomers (statisticCustomerArray) {   // Nhận vào 1 mảng có cấu trúc {customerId, name, quantity, totalSpent}
    // Sắp xếp mảng theo thứ tự giảm dần (theo totalSpent)
    statisticCustomerArray.sort((a, b) => b.totalSpent - a.totalSpent);
    
    const tableTopCustomer = document.querySelector('.statistic-table-top-customers tbody');
    tableTopCustomer.innerHTML = '';

    for(let i = 0; i < topCustomer; i++) {
        tableTopCustomer.innerHTML += `
            <tr onclick = "showCustomerDetail(${statisticCustomerArray[i].customerId})">
                <td>${statisticCustomerArray[i].customerId}</td>
                <td>${statisticCustomerArray[i].name}</td>
                <td>${statisticCustomerArray[i].quantity}</td>
                <td>${formatCurrencyVND(statisticCustomerArray[i].totalSpent)}</td>
            </tr>
        `;
    }

}

// hàm phân trang
function displayStatisticCustomerPagination(totalCustomer) {
    let pagination = document.querySelector('.statistic-pagination');
    pagination.innerHTML = '';

    let totalPages = Math.ceil(totalCustomer / itemStatisticPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        let pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.classList.add('pagination-btn');
        pageBtn.addEventListener('click', () => {
            currentPageStatistic = i;
            displayStatisticCustomer();
        });
        if(i === currentPageStatistic) {
            pageBtn.className = 'active-pagination-btn';
        }
        pagination.appendChild(pageBtn);
    }
}

// Hàm hiển thị chi tiết khách hàng gồm: thôgn tin + đơn hàng
function showCustomerDetail(customerId) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let address = JSON.parse(localStorage.getItem('address')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let customers = JSON.parse(localStorage.getItem('customers')) || [];

    let add = address.find(a => a.customerId === customerId);

    orders = orders.filter(o => o.customerId === customerId);

    let customerDetail = {
        customerId: customerId,
        customerName: add.fullname,
        phone: add.phone,
        ords: [],
        totalSpent: 0,
    };

    orders.forEach(order => {
        let quantity = 0;
        let totalCost = 0;
        order.orderItems.forEach(orderItem => {
            let product = products.find(p => p.id === orderItem.productId);
            if(product) {
                orderItem.sizes.forEach(size => {
                    quantity += size.quantity;
                    let pSize = product.sizes.find(pSize => pSize.size === size.size);
                    totalCost += size.quantity * pSize.price;
                    customerDetail.totalSpent += size.quantity * pSize.price;
                });
            }
        });

        customerDetail.ords.push({
            orderId: order.id,
            quantity: quantity,
            totalCost: totalCost
        });
    });
    
    const customerHeader = document.querySelector('.customer-header');
    customerHeader.innerHTML = `
        <h2>Chi tiết khách hàng</h2>
        <p><strong>Mã khách hàng: </strong>${customerDetail.customerId}</p>
        <p><strong>Tên khách hàng: </strong>${customerDetail.customerName}</p>
        <p><strong>Số điện thoại: </strong>${customerDetail.phone}</p>
        <button class="btn-close-customer-detail" onclick = "closeCustomerDetail()">+</button>
    `;

    const customerItemsBody = document.querySelector('.customer-items-tbody');
    customerItemsBody.innerHTML = '';

    for(let i = 0; i < customerDetail.ords.length; i++) {
        customerItemsBody.innerHTML += `
            <tr>
                <td>${customerDetail.ords[i].orderId}</td>
                <td>${customerDetail.ords[i].quantity}</td>
                <td>${formatCurrencyVND(customerDetail.ords[i].totalCost)}</td>
            </tr>
        `;
    }

    const customerSummary = document.querySelector('.customer-summary');
    customerSummary.innerHTML = `
        <p><strong>Tổng tiền:</strong> ${formatCurrencyVND(customerDetail.totalSpent)}</p>
    `;

    document.querySelector('.wrap-customer-detail').style.display = 'block';
    
}

function closeCustomerDetail() {
    document.querySelector('.wrap-customer-detail').style.display = 'none';
}





// Thêm sự kiện cho nút áp dụng
document.querySelector('.btn-accept-filter').addEventListener('click', () => {
    if(document.querySelector('.statistic-type').style.display === 'block') {
        displayStatisticType();
    }
    else if(document.querySelector('.statistic-customer').style.display === 'block'){
        displayStatisticCustomer();
    }
    alert('Đã áp dụng lọc.');
});

// Thêm sự kiện hiển thị trang thống kê
document.querySelector('.view-statistic').addEventListener('click', () => {
    document.querySelector('.statistic-content').style.display = 'flex';
    document.querySelector('.order-content').style.display = 'none';
    document.querySelector('.product-content').style.display = 'none' ;
    document.querySelector('.customer-content').style.display = 'none'; 

});

// Thêm sự kiện cho nút xem thống kê của mặt hàng
const statisticTypeButton = document.querySelector('.statistic-type-btn');
statisticTypeButton.addEventListener('click', () => {
    document.querySelector('.statistic-type').style.display = 'block';
    document.querySelector('.statistic-customer').style.display = 'none';
    displayStatisticType();
});

// Thêm sự kiện cho nút xem thống kê của khách hàng
const statisticCustomerButton = document.querySelector('.statistic-customer-btn');
statisticCustomerButton.addEventListener('click', () => {
    document.querySelector('.statistic-customer').style.display = 'block';
    document.querySelector('.statistic-type').style.display = 'none';
    displayStatisticCustomer();
});



