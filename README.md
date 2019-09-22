# myAngularJS

## Diverge from the book

### Try Chromium instead of Phantomjs
PhantomJS is no longer maintained and many deprecations appear in installation. Within the guide from this [post](https://medium.com/@metalex9/replace-phantomjs-with-headless-chromium-for-javascript-unit-testing-in-karma-59812e6f8ce4), I will try to replace phantomjs with chromium.

First, uninstall phantomjs, phantomjs-prebuilt and its karma launcher
```bash
npm r phantomjs phantomjs-prebuilt karma-phantomjs-launcher
```

Second, install chromium and its karma launcher
```bash
npm i -D karma-chrome-launcher puppeteer
```

Third, update 'karma.conf.js'
```js
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();
module.exports = function(config) {
  config.set({
    // omitted...
    browsers: ['ChromeHeadless']
    // omitted...
  });
};
```