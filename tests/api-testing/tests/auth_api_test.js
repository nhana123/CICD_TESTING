Feature('Authentication API Tests');

Scenario('Login with valid credentials via REST API', ({ I }) => {
  I.sendPostRequest('/login', {
    username: '1',
    password: '1'
  });

  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseField('user', '1');
  I.seeResponseContainsKeys(['message']);
});

Scenario('Login with invalid credentials via REST API', ({ I }) => {
  I.sendPostRequest('/login', {
    username: 'wronguser',
    password: 'wrongpass'
  });

  I.seeResponseCodeIs(401);
  I.seeApiFailure();
  I.seeResponseContainsKeys(['error']);
});

Scenario('Logout after valid login via REST API', async ({ I }) => {
  // Login first
  await I.loginAndGetSession();

  // Then logout
  I.sendPostRequest('/logout');
  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseContainsKeys(['message']);
});

Scenario('Check authentication status when logged in', async ({ I }) => {
  // Login first
  await I.loginAndGetSession();

  // Check status
  I.sendGetRequest('/status');
  I.seeResponseCodeIs(200);
  I.seeApiSuccess();
  I.seeResponseField('authenticated', true);
  I.seeResponseField('user', '1');
});

Scenario('Check authentication status when not logged in', ({ I }) => {
  I.sendGetRequest('/status');
  I.seeResponseCodeIs(401);
  I.seeApiFailure();
  I.seeResponseField('authenticated', false);
});

Scenario('Login with empty password via REST API', ({ I }) => {
  I.sendPostRequest('/login', {
    username: '1',
    password: ''
  });

  I.seeResponseContainsJson({
    success: false
  });
});

Scenario('Check authentication status after login via REST API', async ({ I }) => {
  // First login
  await I.loginAndGetSession();

  // Then check status
  I.sendGetRequest('/status');
  I.seeResponseContainsJson({
    authenticated: true,
    user: "1"
  });
});

Scenario('Logout with valid session via REST API', async ({ I }) => {
  // First login to get session
  await I.loginAndGetSession();

  // Then logout
  I.sendPostRequest('/logout');
  I.seeResponseContainsJson({
    success: true,
    message: "Đăng xuất thành công"
  });
});

Scenario('Check status without session via REST API', ({ I }) => {
  I.sendGetRequest('/status');
  I.seeResponseContainsJson({
    authenticated: false,
    message: "No active session"
  });
});
