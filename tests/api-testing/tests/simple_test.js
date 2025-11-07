Feature('Simple API Test');

Scenario('Test basic API call', ({ I }) => {
  I.sendGetRequest('/status');
  I.seeResponseCodeIs(401);
  I.seeResponseField('authenticated', false);
});
