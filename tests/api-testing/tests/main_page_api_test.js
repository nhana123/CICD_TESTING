Feature('API Status Tests');

Scenario('Check API status without authentication', ({ I }) => {
  I.sendGetRequest('/status');
  I.seeResponseCodeIs(401);
  I.seeApiFailure();
  I.seeResponseField('authenticated', false);
});

Scenario('Access protected endpoint without login', ({ I }) => {
  I.sendPostRequest('/check-days', {
    month: '3',
    year: '2025'
  });
  I.seeUnauthorized();
});

