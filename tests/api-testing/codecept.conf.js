exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'http://localhost:8080/api',
      defaultHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },
    JSONResponse: {}
  },
  include: {
    I: './steps_file.js'
  },
  name: 'api-testing',
  plugins: {
    retryFailedStep: {
      enabled: true
    }
  },
  mocha: {
    reporterOptions: {
      "codeceptjs-cli-reporter": {
        stdout: "-",
        options: {
          verbose: true,
          steps: true
        }
      }
    }
  }
};
