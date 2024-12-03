document.getElementById('register').addEventListener('click', (e) => {
    e.preventDefault(); 
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

const registerForm = document.getElementById('registerForm'); 
registerForm.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    const username = document.getElementById('taiKhoan').value; 
    const email = document.getElementById('mail').value; 
    const password = document.getElementById('pass').value; 
    const confirmPassword = document.getElementById('confirmpass').value; 
    
    // if (!username || !email || !password || !confirmPassword) {
    //     alert('Vui lòng nhập đầy đủ thông tin'); 
    //     return; 
    // }
    if(!username){
        document.getElementById('warning-empty-username').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-username').style.display = 'none'; 
    }

    if(!email){
        document.getElementById('warning-empty-email').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-email').style.display = 'none'; 
    }
    if(!password){
        document.getElementById('warning-empty-password').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-password').style.display = 'none'; 
    }

    if(!confirmPassword){
        document.getElementById('warning-empty-confirm-password').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-confirm-password').style.display = 'none'; 

    }

    
    if(!ValidateUserName(username)){
        document.getElementById('warning-username').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-username').style.display = 'none'; 
    }
    if(!validateGmail(email)){
        document.getElementById('warning-email').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-email').style.display = 'none'; 
    }   
    if(!validatePassword(password)){
        document.getElementById('warning-password').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-password').style.display = 'none'; 
    }

    if (password !== confirmPassword) {
        // alert('Vui lòng nhập mật khẩu đúng mật khẩu đã nhập'); 
        // document.getElementById('pass').value = ""; 
        document.getElementById('confirmpass').value = ""; 
        document.getElementById('warning-confirm-password').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-confirm-password').style.display = 'none'; 

    }
    
        const AdminData = JSON.parse(localStorage.getItem('AdminData')) || [];
    
        const existingAccount = AdminData.find(user => user.email === email)
        if (existingAccount) {
            alert("Email đã được đăng ký");
            return;
        }

        AdminData.push({ email, password, username });

        localStorage.setItem("AdminData", JSON.stringify(AdminData));

        alert('Đăng ký thành công'); 
        registerForm.reset(); 
    
});


const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault(); 
    const name = document.getElementById('tendangnhap').value; 
    const pass = document.getElementById('matkhau').value;
    console.log(name); 
    console.log(pass);  
    if(!name){
        document.getElementById('warning-empty-login-username').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-empty-login-username').style.display = 'none'; 
        
    }
    if(!pass){
        document.getElementById('warning-empty-login-password').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-login-password').style.display = 'none'; 
    }
    if(!ValidateUserName(name)){
        document.getElementById('warning-login-username').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-login-username').style.display = 'none'; 
    }
    if(!validatePassword(pass)){
        document.getElementById('warning-login-password').style.display = 'block';
        return;  
    }
    else{
        document.getElementById('warning-login-password').style.display = 'none'; 
    }
    const listOfAccounts = JSON.parse(localStorage.getItem('AdminData')) || []; 
    const user = listOfAccounts.find(account => account.username === name && account.password === pass);
    if(user){
        localStorage.setItem('loggedInAdmin', JSON.stringify(user));
        alert('Đăng nhập thành công'); 
        
        window.location.href = "admin.html"; 
        loginForm.reset(); 

    }
    else{ 
        alert('Đăng nhập thất bại'); 
    }
    
});

// bắt đầu với kí tự, chứa kí tự số hoặc gạch dưới, 3-16 kí tự 
function ValidateUserName(username){
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    return usernameRegex.test(username); 
}

// truoc @ có thể chứa số, chữ, ký tự đặc biệt sau @ chứa @gmail.com 
function validateGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

// ít nhất 1 chữ thường, 1 chữ hoa,1 số,1 ký tự đặc biệt, tối thiểu 8 ký tự 
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;
    return passwordRegex.test(password);
}