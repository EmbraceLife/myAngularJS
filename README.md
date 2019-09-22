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

### package.json + `npm install` = reinstall all dependencies
when node_modules and package-lock.json are polluted, use `npm install` to set everything right. 

I removed node_modules and package-lock.json, and ran `npm install`, and `npm test` still works. Plus, there is only one deprecation 'minimatch' which is vulnerable to attack, and run `npm install minimatch` to update it into property `dependencies` instead of `devDependencies` inside 'package.json'.