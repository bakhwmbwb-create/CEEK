// ==========================================
// 0. التحقق التلقائي من حالة تسجيل الدخول
// ==========================================
const currentUser = localStorage.getItem('currentUser');
if (currentUser) {
  window.location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', function () {
  // ==========================================
  // 1. تعريف جميع عناصر الصفحة باستعمال الـ ID
  // ==========================================
  const avatarImg = document.getElementById('avatarImg');

  const loginTabBtn = document.getElementById('loginTabBtn');
  const registerTabBtn = document.getElementById('registerTabBtn');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  const loginUser = document.getElementById('loginUser');
  const loginPass = document.getElementById('loginPass');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');

  const regName = document.getElementById('regName');
  const regEmail = document.getElementById('regEmail');
  const regPass = document.getElementById('regPass');
  const regFamily = document.getElementById('regFamily');
  const registerSubmitBtn = document.getElementById('registerSubmitBtn');

  const homeLink = document.getElementById('homeLink');


  // ==========================================
  // 2. وظيفة التبديل بين الشاشتين (Tabs)
  // ==========================================
  function switchTab(tabName) {
    if (tabName === 'login') {
      loginTabBtn.classList.add('active');
      registerTabBtn.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    } else {
      registerTabBtn.classList.add('active');
      loginTabBtn.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    }
  }

  if (loginTabBtn && registerTabBtn) {
    loginTabBtn.addEventListener('click', function (e) {
      e.preventDefault();
      switchTab('login');
    });

    registerTabBtn.addEventListener('click', function (e) {
      e.preventDefault();
      switchTab('register');
    });
  }


  // ==========================================
  // 3. إنشاء حساب جديد دون التقييد بالبريد
  // ==========================================
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const enteredEmail = regEmail.value.trim();

      // إنشاء كائن الحساب الجديد بدون منع تكرار البريد
      const newUser = {
        name: regName.value.trim(),
        email: enteredEmail,
        password: regPass.value,
        family: regFamily.value
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      alert('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');

      const createdEmail = newUser.email;
      registerForm.reset();
      switchTab('login');
      if (loginUser) {
        loginUser.value = createdEmail;
        loginPass.focus();
      }
    });
  }


  // ==========================================
  // 4. تسجيل الدخول بالتحقق من (البريد + كلمة المرور)
  // ==========================================
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const inputUser = loginUser.value.trim();
      const inputPass = loginPass.value;

      // البحث عن حساب يطابق اسم المستخدم/البريد وفي نفس الوقت يطابق كلمة المرور
      const userAccount = users.find(
        user => (user.email === inputUser || user.name === inputUser) && user.password === inputPass
      );

      if (userAccount) {
        // حفظ بيانات المستخدم الذي قام بالدخول
        localStorage.setItem('currentUser', JSON.stringify(userAccount));
        alert(`مرحباً بعودتك يا ${userAccount.name}! تم تسجيل الدخول بنجاح.`);
        window.location.href = 'home.html';
      } else {
        alert('بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور!');
      }
    });
  }
});