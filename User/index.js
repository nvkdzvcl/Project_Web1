// Format tiền Việt
function formatCurrencyVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#navbar li a');

let currentPage = 1;
const productsPerPage = 8;
let currentCategory = 'Tất cả'; // Mặc định là hiển thị tất cả sản phẩm

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Thêm sự kiện click cho các liên kết trong header
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định

        // Xóa lớp 'active' khỏi tất cả liên kết
        navLinks.forEach(nav => nav.classList.remove('active'));

        // Thêm lớp 'active' cho liên kết được nhấn
        link.classList.add('active');

        switch(link.textContent) {
            case 'Tất cả':
            case 'MilkTea':
            case 'FreshFruitTea':
            case 'Ice':
                document.querySelector('#product1').scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Cập nhật danh mục hiện tại
                currentCategory = link.textContent.trim();
                break;
        }

        // Quay lại trang đầu tiên khi chuyển danh mục
        currentPage = 1;

        // Hiển thị sản phẩm theo danh mục và trang
        displayProducts(currentPage);
    });
});


// Lấy các phần tử thanh tìm kiếm
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const applyButton = document.getElementById('apply-button');
const categorySelect = document.getElementById('category');


//Lắng nghe sự kiện thay đổi danh mục
categorySelect.addEventListener('change', () => {
    currentCategory = categorySelect.value;
});

// Hàm để hiển thị sản phẩm
function displayProducts(page) {
    // Lấy dữ liệu danh sách sản phẩm từ localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(pro => pro.isDelete !== true);
    
    // Lọc sản phẩm theo danh mục
    if (currentCategory !== 'Tất cả') {
        //tạo mảng mới chứa các phần tử theo danh mục
        products = products.filter(p => p.type === currentCategory);
    }

    //Lọc sản phẩm theo từ khóa tìm kiếm
    const query = searchInput.value.trim().toLowerCase();
    // console.log(query);
    // Nếu có từ khóa tìm kiếm, lọc theo tên sản phẩm
    if (query !== '') {
        products = products.filter(p => p.name.toLowerCase().includes(query));
    }

    let filteredProducts = [...products]; // sao chép mảng sản phẩm gốc
    //Lọc sản phẩm theo phân loại
    

    // Nếu áp dụng bộ lọc giá, lọc theo khoảng giá
    const minPrice = parseInt(minPriceInput.value) || 0;
    const maxPrice = parseInt(maxPriceInput.value) || Infinity;

    filteredProducts = filteredProducts.filter(p => {
        p.sizes = p.sizes.filter(pSize => {
            const price = pSize.price;
            if(!maxPrice) {
                return price >= minPrice;
            }
            
            return price >= minPrice && price <= maxPrice;
        });
        return p.sizes.length > 0;
    });
    console.log(filteredProducts);

    // Tính toán chỉ mục bắt đầu và kết thúc
    const start = (page - 1) * productsPerPage;
    const end = Math.min(start + productsPerPage, filteredProducts.length);

    // Hiển thị sản phẩm trong phạm vi trang hiện tại
    const productContainer = document.querySelector('.pro-container');
    productContainer.innerHTML = '';

    for (let i = start; i < end; i++) {
        productContainer.innerHTML += `
            <div class="pro" data-category="${filteredProducts[i].type}" onclick="showProductModal(${filteredProducts[i].id})">
                <img src="${filteredProducts[i].image}" alt="">
                <div class="des">
                    <span>${filteredProducts[i].type}</span>
                    <h5>${filteredProducts[i].name}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>${formatCurrencyVND(filteredProducts[i].sizes[0].price)}</h4>
                </div>
                <a><i class="fa-solid fa-cart-shopping cart"></i></a>
            </div>
        `;
    }

    // Cập nhật phân trang
    updatePagination(filteredProducts.length);
}

// Lắng nghe sự kiện thay đổi trên ô tìm kiếm (search-input)
searchInput.addEventListener('input', function() {
    displayProducts(1);
});

