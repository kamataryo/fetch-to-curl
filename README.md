# fetch-to-curl

[![Build Status](https://travis-ci.org/kamataryo/fetch-to-curl.svg?branch=master)](https://travis-ci.org/kamataryo/fetch-to-curl)
[![Build status](https://ci.appveyor.com/api/projects/status/yhpc128t9efo5b1k?svg=true)](https://ci.appveyor.com/project/kamataryo/fetch-to-curl)

[![npm (scoped)](https://img.shields.io/npm/v/fetch-to-curl.svg)](https://www.npmjs.com/package/fetch-to-curl)
[![downloads](https://img.shields.io/npm/dt/fetch-to-curl.svg)](https://www.npmjs.com/package/fetch-to-curl)
[![Dependency Status](https://img.shields.io/david/kamataryo/fetch-to-curl.svg?style=flat)](https://david-dm.org/kamataryo/fetch-to-curl)
[![devDependency Status](https://img.shields.io/david/dev/kamataryo/fetch-to-curl.svg?style=flat)](https://david-dm.org/kamataryo/fetch-to-curl#info=devDependencies)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Convert fetch arguments to a curl command.

## install

```shell
$ npm i fetch-to-curl -S
# or
$ yarn add fetch-to-curl
```

## usage

```javascript
const { parser } = require('fetch-to-curl')
parser('https://example.com', { method: 'POST' }) // curl "https://example.com" -X "POST"
```

```javascript
require('fetch-to-curl').inject(console.log)
fetch('https://example.com', { method: 'POST' }) // curl  "https://example.com" -X "POST"
```

## development

```shell
$ git clone https://github.com/kamataryo/fetch-to-curl.git
$ cd fetch-to-curl
$ npm test
```
