Feature('Date Time Validation Tests');

Before(({ I }) => {
  // Login before each test with correct credentials
  I.amOnPage('/');
  I.fillField('#username', '1');
  I.fillField('#password', '1');
  I.click('Đăng nhập');
  I.waitForElement('.header', 5);
});

Scenario('Check days in a valid month', ({ I }) => {
  I.see('Kiểm tra số ngày trong tháng');

  // Enter a valid month and year
  I.fillField('#month1', '2');
  I.fillField('#year1', '2024');
  I.click('Kiểm tra số ngày');

  // Check that result is displayed (February 2024 has 29 days - leap year)
  I.waitForElement('.result', 5);
  I.see('29');
});

Scenario('Check days in invalid month', ({ I }) => {
  I.see('Kiểm tra số ngày trong tháng');

  // Enter an invalid month
  I.fillField('#month1', '13');
  I.fillField('#year1', '2024');
  I.click('Kiểm tra số ngày');

  // Check that error is displayed
  I.waitForElement('.result.error', 5);
  I.see('Tháng phải từ 1 đến 12');
});

Scenario('Check leap year February', ({ I }) => {
  I.see('Kiểm tra số ngày trong tháng');

  // Test leap year February (2024 is a leap year)
  I.fillField('#month1', '2');
  I.fillField('#year1', '2024');
  I.click('Kiểm tra số ngày');

  // Should show 29 days
  I.waitForElement('.result.success', 5);
  I.see('29');
});
