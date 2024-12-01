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