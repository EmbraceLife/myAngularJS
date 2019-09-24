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

### Include Lo-Dash And jQuery

Why? 
Original angular.js uses no third party libraries (only jQuery it has what angular.js needs). But we are going to use Lodash and jQuery for low-level operations, so that we can focus on angular.js itself.

What Lodash is used for?
Array and object manipulation, such as equality checking and cloning

What jQuery is used for?
DOM querying and manipulation

Install Lodash and jQuery as runtime dependencies not development Dependencies

```node
<!-- use --save for runtime dependencies, --save-dev for dev dependencies -->

npm install --save lodash jquery
```

Try Lodash

```js
/* src/hello.js */
var _ = require('lodash');

module.exports = function sayHello(to) {

return _.template("Hello, <%= name %>!")({name: to});

};

```

```js
/* test/hello_spec.js */
var sayHello = require('../src/hello'); 

describe("Hello", function() {

  it("says hello", function() {

    expect(sayHello('Jane')).toBe("Hello, Jane!");

  });
});
```

## Part I Scopes

### Intro

#### What is angularJS scopes

- one of AngularJS's central building blocks

#### What is angularJS scopes for

- Sharing data between controllers and views
- Sharing data between different parts of the application 
- Broadcasting and listening for events
- Watching for changes in data

#### watching for changes in data

- scopes implement a *dirty-checking* to notify when data changes on a scope
- it is part of secret sauce of *data binding*

#### objective of part I

- implement *digest cycle* and *dirty-checking* including **$watch**, **$digest**, **$apply**
- scope inheritance for sharing data and events
- efficient *dirty-checking* for arrays and objects
- the event system: **$on**, **$emit**, **$broadcast**
