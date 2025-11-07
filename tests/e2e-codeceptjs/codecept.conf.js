const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:8080',
      show: true,
      browser: 'chromium',
      windowSize: '1280x720'
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'e2e-codeceptjs',
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: false
    },
    retryFailedStep: {
      enabled: true
    }
  }
};
