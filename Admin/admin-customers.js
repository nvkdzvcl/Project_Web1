document.querySelector('.view-customers').addEventListener('click',()=>{ 
    document.querySelector('.customer-content').style.display = 'flex'; 
    document.querySelector('.order-content').style.display = 'none';
    document.querySelector('.product-content').style.display = 'none';
    document.querySelector('.statistic-content').style.display = 'none';
}); 


    document.querySelector('.view-customers').addEventListener('click',()=>{
        const storeData2 = localStorage.getItem('address'); 
        const storeData1 = localStorage.getItem('customers'); 
        const customer2 = JSON.parse(storeData2); 
        const customer1 = JSON.parse(storeData1); 
    
        var html = ""; 
    
        customer2.forEach(customers2 => {
            const status = customer1.find(customers1 => customers1.id === customers2.customerId && customers1.status === "true") ? "Active" : "Inactive";
            // const role = customer1.find(customer1 => customer1.id === customers2.customerId && customer1.role);  
            const newRow = `
            <tr>
                <td>${customers2.customerId}</td> 
                <td>${customers2.fullname}</td>
                <td class = "sdt">${customers2.phone}</td> 
                <td class = "email">${customers2.email}</td>
                <td class = "role">${getRoleThroughId(customers2.customerId)}</td>
                <td class = "status">${status}</td>
                <td>
                    <button>Edit-customer</button>
                    <button>Delete-customer</button>
                </td>
            </tr>
            `;
            
            html += newRow; 
      
           
      
        });
        
        const tableBody = document.querySelector('.customers--detail'); 
        // console.log(tableBody); 
        tableBody.innerHTML = html;    
    });

    function getRoleThroughId(id){
        const storeData = JSON.parse(localStorage.getItem('customers')); 
        const find1 = storeData.find(customers => parseInt(customers.id) === parseInt(id));
        return find1.role; 
        
    }


    function display(){
        const storeData2 = localStorage.getItem('address'); 
        // const storeData1 = localStorage.getItem('customers'); 
        const customer2 = JSON.parse(storeData2); 
        // const customer1 = JSON.parse(storeData1); 

        var html = ""; 
        
        customer2.forEach(customers2 => {
            console.log(getStatusThroughId(customers2.customerId)); 
            const newRow = `
            
            <tr>
                <td>${customers2.customerId}</td> 
                <td>${customers2.fullname}</td>
                <td class = "sdt">${customers2.phone}</td> 
                <td class = "email">${customers2.email}</td>
                <td class = "role">${getRoleThroughId(customers2.customerId)}</td>
                <td class = "status">${getStatusThroughId(customers2.customerId) === "true" ? "Active" : "Inactive"}</td>
                <td>
                    <button>Edit-customer</button>
                    <button>Delete-customer</button>
                </td>
            </tr>
            `;
            
            html += newRow; 
            
      
        });

        
        
        const tableBody = document.querySelector('.customers--detail'); 
        // console.log(tableBody); 
        tableBody.innerHTML = html;    
    }

    function getStatusThroughId(id){
        const storeData = JSON.parse(localStorage.getItem('customers')); 
        const find1 = storeData.find(customers => parseInt(customers.id) === parseInt(id));
        return find1.status; 
    }   

    // check valid search name 
    function validateCustomerName(customerName) {
        const customerNameRegex = /^[\p{L}\s.,-]+$/u;
        return customerNameRegex.test(customerName);
    }