// Lắng nghe sự kiện nhấn nút "Search" để chỉ lọc theo tên sản phẩm
searchButton.addEventListener('click', function() {
    displayProducts(1);
    document.querySelector('#search-suggestions').style.display = 'none';
    document.querySelector('#product1').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Lắng nghe sự kiện nhấn nút "Áp dụng" để lọc theo giá
applyButton.addEventListener('click', function() {
    displayProducts(1);
    document.querySelector('#product1').scrollIntoView({ behavior: 'smooth', block: 'start' });
});



// Hàm để cập nhật hiển thị phân trang
function updatePagination(totalProducts) {
    const pagination = document.querySelector('#pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('button');
        pageLink.textContent = i;
        pageLink.onclick = function () {
            currentPage = i;
            displayProducts(currentPage);
            return false;
        };

        // Thêm class 'active' cho trang hiện tại
        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        pagination.appendChild(pageLink);
    }
}

function showProductModal(productId) {
    let products = JSON.parse(localStorage.getItem('products'));
    products = products.filter(pro => pro.isDelete !== true);

    let product = products.find(p => p.id === productId);

    const productDetail = document.querySelector('.product-details');
    productDetail.innerHTML = '';

    const pImg = document.createElement('div');
    pImg.classList.add('product-image');
    pImg.innerHTML = `<img id="modalProductImage" src="${product.image}" alt="Product Image">`;

    productDetail.appendChild(pImg);

    

    let productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    // console.log("hello world");
    productInfo.innerHTML = `
        <h3 id="modalProductName">${product.name}</h3>
        <!-- Mô tả sản phẩm -->
        <i class="no-copy">${product.describe}</i>
        <!-- Số lượng sản phẩm -->

        <label for="quantity">Quantity:</label>
        <div id="quantityWrapper">
            <input type="number" id="modalProductQuantity" value="1" min="1">
        </div>
        <!-- Kích thước sản phẩm -->
        <label for="size">Size:</label>
    `;

    let modalProductSize = document.createElement('select');
    modalProductSize.id = 'modalProductSize';
    product.sizes.forEach(pSize => {
        let opt = document.createElement('option');
        opt.value = pSize.size;
        opt.textContent = `${pSize.size} - ${formatCurrencyVND(pSize.price)}`;
        modalProductSize.appendChild(opt);
    });
    productInfo.appendChild(modalProductSize);

    const btn = document.createElement('button');
    btn.id = 'addToCartBtn';
    btn.classList.add('btn', 'btn--primary');
    btn.textContent = 'Add to Cart';
    productInfo.appendChild(btn);

    productDetail.appendChild(productInfo);
    const productModal = document.getElementById('productModal');
    productModal.style.display = 'flex';

    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.onclick = function() {
        // const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || false;
        // if (!loggedInUser) {
        //     alert('Bạn cần phải đăng nhập');
        //     return;
        // }

        const carts = JSON.parse(localStorage.getItem('carts')) || [];


        const sle = document.querySelector('#modalProductSize');
        let price = 0;
        let pSize = product.sizes.find(pSize => pSize.size === sle.value);

        const qua = document.querySelector('#modalProductQuantity');

        const existingItemIndex = carts.findIndex(
            item => item.productId === productId && item.size === sle.value
        );

        if (existingItemIndex >= 0) {
            carts[existingItemIndex].quantity += parseInt(qua.value);
        } else {
            carts.push({
                productId: productId,
                name: product.name,
                size: sle.value,
                price: pSize.price,
                quantity: parseInt(qua.value),
                image: product.image
            });
        }
        

        localStorage.setItem('carts', JSON.stringify(carts));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        productModal.style.display = 'none';
    }
}

const addToCartBtn = document.getElementById('addToCartBtn');
    // hàm thêm sản phẩm vào giỏ hàng


// Khởi tạo hiển thị lần đầu
displayProducts(currentPage);


// Cho phép tìm kiếm bằng phím Enter
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

// Lấy các phần tử liên quan
const searchSuggestions = document.getElementById('search-suggestions');

// Hàm để hiển thị gợi ý tìm kiếm
function showSuggestions(query) {
    const suggestions = [];
    const lowercaseQuery = query.toLowerCase();

    let products = JSON.parse(localStorage.getItem('products'));
    products = products.filter(pro => pro.isDelete !== true);

    // Tìm các sản phẩm phù hợp với từ khóa
    products.forEach(product => {
        if (product.name.toLowerCase().includes(lowercaseQuery)) {
            suggestions.push(product.name);
        }
    });

    // Xóa nội dung cũ
    
    searchSuggestions.innerHTML = '';

    if (suggestions.length > 0) {
        // Hiển thị danh sách gợi ý
        suggestions.forEach(item => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestions-item');
            suggestionItem.textContent = item;

            // Thêm sự kiện click vào từng gợi ý
            suggestionItem.addEventListener('click', () => {
                searchInput.value = item; // Gán gợi ý vào ô tìm kiếm
                searchButton.click(); // Thực hiện tìm kiếm
                searchSuggestions.style.display = 'none'; // Ẩn gợi ý
            });

            searchSuggestions.appendChild(suggestionItem);
        });

        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none'; // Ẩn gợi ý nếu không có kết quả
    }
}

// Sự kiện khi nhập vào ô tìm kiếm
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        showSuggestions(query); // Hiển thị gợi ý nếu có từ khóa
    } else {
        searchSuggestions.style.display = 'none'; // Ẩn gợi ý nếu ô tìm kiếm trống
    }
});

// Ẩn gợi ý khi nhấn bên ngoài
const searchBar = document.getElementById('search-bar');
document.addEventListener('click', (event) => {
    if (searchBar && !searchBar.contains(event.target)) {
        searchSuggestions.style.display = 'none';
    }
});


//  js cho form đăng nhập đăng ký
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Đọc trạng thái từ localStorage
if (loggedInUser) {
    document.getElementById('loginLink').innerText = loggedInUser.username; // Hiển thị tên người dùng
    document.getElementById('login-item').classList.add('logged-in'); // Thêm class logged-in
}

// Hiển thị form đăng nhập
document.getElementById('loginLink').addEventListener('click', () => {
    if(!loggedInUser){
        document.querySelector('.modal').style.display = 'flex';
        document.querySelector('.login').style.display = 'block';
        document.querySelector('.register').style.display = 'none';
    }
});


// Ẩn modal
document.querySelectorAll('.auth-form_controls-back').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
    });
});

// Chuyển đổi giữa form đăng nhập và đăng ký
document.querySelector('.auth-form__switch-btn1').addEventListener('click', () => {
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
});

document.querySelector('.auth-form__switch-btn2').addEventListener('click', () => {
    document.querySelector('.register').style.display = 'block';
    document.querySelector('.login').style.display = 'none';
});

// Ẩn modal khi nhấn ra ngoài form
document.querySelector('.modal__overlay').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

// Xử lý đăng nhập
document.querySelector('.btn--primary2').addEventListener('click', () => {
    let usernameInput = document.querySelector('.login .name'); 
    let passwordInput = document.querySelector('.login .pass');
    let username = usernameInput.value.trim(); 
    let password = passwordInput.value.trim();

    if (!username) {
        alert("Vui lòng nhập tên đăng nhập");
        usernameInput.focus();
        return;
    } else if (!password) {
        alert("Vui lòng nhập mật khẩu");
        passwordInput.focus();
        return;
    }

    // Lấy dữ liệu customers từ localStorage
    let customers = JSON.parse(localStorage.getItem('customers')) || [];

    // Tìm kiếm tài khoản có username và password trùng khớp
    let customer = customers.find(cust => cust.username === username && cust.password === password);

    if (customer) {
        // Kiểm tra khóa người dùng
        if(customer.status === 'false') {
            alert('Người dùng này đã bị khóa!');
            return;
        }

        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('loggedInUser', JSON.stringify({ username: customer.username }));

        // Thay đổi nội dung phần hiển thị đăng nhập thành username của người dùng
        document.getElementById('loginLink').innerText = customer.username;
        document.querySelector('.modal').style.display = 'none';

        // Thêm class 'logged-in' vào phần tử khi đăng nhập thành công
        document.getElementById('login-item').classList.add('logged-in');

        // Xóa nội dung trong ô nhập liệu sau khi đăng nhập thành công
        usernameInput.value = "";
        passwordInput.value = "";

        alert('Đăng nhập thành công.');
        location.reload();

    } else {
        alert("Tài khoản hoặc mật khẩu không chính xác.");
    }

});


