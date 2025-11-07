Feature('Check Days REST API Tests');

Before(async ({ I }) => {
  // Login before each test to get valid session
  await I.loginAndGetSession();
});

Scenario('Check days with valid month and year via REST API', ({ I }) => {
  I.sendPostRequest('/check-days', {
    month: '3',
    year: '2025'
  });

  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseField('month', '3');
  I.seeResponseField('year', '2025');
  I.seeResponseContainsKeys(['result']);
});

// API test với invalid input khác E2E (E2E dùng month=13, API dùng negative values)
Scenario('Check days with negative month via REST API', ({ I }) => {
  I.sendPostRequest('/check-days', {
    month: '-5',
    year: '2025'
  });

  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseContainsKeys(['result']);
});

// API test với zero month (khác E2E)
Scenario('Check days with zero month via REST API', ({ I }) => {
  I.sendPostRequest('/check-days', {
    month: '0',
    year: '2025'
  });

  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseContainsKeys(['result']);
});