document.getElementById('timkiem').addEventListener('click', ()=>{
    const username = document.getElementById('searchcustomername').value;
    if(!username){
        document.getElementById('warning-empty-search-customer').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-search-customer').style.display = 'none'; 
        
    }
    if(!validateCustomerName(username)){
        document.getElementById('warning-name-valid').style.display = 'block';
        return; 
    }
    else{
        document.getElementById('warning-name-valid').style.display = 'none';
        
    }
    const storeData = JSON.parse(localStorage.getItem('address')); 
    const tableBody = document.querySelector('.customers--detail'); 
    tableBody.innerHTML = ''; 
    
    // console.log(storeData); 

    const find = storeData.filter(customers => customers.fullname.includes(username)); 
    // console.log(getStatusThroughId(find.customerId)); 
    // console.log(find); 
    if(find){
        find.forEach(find=>{
            const newRow = `
            <tr>
                <td>${find.customerId}</td> 
                <td>${find.fullname}</td>
                <td class = "sdt">${find.phone}</td> 
                <td class = "email">${find.email}</td>
                <td class = "ranking">${getRoleThroughId(find.customerId)}</td>
                <td class = "status">${getStatusThroughId(find.customerId) === "true" ? "Active" : "Inactive"}</td>
                <td>
                    <button>Edit-customer</button>
                    <button>Delete-customer</button>
                </td>
            </tr>
        `; 
         tableBody.innerHTML += newRow; 
        })
    }

    
    else{
        alert('not found'); 
    }

    document.getElementById('searchcustomername').value = '';  
}); 


document.getElementById('back').addEventListener('click',()=>{ 
    const storeData2 = localStorage.getItem('address'); 
    const storeData1 = localStorage.getItem('customers'); 
    const customer2 = JSON.parse(storeData2); 
    const customer1 = JSON.parse(storeData1); 

    var html = ""; 

    customer2.forEach(customers2 => {
        const status = customer1.find(customers1 => customers1.id === customers2.customerId && customers1.status === "true") ? "Active" : "Inactive";
        // const role = customer1.find(customer1=>customer1.id === customer2.customerId); 
        // console.log(role.role); 
        const newRow = `
        <tr>
            <td>${customers2.customerId}</td> 
            <td>${customers2.fullname}</td>
            <td class = "sdt">${customers2.phone}</td> 
            <td class = "email">${customers2.email}</td>
            <td class = "role">${getRoleThroughId(customers2.customerId)}</td>
            <td class = "status">${status}</td>
            <td>
                <button>Edit-customer</button>
                <button>Delete-customer</button>
            </td>
        </tr>
        `;
        
        html += newRow; 
  
       
  
    });
    
    const tableBody = document.querySelector('.customers--detail'); 
    // console.log(tableBody); 
    tableBody.innerHTML = html;    
}); 