// Xử lý đăng ký
document.querySelector('.btn--primary1').addEventListener('click', () => {
    // Lấy các ô nhập liệu từ form đăng ký
    let usernameInput = document.querySelector('.register .name');
    let passwordInput = document.querySelector('.register .pass');
    let confirmPasswordInput = document.querySelector('.register .pass2');
    let emailInput = document.querySelector('.register .email');
    let phoneInput = document.querySelector('.register .phone');
    let fullnameInput = document.querySelector('.register .fullname');

    // Lấy giá trị từ các ô nhập liệu
    let username = usernameInput.value.trim();
    let password = passwordInput.value.trim();
    let confirmPassword = confirmPasswordInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();
    let fullname = fullnameInput.value.trim();

    // Kiểm tra các trường nhập liệu không được để trống
    // if (!username || !password || !confirmPassword || !email || !phone) {
    //     alert("Vui lòng nhập đầy đủ thông tin");
    //     return;
    // }
    if (!username) {
        alert("Vui lòng điền tên đăng nhập");
        usernameInput.focus();
        return;
    } else if (!password) {
        alert("Vui lòng nhập mật khẩu");
        passwordInput.focus();
        return;
    } else if (!confirmPassword) {
        alert("Vui lòng nhập ô xác nhận lại mật khẩu")
        confirmPasswordInput.focus();
        return;
    } else if (!fullname) {
        alert("Vui lòng nhập họ và tên");
        fullnameInput.focus();
        return;
    } else if (!email) {
        alert("Vui lòng nhập email")
        emailInput.focus();
        return;
    } else if (!phone) {
        alert("Vui lòng nhập số điện thoại")
        phoneInput.focus();
        return;
    }

    // Lấy dữ liệu customers từ localStorage
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    
    // Kiểm tra user xem hợp lệ
    const regex_username = /^[a-zA-Z0-9._]{3,20}$/;
    if (!regex_username.test(username)) {
        alert("Tên người dùng chỉ được phép chứa kí tự chữ cái và số, độ dài từ 3-20 kí tự, vui lòng chọn tên khác !");
        return;
    }
    // Kiểm tra xem username đã tồn tại chưa
    let existingCustomer = customers.find(cust => cust.username === username);
    if (existingCustomer) {
        alert("Tên người dùng đã tồn tại, vui lòng chọn tên khác");
        usernameInput.focus();
        return;
    }

    // Kiểm tra mật khẩu xác nhận có khớp với mật khẩu không
    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp");
        confirmPasswordInput.focus();
        return;
    }

    //Kiểm tra email hợp lệ
    const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex_email.test(email)) {
        alert("Sai cấu trúc email, vui lòng nhập lại !");
        emailInput.focus();
        return;
    }
    
    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^0\d{9,10}$/;
    if (!phonePattern.test(phone)) {
        alert("Số điện thoại không hợp lệ. Vui lòng bắt đầu bằng 0 và chỉ chứa 10 hoặc 11 chữ số.");
        phoneInput.focus();
        return;
    }

    // Thêm tài khoản mới vào mảng customers
    customers.push({
        id: customers.length > 0 ? customers[customers.length - 1].id + 1 : 1, // Tự động tăng ID
        username: username,
        password: password,
        status: 'true',
        role: 'customer'
    });

    // Lưu dữ liệu mới vào localStorage
    localStorage.setItem('customers', JSON.stringify(customers));

    // Xóa nội dung các ô nhập liệu sau khi đăng ký thành công
    usernameInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
    fullnameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    let address = JSON.parse(localStorage.getItem('address'));
    // Thêm dữ liệu vào address.js
    address.push({
        customerId: customers[customers.length - 1].id,
        fullname: fullname,
        email: email,
        phone: phone,
        province: '',
        district: '',
        ward: '',
        street: '',
    })

    localStorage.setItem('address', JSON.stringify(address));


    alert("Đăng ký thành công");
});


// Xử lý đăng xuất

document.getElementById('logoutButton').addEventListener('click', () => { 
    
    document.getElementById('loginLink').innerText = 'Đăng nhập';
    document.getElementById('login-item').classList.remove('logged-in');
    localStorage.setItem('loggedInUser', JSON.stringify(false));
    localStorage.removeItem('carts');
    location.reload();
});



//Hàm lấy id của khách hàng đang đăng nhập hiện tại
function getCustomerId() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || false;
    if(loggedInUser) {
        const customers = JSON.parse(localStorage.getItem('customers'));
        let cus = customers.find(c => c.username === loggedInUser.username);
        return cus.id;
    }
    return null;
}


const a = JSON.parse(localStorage.getItem('address'));
let a1 = a.find(a => a.customerId === getCustomerId());


//  Giỏ hàng 

// Mở giỏ hàng
document.getElementById('lg-bag').addEventListener('click', () => {
    document.getElementById('shopping-cart').style.display = 'initial';
    let customerId = getCustomerId();
    if(customerId) {
        displayOrders(customerId);
    }
});

// Đóng giỏ hàng
document.getElementById('cart-back').addEventListener('click', () =>{
    document.getElementById('shopping-cart').style.display = 'none';
    location.reload();
})


