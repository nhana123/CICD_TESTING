Feature('Login Tests');

Scenario('Login with valid credentials', ({ I }) => {
  I.amOnPage('/');
  I.see('Đăng nhập');
  I.see('Thông tin đăng nhập:');

  // Use the correct credentials from HTML: username=1, password=1
  I.fillField('#username', '1');
  I.fillField('#password', '1');
  I.click('Đăng nhập');

  // Should redirect to main page after successful login
  I.waitForElement('.header', 5);
  I.see('Xin chào');
  I.see('Đăng xuất');
});

Scenario('Login with invalid credentials', ({ I }) => {
  I.amOnPage('/');
  I.see('Đăng nhập');

  // Try login with wrong credentials
  I.fillField('#username', 'wronguser');
  I.fillField('#password', 'wrongpassword');
  I.click('Đăng nhập');

  // Should stay on login page and show error
  I.waitForText('Đăng nhập', 5);
  I.seeInCurrentUrl('/login');
});

Scenario('Access main page without login should redirect to login', ({ I }) => {
  I.amOnPage('/main');

  // Should be redirected to login page
  I.waitForElement('.login-container', 5);
  I.see('Đăng nhập');
  I.see('Thông tin đăng nhập:');
});