// không được bắt đầu với số phải chứa ký tự a-z, A-Z, 0 - 9, chiều dài phải 6-30 ký tự ,không được chứa ký tự đặc biệt ngoài _
function validateUsername(username) {
    const pattern = /^[A-Za-z][A-Za-z0-9_]{5,29}$/;
    return pattern.test(username);
}
// tối thiểu 8 ký tự ít nhất một chữ hoa,một chữ thường, ít nhất 1 số 0-9, ít nhất một ký tự đặc biệt @, #, $, không khoảng trắng 
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// cho phép chữ hoa lẫn thường có thể có khoảng trắng giữa tên, không có số hoặc ký tự đặc biệt 
function validateName(name) {
    const nameRegex = /^[a-zA-Z' -]+$/; 
    return nameRegex.test(name);
}
// so dien thoai 
function validatePhone(phoneNumber) {
    const phoneRegex = /^(?:\+84|0)(3[2-9]|5[6-9]|7[0-9]|8[0-6]|9[0-4])[0-9]{7}$/;
    return phoneRegex.test(phoneNumber);
}
// email 
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// bắt đầu bằng chuỗi vd Quận 1 
// cho phep khoảng trắng 
// hổ trợ có dấu 
// không có ký tự đặc biệt
// không được bắt đầu là số 
function validateDistrictName(districtName) {
    const districtRegex = /^[\p{L}\s-]+$/u;
    return districtRegex.test(districtName);
}
//  không được có số và ký tự đặc biệt 
function validateProvinceName(provinceName) {
    const provinceRegex = /^[\p{L}\s-]+$/u;
    return provinceRegex.test(provinceName);
}
// không đc bắt đầu bằng số
// không có ký tự đặc biệt 
function validateWardName(wardName) {
    const wardRegex = /^[\p{L}\s-]*Phường \d*[\p{L}\s-]*$/u;
    return wardRegex.test(wardName);
}
// không được bắt đầu là số 
// không được chứa ký tự đặc biệt 
function validateStreetName(streetName) {
    const streetRegex = /^Đường\s+[\p{L}\s]*\d*[\p{L}\s-]*$/u;
    return streetRegex.test(streetName);
}
// them khach hang 
document.getElementById('add--customer').addEventListener('click',()=>{
    const username = document.getElementById('username--name').value.trim(); 
    const password = document.getElementById('password--name').value.trim(); 
    const nameCustomers = document.getElementById('customer--name').value.trim(); 
    const phoneCustomers = document.getElementById('customer--phone').value.trim(); 
    const emailCustomers = document.getElementById('customer--email').value.trim(); 
    const statusCustomers = document.getElementById('customer--status').value; 
    const roleCustomers = document.getElementById('customer--role').value; 
    const district = document.getElementById('customer--district').value.trim(); 
    const province = document.getElementById('customer--province').value.trim(); 
    const street = document.getElementById('customer--street').value.trim(); 
    const ward = document.getElementById('customer--ward').value.trim(); 
    // confirm information 
    if(!username){
        document.getElementById('warning-empty-add-username').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-add-username').style.display = 'none'; 
    }
    if(!password){
        document.getElementById('warning-empty-add-password').style.display = 'block'; 
        return; 
    }
    else{ 
        document.getElementById('warning-empty-add-password').style.display = 'none'; 
    }
    if(!nameCustomers){
        document.getElementById('warning-empty-add-name').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-empty-add-name').style.display = 'none'; 
        
    }
    if(!phoneCustomers){
        document.getElementById('warning-empty-add-phone').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-empty-add-phone').style.display = 'none'; 
    }
    if(!emailCustomers){
        document.getElementById('warning-empty-add-email').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-add-email').style.display = 'none'; 
    }
    if(!district){
        document.getElementById('warning-empty-add-district').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-add-district').style.display = 'none'; 
    }
    if(!province){
        document.getElementById('warning-empty-add-province').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-add-province').style.display = 'none'; 
    }
    if(!ward){
        document.getElementById('warning-empty-add-ward').style.display = 'block';
        return; 
    }
    else{
        document.getElementById('warning-empty-add-ward').style.display = 'none';
    }
    if(!street){
        document.getElementById('warning-empty-add-street').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-empty-add-street').style.display = 'none'; 
    }
    // kiem tra tinh hop le 
    if(!validateUsername(username)){
        document.getElementById('warning-add-username').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-add-username').style.display = 'none'; 
    }

    if(!validatePassword(password)){
        document.getElementById('warning-add-password').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-add-password').style.display = 'none'; 
    }

    if(!validateName(nameCustomers)){
        document.getElementById('warning-add-name').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-add-name').style.display = 'none'; 

    }

    if(!validatePhone(phoneCustomers)){
        document.getElementById('warning-add-phone').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-add-phone').style.display = 'none'; 
        
    }

    if(!validateEmail(emailCustomers)){
        document.getElementById('warning-add-email').style.display = 'block';
        return; 
    }
    else{
        document.getElementById('warning-add-email').style.display = 'none';
        
    }
    if(!validateDistrictName(district)){
        document.getElementById('warning-add-district').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-add-district').style.display = 'none'; 

    }
    if(!validateProvinceName(province)){
        document.getElementById('warning-add-province').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-add-province').style.display = 'none'; 
    }
    if(!validateWardName(ward)){
        document.getElementById('warning-add-ward').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-add-ward').style.display = 'none'; 
   
    }

    if(!validateStreetName(street)){
        document.getElementById('warning-add-street').style.display = 'block'; 
    }
    else{
        document.getElementById('warning-add-street').style.display = 'none'; 
    }


    const customers = JSON.parse(localStorage.getItem('address'));
    const customers2 = JSON.parse(localStorage.getItem('customers')); 
    const lastCustomerId = parseInt(customers.at(-1).customerId); 
    const lastCustomerId2 = parseInt(customers2.at(-1).id); 

   
    let newcustomer = {
        customerId:lastCustomerId+1,
        district:district, 
        email:emailCustomers, 
        fullname:nameCustomers, 
        phone:phoneCustomers,
        province:province,
        street:street,
        ward:ward   
    }; 

    let updatestatus = (statusCustomers === "active" ? "true" : "false"); 

    let newcustomer2 = {
        id: lastCustomerId2+1, 
        password: password, 
        role:roleCustomers,
        status: updatestatus, 
        username: username 
    }

   
    let storeData1 = JSON.parse(localStorage.getItem('address')); 
    let storeData2 = JSON.parse(localStorage.getItem('customers')); 
    storeData1.push(newcustomer); 
    storeData2.push(newcustomer2); 
     

    localStorage.setItem('address',JSON.stringify(storeData1));
    localStorage.setItem('customers',JSON.stringify(storeData2)); 

    const tableBody = document.querySelector('.customers--detail'); 

    tableBody.innerHTML = ''; 


    // storeData1.forEach(customers2 => {
        // const status = storeData2.find(customers1 => customers1.id === customers2.customerId && customers1.status === "true") ? "Active" : "Inactive";
        // console.log(status.status); 
        // const newRow = `
        // <tr>
        //     <td>${customers2.customerId}</td> 
        //     <td>${customers2.fullname}</td>
        //     <td>${customers2.phone}</td> 
        //     <td>${customers2.email}</td>
        //     <td>regular</td>
        //     <td>${getStatusThroughId(customers2.customerId) === "true" ? "Active" : "Inactive"}</td>

        // </tr>
        // `;
        
  
        // console.log(tableBody); 
        // tableBody.innerHTML += newRow;    
  
    // });
    
    document.getElementById('username--name').value = ''; 
    document.getElementById('password--name').value = ''; 
    document.getElementById('customer--name').value =''; 
    document.getElementById('customer--phone').value =''; 
    document.getElementById('customer--email').value =''; 
    // document.getElementById('customer--ranking').value =''; 
    document.getElementById('customer--status').value =''; 
    document.getElementById('customer--district').value =''; 
    document.getElementById('customer--province').value =''; 
    document.getElementById('customer--street').value =''; 
    document.getElementById('customer--ward').value =''; 
    display(); 
});



document.getElementById('button-close').addEventListener('click',()=>{
    document.getElementById('modal').style.display = 'none'; 
})


let customerId; 

document.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'BUTTON' && e.target.textContent === 'Edit-customer') {
        const row = e.target.closest('tr'); 
        
        customerId = parseInt(row.querySelector('td:first-child').textContent); 
        
        document.querySelector('.modal').style.display = 'flex';
        
        const customerData = {
            id: customerId,
            name: row.querySelector('td:nth-child(2)').textContent,
            phone: row.querySelector('td:nth-child(3)').textContent,
            email: row.querySelector('td:nth-child(4)').textContent,
            // ranking: row.querySelector('td:nth-child(5)').textContent,
            role:  row.querySelector('td:nth-child(5)').textContent,
            status: row.querySelector('td:nth-child(6)').textContent
        };

        const addressdata = JSON.parse(localStorage.getItem('address')); 

        // console.log(customerId); 
        // console.log(addressdata[customerId]); 
        
        document.getElementById('change-name').value = customerData.name;
        document.getElementById('change-phone').value = customerData.phone;
        document.getElementById('change-email').value = customerData.email;
        // document.getElementById('change-ranking').value = customerData.ranking; 
        document.getElementById('change-status').value = customerData.status;  
        document.getElementById('change-role').value = customerData.role;
        document.getElementById('change-city').value = addressdata[customerId].province; 
        document.getElementById('change-street').value = addressdata[customerId].street; 
        document.getElementById('change-ward').value = addressdata[customerId].ward; 


    }
});