//mô tả sản phẩm
// Get modal elements
document.addEventListener('DOMContentLoaded', () => {


    // hàm đóng modal
    const closeProductModal = document.getElementById('closeProductModal');
    closeProductModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // đăng xuất
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('accounts');
        document.getElementById('loginLink').innerText = 'Đăng nhập';
        document.getElementById('login-item').classList.remove('logged-in');
        islogin = false;
    });

    // hiển thị / ẩn giỏ hàng
    document.getElementById('lg-bag').addEventListener('click', () => {
        document.getElementById('shopping-cart').style.display = 'block';
        populateCart(); // cập nhật items
    });

    document.getElementById('cart-back').addEventListener('click', () => {
        document.getElementById('shopping-cart').style.display = 'none';
    });

    // thêm sản phẩm vào giỏ hàng
    function populateCart() {
        const carts = JSON.parse(localStorage.getItem('carts')) || [];
        const cartTable = document.querySelector('#cart tbody');
        cartTable.innerHTML = ''; // xóa các items tồn tại

        carts.forEach((item, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><a href="#" class="remove-item" data-index="${index}"><i class="fa-regular fa-circle-xmark"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${formatCurrencyVND(item.price)}</td>
                <td>${item.size}</td>
                <td>
                <button class="decrease-qty" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase-qty" data-index="${index}">+</button>
                </td>
                <td>${formatCurrencyVND(item.price * item.quantity)}</td>
            `;

            cartTable.appendChild(row);
        });

        // Thêm sự kiện tăng/giảm số lượng
        document.querySelectorAll('.increase-qty').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                carts[index].quantity++;
                localStorage.setItem('carts', JSON.stringify(carts));
                populateCart();
                updateCartTotals();
            });
        });

        document.querySelectorAll('.decrease-qty').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                if (carts[index].quantity > 1) {
                    carts[index].quantity--;
                    localStorage.setItem('carts', JSON.stringify(carts));
                    populateCart();
                    updateCartTotals();
                }
            });
        });


        // Thêm sự kiện loại bỏ sản phẩm
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const index = button.dataset.index;
                carts.splice(index, 1); // Loại bỏ sản phẩm khỏi giỏ hàng
                localStorage.setItem('carts', JSON.stringify(carts));
                populateCart(); // Làm mới hiển thị giỏ hàng
                updateCartTotals(); // Cập nhật tổng tiền
            });
        });

        updateCartTotals(); // Cập nhật tổng phụ và tổng tiền
    }
});

// Hàm tính toán và cập nhật tổng phụ và tổng tiền trong giỏ hàng
function updateCartTotals() {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    let subtotal = 0;

    carts.forEach(item => {
        subtotal += item.price * item.quantity; // Giá x số lượng
    });

    document.getElementById('cartSubtotal').textContent = `${formatCurrencyVND(subtotal)}`;
    document.getElementById('cartTotal').textContent = `${formatCurrencyVND(subtotal)}`;
}





// Thanh toán


// Mở khung thanh toán
document.getElementById('payButton').addEventListener('click', () => {
    const shippingModal = document.querySelector('.ship-modal');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || false;
    if(!loggedInUser) {
        alert('Vui lòng đăng nhập để mua hàng!');
        location.reload();
        return;
    }

    // Lấy thông tin khách hàng
    let customerId = getCustomerId();

    let address = JSON.parse(localStorage.getItem('address'));
    let add = address.find(a => a.customerId === customerId);

    // Thông tin các ô input
    const customerName = document.getElementById('customerName');
    const customerEmail = document.getElementById('customerEmail');
    const customerPhone = document.getElementById('customerPhone');
    const customerAddress = document.getElementById('customerAddress');
    const province = document.getElementById('province-dropdown');
    const district = document.getElementById('district-dropdown');
    const ward = document.getElementById('ward-dropdown');


    // Nếu tài khoản khách hàng chưa có địa chỉ cũ thì không hiện thao tác chọn
    if(!add.province || !add.street) {
        document.querySelector('.address-options').style.display = 'none';
    }
    
    if(add) {
        add.fullname && (customerName.value = add.fullname);
        add.email && (customerEmail.value = add.email);
        add.phone && (customerPhone.value = add.phone);
    }

    // Thêm sự kiện cho nút địa chỉ mới
    const newAddressCheckbox = document.getElementById('new-address-radio');
    newAddressCheckbox.addEventListener('change', () => {
        if(add) {
            if (newAddressCheckbox.checked) {
                customerAddress.value = '';
                province.value = '';
                district.value = '';
                ward.value = '';
            }
        }
    });

    // Thêm sự kiện cho nút địa chỉ cũ
    const oldAddressCheckbox = document.getElementById('old-address-radio');
    oldAddressCheckbox.addEventListener('change', () => {
        if (oldAddressCheckbox.checked) {
            if(add) {
                // Truyền thông tin địa chỉ có sẵn (nếu có)
                add.province && (province.value = add.province);
                add.street && (customerAddress.value = add.street);
                
                const districtDropdown = document.getElementById('district-dropdown'); // Thay ID phù hợp
                const wardDropdown = document.getElementById('ward-dropdown'); // Thay ID phù hợp

                if(add.district && add.ward) {
                    district.value = add.district;
                    // Lấy danh sách phường theo quận đã lưu
                    const wards = wardsByDistrict[add.district] || [];
                    wardDropdown.innerHTML = '<option value="">Chọn Phường / Xã</option>';
                    wards.forEach(ward => {
                        const option = document.createElement('option');
                        option.value = ward;
                        option.textContent = ward;
                        wardDropdown.appendChild(option);
                    });

                    // Thiết lập phường đã lưu
                    ward.value = add.ward;
                }

            }
        }
    });
    if(document.querySelector('#paymentSelect').value === 'card') {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        console.log('Cards: ' + cards);
        if(cards.length > 0) {
            let card = cards.find(card => card.customerId === getCustomerId());
            if(card) {
                document.querySelector('#cardholder-name').value = card.cardName;
                document.querySelector('#card-number').value = card.cardNumber;
                document.querySelector('#expiry-date').value = card.expiryDate;
                document.querySelector('#cvv').value = card.cvv;

            }
        }
        document.querySelector('.wrap-card-form').style.display = 'block';
    }
    else {
        shippingModal.style.display = 'flex';
    }
});

// đóng khu thanh toán
document.querySelector('.ship-modal__overlay').addEventListener('click', () => {
    const shippingModal = document.querySelector('.ship-modal');
    shippingModal.style.display = 'none'; 
});

document.querySelector('.btn-cart.back').addEventListener('click', () => {
    const shippingModal = document.querySelector('.ship-modal');
    shippingModal.style.display = 'none'; 
    location.reload();
});



document.querySelector('.btn-cart.btn--primary1').addEventListener('click', () => {
    const cartTableBody = document.querySelector('#cart tbody');

    // Kiểm tra giỏ hàng trống
    if (cartTableBody.rows.length === 0) {
        alert("Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
    }

    // kiểm tra nhập vào
    const customerName = document.getElementById('customerName');
    const customerPhone = document.getElementById('customerPhone');
    const customerEmail = document.getElementById('customerEmail');
    const customerAddress = document.getElementById('customerAddress');
    const province = document.getElementById('province-dropdown');
    const district = document.getElementById('district-dropdown');
    const ward = document.getElementById('ward-dropdown');

    if (!customerName.value) {
        alert("Vui lòng nhập họ và tên.");
        customerName.focus();
        return;
    }else if (!customerPhone.value) {
        alert('Vui lòng nhập số điện thoại.');
        customerPhone.focus();
        return;
    }else if(!customerEmail.value) {
        alert('Vui lòng nhập địa chỉ email.')
        customerEmail.focus();
        return;
    }else if(!customerAddress.value) {
        alert('Vui lòng nhập số nhà, tên đường.')
        customerAddress.focus();
        return;
    }else if(!province.value) {
        alert('Vui lòng nhập tỉnh.');
        province.focus();
        return;
    }else if(!district.value) {
        alert('Vui lòng nhập quận/huyện.');
        province.focus();
        return;
    }else if(!ward.value) {
        alert('Vui lòng nhập phường/xã.');
        ward.focus();
        return;
    }
    

    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^[0-9]{10,11}$/;
    if (!phonePattern.test(customerPhone.value.trim())) {
        alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 hoặc 11 chữ số.");
        customerPhone.focus();
        return;
    }

    const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex_email.test(customerEmail.value.trim())) {
        alert("Sai cấu trúc email, vui lòng nhập lại !");
        customerEmail.focus();
        return;
    }

    // Lấy thông tin đẩy lên localStorage

    // lấy danh sách địa chỉ 
    let address = JSON.parse(localStorage.getItem('address')) || [];

    let add = address.find(add => add.customerId === getCustomerId());
    add.province = province.value;
    add.district =  district.value;
    add.ward = ward.value;
    add.street = customerAddress.value.trim();

    // Đẩy địa chỉ lên localStorage
    localStorage.setItem('address', JSON.stringify(address));

    // Lấy loại thanh toán từ select
    const paymentTypeElement = document.getElementById('paymentSelect');
    const paymentTypeValue = paymentTypeElement.value;

    // Đổi tên hiển thị loại thanh toán
    let paymentTypeText = '';
    switch(paymentTypeValue) {
        case 'cash': paymentTypeText = 'Tiền mặt'; break;
        case 'bank-transfer': paymentTypeText = 'Chuyển khoản'; break;
        case 'card' : paymentTypeText = 'Thẻ'; break;
    }

    // Lấy danh sách đơn hàng hiện tại từ localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    

    let customerId = getCustomerId();

    // Tạo đơn hàng mới
    const newOrder = {
        id: orders.length + 1,
        customerId: customerId,
        date: new Date().toISOString().split('T')[0],
        status: 'Chưa liên hệ',
        PaymentType: paymentTypeText,
        orderItems: []
    };

     // Lấy giỏ hàng từ localStorage
     const carts = JSON.parse(localStorage.getItem('carts')) || [];

    // Lấy thông tin và điền vào orderItems[]

    // Lặp qua từng sản phẩm đã thêm vào giỏ hàng
    carts.forEach(cart => {
        let orderItem = newOrder.orderItems.find(orderItem => orderItem.productId === cart.productId);
        // Kiểm tra tồn tại của sản phẩm (cart) trong đơn hàng hiện tại
        if(orderItem) { // Tồn tại
            // Kiểm tra size đã có hay chưa
            let sizeQuantity = orderItem.sizes.find(sq => sq.size === cart.size);
            if(sizeQuantity) {  // Nếu tồn tại
                //cập nhật só lượng
                sizeQuantity.quantity += cart.quantity;    
            } 
            else {  //Chưa tồn tại cart.size
                orderItem.sizes.push({
                    size: cart.size,
                    quantity: cart.quantity
                });
            }
        }
        else {  //Chưa tồn tại sản phẩm trong đơn hàng
            newOrder.orderItems.push({
                productId: cart.productId,
                sizes: [
                    {size: cart.size, quantity: cart.quantity}
                ]
            });
        }
    });

    // Thêm đơn hàng vào danh sách orders và cập nhật localStorage
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('carts', JSON.stringify([])); // Xóa giỏ hàng

    // Xóa giỏ hàng trên giao diện
    cartTableBody.innerHTML = '';

    // In ra danh sách các đơn hàng khách đã mua
    displayOrders(customerId);

    // Đóng modal và thông báo
    const shippingModal = document.querySelector('.ship-modal');
    shippingModal.style.display = 'none';
    alert("Thanh toán thành công!");
    document.getElementById('cartSubtotal').textContent = formatCurrencyVND(0);
    document.getElementById('cartTotal').textContent = formatCurrencyVND(0);
});

function displayOrders(customerId) {
    let orders = JSON.parse(localStorage.getItem('orders'));

    // Tìm các đơn hàng có mã khách hàng (customerId)
    orders = orders.filter(order => order.customerId === customerId) || [];
    
    if(orders.length > 0) {   // Khách hàng đã có đơn hàng
        //Sắp xếp đơn hàng theo ngày mới nhất
        orders.sort((a, b) => b.id - a.id);

        const orderList = document.querySelector('#orderList table tbody');
        orderList.innerHTML = '';

        orders.forEach(order => {

            //Tính tổng tiền
            const products = JSON.parse(localStorage.getItem('products'));
            let totalCost = 0;
            order.orderItems.forEach(orderItem => {
                let product = products.find(p => p.id === orderItem.productId);
                if(product) {
                    orderItem.sizes.forEach(oSize => {
                        let pSize = product.sizes.find(pSize => pSize.size === oSize.size);
                        if(pSize) {
                            totalCost += oSize.quantity * pSize.price;
                        }
                    });

                }
            });

            // Thêm đơn hàng vào orderList
            orderList.innerHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.date}</td>
                    <td>${order.status}</td>
                    <td>${order.PaymentType}</td>
                    <td>${formatCurrencyVND(totalCost)}</td>
                    <td class = "last-detail">
                        <button class="btn-show-order-detail" onclick = "showOrderDetail(${order.id})">Chi tiết</button>
                        <button class="btn-cancel-order" onclick = "cancelOrder(${order.id})" style="display: ${order.status === 'Chưa liên hệ' ? 'block' : 'none'}">Hủy</button>
                    </td>
                </tr>
            `;
        });

        
        document.querySelector('#orderList').style.display = 'block';
    }

    else {  // Khách hàng không có đơn
        document.querySelector('#orderList').style.display = 'none';
    }
}

