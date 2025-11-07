Feature('Complete Application Flow Tests');

Before(({ I }) => {
  // Login before each test with correct credentials
  I.amOnPage('/');
  I.fillField('#username', '1');
  I.fillField('#password', '1');
  I.click('Đăng nhập');
  I.waitForElement('.header', 5);
});

Scenario('Test complete flow - check days in month', ({ I }) => {
  // Verify we're on the main page
  I.see('Kiểm tra số ngày trong tháng');
  I.see('Kiểm tra ngày có tồn tại');

  // Test checking days in December
  I.fillField('#month1', '12');
  I.fillField('#year1', '2025');
  I.click('Kiểm tra số ngày');

  // Should show 31 days for December
  I.waitForElement('.result', 5);
  I.see('31');
});

Scenario('Test complete flow - check date existence', ({ I }) => {
  // Test checking if a date exists
  I.fillField('#day', '29');
  I.fillField('#month2', '2');
  I.fillField('#year2', '2024'); // Leap year
  I.click('Kiểm tra ngày');

  // Should be valid (leap year)
  I.waitForElement('.result', 5);
  I.see('tồn tại');
});

Scenario('Test logout functionality', ({ I }) => {
  // Verify logout works
  I.see('Đăng xuất');
  I.click('Đăng xuất');

  // Should redirect to login page
  I.waitForElement('.login-container', 5);
  I.see('Đăng nhập');
  I.see('Thông tin đăng nhập:');
});