document.addEventListener('click',(e)=>{
    if(e.target && e.target.tagName === 'BUTTON' && e.target.textContent === 'Delete-customer'){
        console.log('hello'); 
        const row = e.target.closest('tr');
        const customerId = parseInt(row.querySelector('td:first-child').textContent);   
        console.log(customerId); 
        const storeData1 = JSON.parse(localStorage.getItem('customers')); 
        const storeData2 = JSON.parse(localStorage.getItem('address')); 
        const updatedCustomers = storeData1.filter(cus => parseInt(cus.id) !== customerId);
        
        
        const updatedAddresses = storeData2.filter(cus => parseInt(cus.customerId) !== customerId);

        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        localStorage.setItem('address', JSON.stringify(updatedAddresses));

        row.remove();
    }
})





document.getElementById("submit").addEventListener('click', (e) => {
    // Get form values
    const name = document.getElementById("change-name").value;
    const phone = document.getElementById("change-phone").value;
    const email = document.getElementById("change-email").value;
    const province = document.getElementById("change-city").value;
    const street = document.getElementById("change-street").value;
    const ward = document.getElementById("change-ward").value;
    const status = document.getElementById("change-status").value; 
    const role = document.getElementById("change-role").value; 
    // console.log(status); 


    const row = e.target.closest('tr');
    const addressData = JSON.parse(localStorage.getItem('address'));
    const customersData = JSON.parse(localStorage.getItem('customers'));

    // Update address data
    const customerIndex = addressData.findIndex(cust => parseInt(cust.customerId) === parseInt(customerId));
    const customerDataIndex = customersData.findIndex(cust => parseInt(cust.id) === parseInt(customerId));
    if (customerIndex !== -1) {
        addressData[customerIndex] = {
            ...addressData[customerIndex],
            fullname: name || addressData[customerIndex].fullname,
            phone: phone || addressData[customerIndex].phone,
            email: email || addressData[customerIndex].email,
            province: province || addressData[customerIndex].province,
            street: street || addressData[customerIndex].street,
            ward: ward || addressData[customerIndex].ward
        };
        
        localStorage.setItem('address', JSON.stringify(addressData));

        // console.log(customerDataIndex); 
        // console.log(customersData[customerDataIndex]); 

        const updateStatus = status === "true" ? "true" : "false"; 
        var updateRole = ""; 
        if(role === "Admin"){
            updateRole = "Quản lý"; 
        }
        if(role === "Staff"){
            updateRole = "Nhân viên"; 
        }
        if(role === "Customer"){
            updateRole = "Khách hàng"; 
        }
        customersData[customerDataIndex] = {
            id: customersData[customerDataIndex].id, 
            password: customersData[customerDataIndex].password, 
            role: updateRole, 
            status: updateStatus,
            username: customersData[customerDataIndex].username
        }; 

        // console.log(customersData[customerDataIndex].role); 

        // console.log(customersData[customerDataIndex]); 

        localStorage.setItem('customers',JSON.stringify(customersData)); 


       
    }

    document.querySelector('.modal').style.display = 'none';
    clearForm();

    display(); 
});

function clearForm() {
    document.getElementById("change-name").value = '';
    document.getElementById("change-phone").value = '';
    document.getElementById("change-email").value = '';
    document.getElementById("change-city").value = '';
    document.getElementById("change-street").value = '';
    document.getElementById("change-ward").value = '';
}