// Hàm in ra chi tiết đơn hàng của khách
function showOrderDetail(orderId) {
    // Lấy các thông tin cần xử lý
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const address = JSON.parse(localStorage.getItem('address')) || [];

    // Tìm đúng đơn hàng với thông tin cần in
    order = orders.find(o => o.id === orderId);

    // Tạo đối tượng lưu dữ liệu của chi tiết đơn hàng
    let orderDetails = {
        customerId: order.customerId,
        date: order.date,
        PaymentType: order.PaymentType,
        prods: []
    };

    // Tính tổng tiền của tất cả sản phẩm
    let totalCost = 0;


    order.orderItems.forEach(orderItem => {
        let product = products.find(p => p.id === orderItem.productId);
        if(product) {
            // Mảng chứa size, số lượng và giá của 1 sản phẩm
            let sizes = [];
            orderItem.sizes.forEach(size => {
                let pSize = product.sizes.find(pSize => pSize.size === size.size);
                if(pSize) {
                    sizes.push({
                        size: pSize.size,
                        quantity: size.quantity,
                        price: pSize.price
                    });
                }
            });
            
            // Tính tổng tiền của 1 sản phẩm
            let prodCost = sizes.reduce((sum, size) => sum + size.price * size.quantity, 0);

            // Đẩy thông tin vào mảng các sản phẩm
            orderDetails.prods.push({
                productId: product.id,
                name: product.name,
                sizes: sizes,
                prodCost: prodCost
            });
            totalCost += prodCost;
        }
    });

    // lấy địa chỉ của khách hàng
    const add = address.find(a => a.customerId === order.customerId);

    // Lấy số thẻ của khách
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    let card = cards.find(card => card.customerId === getCustomerId());


    // Thêm html vào thẻ chứa nó
    // In ra chi tiet don hang
    // Header
    const orderHeader = document.querySelector('.order-header');
    orderHeader.innerHTML = `
        <h2>Chi tiết đơn hàng</h2>
        <p><strong>Mã đơn hàng:</strong> ${orderId}</p>
        <p><strong>Mã khách hàng:</strong> ${orderDetails.customerId}</p>
        <p><strong>Số điện thoại:</strong> ${add.phone}</p>
        <p><strong>Thời gian đặt:</strong> ${orderDetails.date}</p>
        <p><strong>Hình thức thanh toán:</strong> ${orderDetails.PaymentType}</p>
        <p style = "display: ${orderDetails.PaymentType === 'Thẻ' ? 'block' : 'none'}"><strong>Số thẻ: </strong>${card ? card.cardNumber : ''}</p>
        <p><strong>Địa chỉ:</strong> ${add ? add.street + ', ' + add.ward + ', ' + add.district + ', ' + add.province : 'Không tìm thấy địa chỉ'}</p>
        <button class="btn-close-order-detail" onclick = "closeOrderDetail()">+</button>
    `;

    // tbody
    const orderItemsBody = document.querySelector('#order-items-tbody');
    orderItemsBody.innerHTML = '';
    orderDetails.prods.forEach(prod => {
        let count = prod.sizes.length;
        let row = `
            <tr>
                <td rowspan="${count}">${prod.productId}</td>
                <td rowspan="${count}">${prod.name}</td>
                <td>${prod.sizes[0].size}</td>
                <td>${prod.sizes[0].quantity}</td>
                <td>${formatCurrencyVND(prod.sizes[0].price)}</td>
                <td rowspan="${count}">${formatCurrencyVND(prod.prodCost)}</td>
            </tr>
        `;
        for (let i = 1; i < count; i++) {
            row += `
                <tr>
                    <td>${prod.sizes[i].size}</td>
                    <td>${prod.sizes[i].quantity}</td>
                    <td>${formatCurrencyVND(prod.sizes[i].price)}</td>
                </tr>
            `;
        }
        orderItemsBody.innerHTML += row;
    });

     // tổng tiền
     const orderSummary = document.querySelector('.order-summary');
     orderSummary.innerHTML = '';
     orderSummary.innerHTML += `
         <p><strong>Tổng tiền:</strong> ${formatCurrencyVND(totalCost)}</p>
     `;
 
     // hiển thị chi tiết đơn hàng
    document.querySelector('.wrap-order-detail').style.display = 'block';
}

