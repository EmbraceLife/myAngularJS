# myAngularJS

## Diverge from the book

### Try Chromium instead of Phantomjs
PhantomJS is no longer maintained and many deprecations appear in installation. Within the guide from this [post](https://medium.com/@metalex9/replace-phantomjs-with-headless-chromium-for-javascript-unit-testing-in-karma-59812e6f8ce4), I will try to replace phantomjs with chromium.

First, uninstall phantomjs, phantomjs-prebuilt and its karma launcher
```bash
npm r phantomjs phantomjs-prebuilt karma-phantomjs-launcher
```

Second, install chromium and its karma launcher

```node
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

When node_modules and package-lock.json are polluted, we use `npm install` to set everything right.

I removed node_modules and package-lock.json, and ran `npm install`, and `npm test` still works. Plus, there is only one deprecation 'minimatch' which is vulnerable to attack, and run `npm install minimatch` to update it into property `dependencies` instead of `devDependencies` inside 'package.json'.

### Integrate Browswerify

pp. xiii-xiv

```node
npm install --save-dev browserify karma-browserify
```

Now use node's `module.exports` and `require` in src and test files

```js
/* src/hello.js */
module.exports = function sayHello() {
  return "Hello, world!";
};

```

```js
/* test/hello_spec.js */
var sayHello = require('../src/hello');
describe("Hello", function() {
  it("says hello", function() { expect(sayHello()).toBe("Hello, world!");
  });
});

```

Now, we need to enable browserify in karma, so that all files will be processed by browserify first before ran by jasmine. The debug flag ensures file details to be displayed in debugging process.

```js
/* karma.conf.js */
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
```

However, in practice the book has missed one more installation below at the time when I proceed.

```node
npm install --save-dev watchify
```

Note: the book has not instructed us to test the debug feature yet in this section.
