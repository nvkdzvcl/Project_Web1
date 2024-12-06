// Lắng nghe sự kiện hiển thị sản phẩm
document.querySelector('.view-product').addEventListener('click', () => {
    document.querySelector('.product-content').style.display = 'flex';
    document.querySelector('.order-content').style.display = 'none';
    document.querySelector('.statistic-content').style.display = 'none';
    document.querySelector('.customer-content').style.display = 'none'; 
});

// Lấy danh sách sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Lưu sản phẩm vào localStorage
function saveToLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Render danh sách sản phẩm
function renderProductList(products) {
    const container = document.querySelector('.product-detail');
    container.innerHTML = '';  // Xóa content trước 

    products.forEach(product => {
        const productElement = document.createElement('tr');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" width="50"/></td>
            <td>${product.name}</td>
            <td>${product.type}</td>
            <td>${product.sizes.map(size => size.size).join(', ')}</td>
            <td>${product.sizes.map(size => size.price).join(', ')}</td>
            <td >
                <button onclick="openEditForm(${product.id})"><i class="fa-solid fa-pen-to-square btn-edit-delete"></i> &nbsp;Edit </button>
                <button onclick="deleteProduct(${product.id} )"><i class="fa-solid fa-delete-left btn-edit-delete"></i> &nbsp;Delete</button>
            </td>
        `;
        container.appendChild(productElement);
    });
}

// Xử lý khi xóa sản phẩm
function deleteProduct(productId) {
    const confirmation = confirm("Bạn có muốn xóa sản phẩm này không ?");
    if (confirmation) {
        let products = getProducts();  // Lấy danh sách sản phẩm hiện tại
        products = products.filter(product => product.id !== productId);  // Xóa sản phẩm có ID trùng với productId
        saveToLocalStorage(products);  // Lưu lại danh sách sản phẩm mới vào LocalStorage
        alert("Sản phẩm đã bị xóa");  // Hiển thị thông báo đã xóa sản phẩm
        renderProductList(products);  // Render lại danh sách sản phẩm

        // Gọi paginate để cập nhật phân trang sau khi xóa sản phẩm
         paginate(products).reload();  // Gọi hàm phân trang với danh sách sản phẩm mới
    } else {
        alert("Xóa sản phẩm đã bị hủy");  // Hiển thị thông báo nếu người dùng hủy xóa
    }
}




// Thêm sản phẩm mới
function handleAddProduct() {
    const name = document.getElementById('productname').value;
    const type = document.getElementById('Loai').value;
    const priceS = parseInt(document.getElementById('price-s-input').value, 10);
    const priceM = parseInt(document.getElementById('price-m-input').value, 10);
    const priceL = parseInt(document.getElementById('price-l-input').value, 10);

    // lấy value của mô tả 
    const describe = document.getElementById('thongtin').value;

    // Check nếu name trống không ?
    if (!name) {
        alert("Bạn chưa nhập tên sản phẩm.");
        document.getElementById('productname').focus();
        return;  // ngừng nếu ko có tên
    }

    // Check price có valid không 
    if (document.getElementById('size-s').checked && isNaN(priceS)) {
        alert("Vui lòng nhập giá trị hợp lệ cho size S.");
        document.getElementById('price-s-input').focus();
        return;
    }
    if (document.getElementById('size-m').checked && isNaN(priceM)) {
        alert("Vui lòng nhập giá trị hợp lệ cho  size M.");
        document.getElementById('price-m-input').focus();
        return;
    }
    if (document.getElementById('size-l').checked && isNaN(priceL)) {
        alert("Vui lòng nhập giá trị hợp lệ cho  size L.");
        document.getElementById('price-l-input').focus();
        return;
    }

    const imageFile = document.getElementById('productimage').files[0];
    let imageBase64 = '';

    // Check ảnh được chọn ko 
    if (!imageFile) {
        alert("Bạn chưa chọn ảnh. Ảnh sẽ được để ảnh mặc định.");
        imageBase64 = '/image/anhmacdinh.png';  // ảnh mặc định nếu ko có ảnh được chọn
    } else {
        const reader = new FileReader();
        reader.onloadend = function () {
            imageBase64 = reader.result; // This is the Base64 encoded string of the image
            alert("Sản phẩm đã được thêm");
            saveProduct(imageBase64); // gọi hàm save
        };
        reader.readAsDataURL(imageFile); // Dòng này sẽ kích hoạt hàm onloadend khi việc chuyển đổi hoàn tất
        return; // Dừng thực hiện sớm để ngừng tiến trình cho đến khi ảnh được xử lý
    }
   
    // If image is selected, proceed to save product
    saveProduct(imageBase64);
     alert("Sản phẩm đã được thêm");
    function saveProduct(image) {
        let products = getProducts();
        const lastProductId = products.length ? Math.max(...products.map(p => p.id)) : 0;
        const newProductId = lastProductId + 1;

        const selectedSizes = [];
        if (document.getElementById('size-s').checked) selectedSizes.push({ size: 'S', price: priceS });
        if (document.getElementById('size-m').checked) selectedSizes.push({ size: 'M', price: priceM });
        if (document.getElementById('size-l').checked) selectedSizes.push({ size: 'L', price: priceL });

        if (selectedSizes.length === 0) {
            alert("Chọn ít nhất 1 size.");
            return;
        }

        // Include the 'describe' field trong object mới
        const newProduct = { id: newProductId, name, type, sizes: selectedSizes, describe, image };

        products.push(newProduct);
        saveToLocalStorage(products);
        renderProductList(products);
        paginate(products).reload();
        clearForm();
    }
    function clearForm() {
        document.getElementById('productname').value = '';
        document.getElementById('Loai').value = '';
        document.getElementById('price-s-input').value = '';
        document.getElementById('price-m-input').value = '';
        document.getElementById('price-l-input').value = '';
        document.getElementById('thongtin').value = '';
        document.getElementById('size-s').checked = false;
        document.getElementById('size-m').checked = false;
        document.getElementById('size-l').checked = false;
        document.getElementById('productimage').value = '';
    }

   
}






// Hàm phân trang
let currentPage = 1;
const productsPerPage = 10;

function paginate(products) {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    renderProductList(currentProducts);
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
    return {
        reload: function() {
            paginate(products);  // Gọi lại paginate để cập nhật lại phân trang
        }
    };
}

// Hàm xử lý thay đổi trang khi nhấn vào nút "Prev" hoặc "Next"
function changePage(direction) {
    const products = getProducts();
    const totalPages = Math.ceil(products.length / productsPerPage);

    if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }

    paginate(products);
}
document.addEventListener('DOMContentLoaded', function (){
    document.getElementById('show-current').textContent=currentPage;
    document.getElementById('prev-page').addEventListener('click', () => document.getElementById('show-current').textContent=currentPage);
    document.getElementById('next-page').addEventListener('click', () => document.getElementById('show-current').textContent=currentPage);

    
});
// Lắng nghe sự kiện phân trang
document.getElementById('prev-page').addEventListener('click', () => changePage('prev'));
document.getElementById('next-page').addEventListener('click', () => changePage('next'));

// Ban đầu, hiển thị trang đầu tiên với danh sách tất cả sản phẩm
paginate(getProducts());

// Hàm để mở modal chỉnh sửa khi nhấn nút "Delete"
function updateProduct() {
    const productId = parseInt(document.getElementById('editProductId').value, 10);
    const name = document.getElementById('editProductName').value;
    const sizeElements = document.querySelectorAll('.editProductSize');  // Get all size fields
    const priceElements = document.querySelectorAll('.editProductPrice');  // Get all price fields
    const imageFile = document.getElementById('editProductImage').files[0];

    // Lấy value of 'thongtin' field (description)
    const describe = document.getElementById('thongtin-update').value; 

    
    const sizes = [];
    for (let i = 0; i < sizeElements.length; i++) {
        const size = sizeElements[i].value;
        const price = parseFloat(priceElements[i].value);
        if (!size || isNaN(price)) {
            alert("Vui lòng nhập đầy đủ thông tin size và giá.");
            sizeElements[i].focus();
            return;
        }
        sizes.push({ size, price });
    }

    if (!name) {
        alert("Vui lòng nhập tên")
        document.getElementById('editProductName').focus();
        return;  // Focus vào trường tên sản phẩm nếu thiếu
    } else if (sizes.length === 0) {
        addSizeField();
        alert("Vui lòng nhập size và giá");
        document.querySelector('.editProductSize').focus();
        return;  // Focus vào size đầu tiên nếu không có size
    } else if (!describe) {
        alert("Vui lòng nhập mô tả")
        document.getElementById('thongtin-update').focus();
        return;  // Focus vào trường mô tả nếu thiếu
    }

    // Lấy danh sách sản phẩm từ localStorage
    let products = getProducts();
    
    // Tìm sản phẩm theo ID và cập nhật thông tin
    let product = products.find(p => p.id === productId);
    
    if (product) {
        product.name = name;
        product.sizes = sizes; // Cập nhật lại thông tin size và giá
        product.describe = describe; // Lưu thông tin mô tả

        // Cập nhật ảnh nếu có
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = function () {
                const imageBase64 = reader.result; // Base64 encoded image string
                product.image = imageBase64; // Update the product image without changing the path
                alert(" Sản phẩm đã được chỉnh sửa");
                // Save the updated product list to localStorage
                saveToLocalStorage(products);
                renderProductList(products); // Render the updated product list
                closeModal(); // Close modal after update
            };
            reader.readAsDataURL(imageFile); // Convert the image file to Base64
        } else {
            alert(" Sản phẩm đã được chỉnh sửa");
            // If no image is selected, simply save the updated product without changing the image
            saveToLocalStorage(products);
            renderProductList(products); // Render the updated product list
            closeModal(); // Close modal after update
        }
    } else {
        alert("Không tìm thấy sản phẩm.");
    }
}

// Hàm mở modal chỉnh sửa
function openEditForm(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Điền dữ liệu vào form
        document.getElementById('editProductName').value = product.name;
        
        // Clear existing size field - xóa trường size đang tồn tại 
        const sizeContainer = document.getElementById('size-fields-container');
        sizeContainer.innerHTML = '';  // Clear size field trước đó

        // Add size fields dynamically based on product size - thêm size động 
        product.sizes.forEach((sizeInfo, index) => {
            const sizeField = document.createElement('div');
            sizeField.classList.add('size-field');
            sizeField.innerHTML = `
                <input type="text" class="editProductSize" value="${sizeInfo.size}" placeholder="Size" />
                <input type="number" class="editProductPrice" value="${sizeInfo.price}" placeholder="Price" />
                <button type="button" onclick="removeSizeField(this)">Remove</button>
            `;
            sizeContainer.appendChild(sizeField);
        });

        // Set ảnh mặc định nếu có
        document.getElementById('editProductImage').value = ''; // reset input file
        // Lưu ID sản phẩm để cập nhật sau
        document.getElementById('editProductId').value = product.id;
        document.getElementById('thongtin-update').value = product.describe || '';
        // Hiển thị modal
        document.getElementById('editModal').style.display = "block";
    } else {
        alert("Sản phẩm không tìm thấy.");
    }
}

// Hàm để thêm một trường size mới vào form
function addSizeField() {
    const sizeContainer = document.getElementById('size-fields-container');
    const sizeField = document.createElement('div');
    sizeField.classList.add('size-field');
    sizeField.innerHTML = `
        <input type="text" class="editProductSize" placeholder="Size" />
        <input type="number" class="editProductPrice" placeholder="Price" />
        <button type="button" onclick="removeSizeField(this)">Remove</button>
    `;
    sizeContainer.appendChild(sizeField);
}

// Hàm để xóa một trường size
function removeSizeField(button) {
    button.parentElement.remove();
}

// Hàm lấy thông tin sản phẩm theo ID (sử dụng ví dụ hoặc gọi API thực tế)
function getProductById(productId) {
    // Ở đây chúng ta sẽ giả lập một sản phẩm. Bạn có thể thay đổi để lấy từ cơ sở dữ liệu hoặc API thực tế.
    return {
        id: productId,
        name: "Sản phẩm ví dụ",
        size: "M",
        price: "100"
    };
}
// Hàm cập nhật thông tin sản phẩm
function closeModal() {
    document.getElementById('editModal').style.display = "none";
}
function handleFileSelect(event) {
    const file = event.target.files[0];  // Get the first selected file- lấy file từ input file
    if (file) {
        const reader = new FileReader();  // Create a FileReader to read the file- tạo biến file reader
        
        // Once the file is read, update the image source- nếu file đã được đọc , cập nhật img source
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;  // Set the src attribute of the image 
        };

        // Read the file as a data URL (base64)
        reader.readAsDataURL(file);
    }
}

// Add event listener for the input element
document.getElementById('editProductImage').addEventListener('change', handleFileSelect);
// Add event listener for the input element


// ----------------------------------------------------------------------------------
function handleImageSelect(event) {
    const file = event.target.files[0];  // Lấy tệp hình ảnh đầu tiên người dùng chọn

    if (file) {
        const reader = new FileReader();  // Tạo đối tượng FileReader để đọc tệp

        reader.onload = function(e) {
            document.getElementById('add-image').src = e.target.result;  // Update the image source
        };

        // Đọc tệp hình ảnh dưới dạng URL dữ liệu (Base64)
        reader.readAsDataURL(file);
    }
}


document.getElementById('productimage').addEventListener('change', handleImageSelect);

