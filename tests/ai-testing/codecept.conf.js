exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {},
  include: {
    I: './steps_file.js'
  },
  name: 'ai-testing',
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 1
    }
  },
  require: ['dotenv/config']
};