function cancelOrder(orderId) {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
        let orders = JSON.parse(localStorage.getItem('orders'));

        orders = orders.filter(order => order.id !== orderId);

        localStorage.setItem('orders', JSON.stringify(orders));

        displayOrders(getCustomerId());
    }
    
}

// Thêm sự kiện cho nút tắt chi tiết sản phẩm
function closeOrderDetail() {
    document.querySelector('.wrap-order-detail').style.display = 'none';
    
}

// Thanh toán thẻ
document.querySelector('.btn-submit').addEventListener('click', () => {
    // Lấy danh sách thẻ của người dùng
    let cards = JSON.parse(localStorage.getItem('cards')) || [];

    const cardName = document.querySelector('#cardholder-name').value.trim();
    const cardNumber = document.querySelector('#card-number').value.trim();
    const expiryDate = document.querySelector('#expiry-date').value.trim();
    const cvv = document.querySelector('#cvv').value.trim();
    let card = {
        customerId: getCustomerId(),
        cardName: cardName,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv
    }
    console.log(card);
    let ca = cards.find(ca => ca.customerId === getCustomerId());
    if(ca) {
        ca = card;
    }
    else {
        cards.push(card);
        localStorage.setItem('cards', JSON.stringify(cards));
    }
    alert('Đã nhập thông tin thẻ.');

    document.querySelector('.wrap-card-form').style.display = 'none';
    document.querySelector('.ship-modal').style.display = 'flex';


}); 

