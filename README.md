# fetch2curl

[![Build Status](https://travis-ci.org/kamataryo/fetch-to-curl.svg?branch=master)](https://travis-ci.org/kamataryo/fetch-to-curl)
[![Build status](https://ci.appveyor.com/api/projects/status/yhpc128t9efo5b1k?svg=true)](https://ci.appveyor.com/project/kamataryo/fetch-to-curl)

[![npm (scoped)](https://img.shields.io/npm/v/fetch2curl.svg)](https://www.npmjs.com/package/fetch2curl)
[![Dependency Status](https://img.shields.io/david/kamataryo/fetch-to-curl.svg?style=flat)](https://david-dm.org/kamataryo/fetch-to-curl)
[![devDependency Status](https://img.shields.io/david/dev/kamataryo/fetch-to-curl.svg?style=flat)](https://david-dm.org/kamataryo/fetch-to-curl#info=devDependencies)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Converts fetch arguments to a curl command.

## install

```shell
$ npm i fetch2curl -S
# or
$ yarn add fetch2curl
```

## usage

You can get executable curl command immediately and easily. Do anything with it, for example posting to your chat as an evidence.

### parser

```javascript
import { parser } from 'fetch2curl'

const command = parser('https://example.com', { method: 'POST' })
console.log(command) // curl https://example.com -X POST
```

### hook fetch execution

```javascript
import { inject, eject } from 'fetch2curl'

// hook fetch
inject(command => console.log(`COMMAND: \`${command}\``))
fetch('https://example.com', { method: 'POST' }) // COMMAND: `curl https://example.com -X POST`

// unregister the hook
eject()
```

## development

```shell
$ git clone https://github.com/kamataryo/fetch-to-curl.git
$ cd fetch-to-curl
$ npm test
```

## Available `init` options (the 2nd argument)

https://developer.mozilla.org/ja/docs/Web/API/WindowOrWorkerGlobalScope/fetch

- [x] method: The request method, e.g., GET, POST.
- [x] headers: Any headers you want to add to your request, contained within a Headers object or an object literal with ByteString values.
- [x] body: Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body.
- [ ] mode: The mode you want to use for the request, e.g., cors, no-cors, or same-origin.
- [ ] credentials: The request credentials you want to use for the request: omit, same-origin, or include. To automatically send cookies for the current domain, this option must be provided. Starting with Chrome 50, this property also takes a FederatedCredential instance or a PasswordCredential instance.
- [x] cache: The cache mode you want to use for the request: default, no-store, reload, no-cache, force-cache, or only-if-cached.
- [x] redirect: The redirect mode to use: follow (automatically follow redirects), error (abort with an error if a redirect occurs), or manual (handle redirects manually). In Chrome the default is follow (before Chrome 47 it defaulted to manual).
- [ ] referrer: A USVString specifying no-referrer, client, or a URL. The default is client.
- [ ] referrerPolicy: Specifies the value of the referer HTTP header. May be one of no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, unsafe-url.
- [ ] integrity: Contains the subresource integrity value of the request (e.g., sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=).
- [ ] keepalive: The keepalive option can be used to allow the request to outlive the page. Fetch with the keepalive flag is a replacement for the Navigator.sendBeacon() API.
- [ ] signal: An AbortSignal object instance; allows you to communicate with a fetch request and abort it if desired via an AbortController.
