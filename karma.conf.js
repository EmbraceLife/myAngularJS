const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();
module.exports = function(config) { 
  config.set({
    frameworks: ['browserify', 'jasmine'],
    files: [
      'src/**/*.js',
      'test/**/*_spec.js'
    ],
    preprocessors: {
      'test/**/*.js': ['jshint', 'browserify'],
      'src/**/*.js': ['jshint', 'browserify']
    },
    browsers: ['ChromeHeadless'],
    browserify: { debug: true }
  })
}