//Thêm sự kiện cho nút đóng thẻ
function closeCardForm() {
    document.querySelector('.wrap-card-form').style.display = 'none';
}



// Chọn địa chỉ
    // Map các phường theo quận
    const wardsByDistrict = {
        "Quận 1": ["Bến Thành","Bến Nghé","Đa Kao","Nguyễn Cư Trinh","Nguyễn Thái Bình","Tân Định","Cô Giang","Cầu Ông Lãnh","Phạm Ngũ Lão","Cầu Kho"],
        "Quận 2": ["An Lợi Đông","Thảo Điền", "Cát Lái","An Phú","Bình An","Bình Khánh","Bình Trưng Đông","Bình Trưng Tây","An Khánh","Thạnh Mỹ Lợi","Thủ Thiêm"],
        "Quận 3": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 9","Phường 10", "Phường 11","Phường 12","Phường 13","Phường 14","Võ Thị Sáu",],
        "Quận 4": ["Phường 1","Phường 2","Phường 3","Phường 4", "Phường 6","Phường 8","Phường 9","Phường 10","Phường 13","Phường 14","Phường 15","Phường 16","Phường 18",],
        "Quận 5": ["Phường 1","Phường 2","Phường 4","Phường 5","Phường 7","Phường 9","Phường 11","Phường 12","Phường 13","Phường 14"],
        "Quận 6": ["Phường 1","Phường 2","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13"],
        "Quận 7": ["Bình Thuận","Phú Mỹ","Phú Thuận","Tân Hưng","Tân Kiểng","Tân Phong","Tân Phú","Tân Quy","Tân Thuận Đông","Tân Thuận Tây"],
        "Quận 8": ["Xóm Củi","Hưng Phú","Bình An","Chánh Hưng","Rạch Ông"],
        "Quận 9": ["Hiệp Phú","Long Bình","Long Phước","Long Thạnh Mỹ","Long Trường","Phú Hữu","Phước Bình","Phước Long A","Phước Long B","Tân Phú","Tăng Nhơn Phú A","Tăng Nhơn Phú B","Trường Thạnh"],
        "Quận 10": ["Phường 1","Phường 2","Phường 4","Phường 6","Phường 8","Phường 9","Phường 10","Phường 12","Phường 13","Phường 14","Phường 15"],
        "Quận 11": ["Phường 1","Phường 3","Phường 5","Phường 7","Phường 8","Phường 10","Phường 11","Phường 14","Phường 15","Phường 16"],
        "Quận 12": ["An Phú Đông","Đông Hưng Thuận","Hiệp Thành","Tân Chánh Hiệp","Tân Hưng Thuận","Tân Thới Hiệp","Tân Thới Nhất","Thạnh Lộc","Thạnh Xuân","Thới An","Trung Mỹ Tây"],
        "Quận Tân Bình": ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15"],
        "Quận Bình Tân": ["An Lạc","An Lạc A","Tân Tạo","Tân Tạo A","Bình Trị Đông","Bình Trị Đông A","Bình Trị Đông B","Bình Hưng Hòa","Bình Hưng Hòa A"],
        "Quận Bình Thạnh": ["Phường 1","Phường 2","Phường 3","Phường 5","Phường 6","Phường 7","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15","Phường 17","Phường 19","Phường 21","Phường 22","Phường 24","Phường 25","Phường 26","Phường 27","Phường 28"],
        "Quận Gò Vấp": ["Phường 1","Phường 3","Phường 5","Phường 6","Phường 8","Phường 10","Phường 11","Phường 12","Phường 14","Phường 15","Phường 16","Phường 17"],
        "Quận Phú Nhuận": ["Phường 1","Phường 2","Phường 4","Phường 5","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 13","Phường 15",],
        "Huyện Bình Chánh": ["Thị trấn An Lạc","Xã Qui Đức","Xã Phong Phú","Xã Đa Phước","Xã Bình Hưng","Xã Hưng Long","Xã Tân Quý Tây","Xã An Phú Tây","Xã Bình Chánh","Xã Tân Túc","Xã Tân Nhựt","Xã Tân Kiên","Xã Tân Tạo","Xã Bình Trị Đông","Xã Bình Hưng Hòa","Xã Vĩnh Lộc A","Xã Vĩnh Lộc B","Xã Lê Minh Xuân","Xã Phạm Văn Hai","Xã Bình Lợi"],
        "Huyện Hóc Môn": ["Thị trấn Hóc Môn","Xã Đông Thạnh","Xã Bà Điểm","Xã Nhị Bình","Xã Tân Thới Nhì","Xã Tân Hiệp","Xã Tân Xuân","Xã Thới Tam Thôn","Xã Trung Chánh","Xã Xuân Thới Sơn","Xã Xuân Thới Thượng","Xã Xuân Thới Đông"],
        "Huyện Cần Giờ": ["Xã An Thới Đông","Xã Bình Khánh","Xã Cần Thạnh","Xã Long Hòa","Xã Lý Nhơn","Xã Tam Thôn Hiệp","Xã Thạnh An"],
        "Huyện Nhà Bè": ["Thị trấn Nhà Bè","Xã Phước Kiển","Xã Phước Lộc","Xã Nhơn Đức","Xã Phú Xuân","Xã Long Thới","Xã Hiệp Phước"]
    };

    // Lấy các phần tử dropdown
    // Xác định dropdown cho quận và phường
    const districtDropdown = document.getElementById('district-dropdown'); // Thay ID phù hợp
    const wardDropdown = document.getElementById('ward-dropdown'); // Thay ID phù hợp

    // Lắng nghe sự kiện thay đổi trên dropdown quận
    districtDropdown.addEventListener('change', () => {
        const selectedDistrict = districtDropdown.value; // Lấy giá trị quận được chọn
        const wards = wardsByDistrict[selectedDistrict] || []; // Lấy danh sách phường theo quận
        
        // Xóa các tùy chọn cũ
        wardDropdown.innerHTML = '<option value="">Chọn Phường / Xã</option>';
        
        // Thêm các tùy chọn mới
        wards.forEach(ward => {
            const option = document.createElement('option');
            option.value = ward;
            option.textContent = ward;
            wardDropdown.appendChild(option);
        });
    });

    districtDropdown.addEventListener('change', () => {
        const selectedDistrict = districtDropdown.value;
        console.log("Quận được chọn:", selectedDistrict);
        const wards = wardsByDistrict[selectedDistrict] || [];
        console.log("Danh sách phường:", wards);

        wardDropdown.innerHTML = '<option value="">Chọn Phường / Xã</option>';
        wards.forEach(ward => {
            const option = document.createElement('option');
            option.value = ward;
            option.textContent = ward;
            wardDropdown.appendChild(option);
        });
    });


