// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    // Custom step để login và lưu session
    async loginAndGetSession(username = '1', password = '1') {
      const response = await this.sendPostRequest('/login', {
        username: username,
        password: password
      });

      // Check login success
      this.seeResponseCodeIs(200);

      // Store cookie from response for future requests
      if (response.headers && response.headers['set-cookie']) {
        const sessionCookie = response.headers['set-cookie']
          .find(cookie => cookie.includes('JSESSIONID'));
        if (sessionCookie) {
          this.haveRequestHeaders({
            'Cookie': sessionCookie.split(';')[0]
          });
        }
      }

      return this;
    },

    // Custom step để check response success
    seeApiSuccess() {
      this.seeResponseContainsKeys(['success']);
      this.seeResponseContainsJson({success: true});
    },

    // Custom step để check response failure
    seeApiFailure() {
      this.seeResponseContainsKeys(['success']);
      this.seeResponseContainsJson({success: false});
    },

    // Custom step để check unauthorized
    seeUnauthorized() {
      this.seeResponseCodeIs(401);
      this.seeResponseContainsJson({success: false});
    },

    // Custom step để logout
    async logoutAndClearSession() {
      this.sendPostRequest('/logout');
      this.seeResponseCodeIs(200);
      // Clear cookies
      this.haveRequestHeaders({
        'Cookie': ''
      });
      return this;
    },

    // Helper để check field trong response
    seeResponseField(field, value) {
      this.seeResponseContainsJson({[field]: value});
    },

    // Helper để check text trong response (thay thế seeResponseContains)
    seeResponseHasText(text) {
      this.seeResponseMatchesJsonSchema({
        type: 'object',
        properties: {
          result: { type: 'string', pattern: `.*${text}.*` }
        }
      });
    }

  });
}
