Feature('Check Date REST API Tests');

Before(async ({ I }) => {
  // Login before each test to get valid session
  await I.loginAndGetSession();
});

Scenario('Check valid date exists via REST API', ({ I }) => {
  I.sendPostRequest('/check-date', {
    day: '25',
    month: '12',
    year: '2025'
  });

  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseField('day', '25');
  I.seeResponseField('month', '12');
  I.seeResponseField('year', '2025');
  I.seeResponseContainsKeys(['result']);
});

// API test với invalid input khác E2E (E2E dùng day=32, API dùng negative values)
Scenario('Check date with negative day via REST API', ({ I }) => {
  I.sendPostRequest('/check-date', {
    day: '-15',
    month: '6',
    year: '2025'
  });

  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseContainsKeys(['result']);
});

// API test với zero day (khác E2E)
Scenario('Check date with zero day via REST API', ({ I }) => {
  I.sendPostRequest('/check-date', {
    day: '0',
    month: '6',
    year: '2025'
  });

  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseContainsKeys(['result']);
});