// thông tin tài khoản 

//show
document.querySelector('.logged-in').addEventListener('click', (event) => {
    event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    const loginBox = document.getElementById('login-box');
    loginBox.style.display = 'flex';
});

// Ẩn khối login-box khi nhấn ra ngoài
document.addEventListener('click', (event) => {
    const loginBox = document.getElementById('login-box');
    if (!loginBox.contains(event.target) && event.target.id !== 'loginLink') {
        loginBox.style.display = 'none';
    }
});

// Ngăn việc ẩn khối login-box khi nhấn trong khối login-box
document.getElementById('login-box').addEventListener('click', (event) => {
    event.stopPropagation();
});

// Hiển thị thông tin tài khoản
document.getElementById('accoutFromBtn').addEventListener('click', (event) => {
    event.stopPropagation();

    if (loggedInUser) {
        document.getElementById('accountForm').style.display = 'block';
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('username').value = loggedInUser.username;
        const customer = JSON.parse(localStorage.getItem('address')).find(a => a.customerId === getCustomerId());
        if (customer) {
            document.getElementById('fullname').value = customer.fullname;
            document.getElementById('phone').value = customer.phone;
            document.getElementById('email').value = customer.email;
        }
    }
});

// Ẩn form khi nhấn ra ngoài
document.addEventListener('click', (event) => {
    const accountForm = document.getElementById('accountForm');
    if (!accountForm.contains(event.target) && !document.getElementById('loginLink').contains(event.target)) {
        accountForm.style.display = 'none';
    }
});

// Ngăn việc ẩn form khi nhấn trong form
document.getElementById('accountForm').addEventListener('click', (event) => {
    event.stopPropagation();
});

// Lưu thông tin đã chỉnh sửa
document.getElementById('saveButton').addEventListener('click', () => {
    let fullnameInput = document.getElementById('fullname');
    let phoneInput = document.getElementById('phone');
    let emailInput = document.getElementById('email');
    
    let fullname = fullnameInput.value.trim();
    let phone = phoneInput.value.trim();
    let email = emailInput.value.trim();

    if (!fullname) {
        alert("Vui lòng nhập họ và tên");
        fullnameInput.focus(); // focus đúng phần tử input
        return;
    } else if (!phone) {
        alert("Vui lòng nhập số điện thoại");
        phoneInput.focus(); // focus đúng phần tử input
        return;
    } else if (!email) {
        alert("Vui lòng nhập email");
        emailInput.focus(); // focus đúng phần tử input
        return;
    }


    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^0\d{9,10}$/;
    if (!phonePattern.test(phone)) {
        alert("Số điện thoại không hợp lệ. Vui lòng bắt đầu bằng 0 và chỉ chứa 10 hoặc 11 chữ số.");
        phoneInput.focus();
        return;
    }
    //Kiểm tra email hợp lệ
    const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex_email.test(email)) {
        alert("Sai cấu trúc email, vui lòng nhập lại !");
        emailInput.focus();
        return;
    }
    
    




    // Cập nhật thông tin trong localStorage
    let address = JSON.parse(localStorage.getItem('address'));
    let customer = address.find(a => a.customerId === getCustomerId());
    if (customer) {
        customer.fullname = fullname;
        customer.phone = phone;
        customer.email = email;
    }

    localStorage.setItem('address', JSON.stringify(address));
    alert("Cập nhật thông tin thành công");

    // Cập nhật thông tin trên giao diện
    document.getElementById('fullnameItem').textContent = 'Họ và tên: ' + fullname;
    document.getElementById('phoneItem').textContent = 'Phone: ' + phone;
    document.getElementById('emailItem').textContent = 'Email: ' + email;

    document.getElementById('accountForm').style.display = 'none';
});
