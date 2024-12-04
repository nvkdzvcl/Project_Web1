document.querySelector('.staff-login').addEventListener('click', () => {
    document.querySelector('.wrap-staff-login').style.display = 'block';

});

function showTab(tab) {
    const loginContent = document.getElementById('login-content');
    const registerContent = document.getElementById('register-content');
    const loginTab = document.querySelector('.tab-login');
    const registerTab = document.querySelector('.tab-register');

    if (tab === 'login') {
        loginContent.classList.add('active');
        registerContent.classList.remove('active');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        registerContent.classList.add('active');
        loginContent.classList.remove('active');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
    }
}

function closeLoginForm() {
    document.querySelector('.wrap-staff-login').style.display = 'none';
}

// check 
//bắt đầu là chữ 
// không có ký tự đặc biệt 
function validateUsername(username) {
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    return pattern.test(username);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// tối thiểu 8 ký tự ít nhất một chữ hoa,một chữ thường, ít nhất 1 số 0-9, ít nhất một ký tự đặc biệt @, #, $, không khoảng trắng 
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function submitLogin(){
   const username = document.getElementById('login-username').value; 
   const password = document.getElementById('login-password').value; 
   if(!username){
        document.getElementById('warning-empty-login-username').style.display = 'block'; 
        return; 
   }
   else{
        document.getElementById('warning-empty-login-username').style.display = 'none'; 

   }
    if(!password){
        document.getElementById('warning-empty-login-password').style.display = 'block'; 
        return; 
    }

   else{
    document.getElementById('warning-empty-login-password').style.display = 'none'; 

    }

    const listOfAccounts = JSON.parse(localStorage.getItem('staffData')) || []; 
    const user = listOfAccounts.find(account => account.username === username && account.password === password);
    if(user){
        // localStorage.setItem('loggedInAdmin', JSON.stringify(user));
        alert('Đăng nhập thành công'); 
        
        window.location.href = "staff.html"; 
        
        localStorage.setItem('loggedInStaff', JSON.stringify(user));

    }
    else{ 
        alert('Tài khoản hoặc mật khẩu không chính xác.'); 
    }

}

function submitRegister(){
    const username = document.getElementById('register-username').value; 
    const email = document.getElementById('register-email').value; 
    const password = document.getElementById('register-password').value; 
    const confirmPassword = document.getElementById('register-confirm-password').value; 
    if(!username){
        document.getElementById('warning-empty-register-username').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-register-username').style.display = 'none'; 
    }
    if(!email){
        document.getElementById('warning-empty-register-email').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-register-email').style.display = 'none'; 
        
    }
    if(!password){
        document.getElementById('warning-empty-register-password').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-empty-register-password').style.display = 'none'; 
        
    }
    if(!confirmPassword){
        document.getElementById('warning-empty-register-confirm-password').style.display = 'block';
        return; 
    }
    else{
        document.getElementById('warning-empty-register-confirm-password').style.display = 'none'; 
        
    }

    if(!validateUsername(username)){
        document.getElementById('warning-register-username').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-register-username').style.display = 'none'; 
        
    }

    if(!validateEmail(email)){
        document.getElementById('warning-register-email').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-register-email').style.display = 'none'; 

    }

    if(!validatePassword(password)){
        document.getElementById('warning-register-password').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-register-password').style.display = 'none'; 
   
    }

    if(password !== confirmPassword){
        document.getElementById('warning-register-confirm-password').style.display = 'block'; 
        return; 
    }
    else{
        document.getElementById('warning-register-confirm-password').style.display = 'none'; 

    }

    const staffData = JSON.parse(localStorage.getItem('staffData')) || [];
    
    const existingAccount = staffData.find(user => user.username === username)
    if(existingAccount) {
        document.getElementById('warning-email-exist').style.display = 'block'; 
        return;
    }
    else{
        document.getElementById('warning-email-exist').style.display = 'none'; 
    }

    staffData.push({ email, password, username });

    localStorage.setItem("staffData", JSON.stringify(staffData));

    document.getElementById('register-username').value =''; 
    document.getElementById('register-email').value = ''; 
    document.getElementById('register-password').value = ''; 
    document.getElementById('register-confirm-password').value = ''; 
    alert('Đăng ký tài khoản thành công.');
}