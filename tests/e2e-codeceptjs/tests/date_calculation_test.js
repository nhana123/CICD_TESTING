Feature('Date Existence Tests');

Before(({ I }) => {
  // Login before each test with correct credentials
  I.amOnPage('/');
  I.fillField('#username', '1');
  I.fillField('#password', '1');
  I.click('Đăng nhập');
  I.waitForElement('.header', 5);
});

Scenario('Check if a valid date exists', ({ I }) => {
  I.see('Kiểm tra ngày có tồn tại');

  // Enter a valid date
  I.fillField('#day', '15');
  I.fillField('#month2', '11');
  I.fillField('#year2', '2025');
  I.click('Kiểm tra ngày');

  // Check the result
  I.waitForElement('.result', 5);
  I.see('tồn tại');
});

Scenario('Check if an invalid date exists', ({ I }) => {
  I.see('Kiểm tra ngày có tồn tại');

  // Enter an invalid date (February 30th)
  I.fillField('#day', '30');
  I.fillField('#month2', '2');
  I.fillField('#year2', '2025');
  I.click('Kiểm tra ngày');

  // Should show error
  I.waitForElement('.result.error', 5);
  I.see('không');
});
