const { Request } = require('node-fetch')

const CURL = 'curl'

let _fetch

/**
 * [escape description]
 * @param  {string} str [description]
 * @return {string}     [description]
 */
const escape = str => (str || '').replace(/"/g, '\\"')

/**
 * parse fetch arguments
 * @param  {string|Request} input [description]
 * @param  {[type]} init  [description]
 * @return {[type]}       [description]
 */
const parser = (input, init = {}) => {
  const req = new Request(input, init)

  let redirect
  if (req.redirect === 'follow') {
    redirect = '-L'
  }

  const url = `"${escape(req.url)}"`

  const method = `-X "${escape(req.method)}"`

  if (init.cache) {
    req.headers.set('cache-control', 'no-cache')
  }

  const headers = Array.from(req.headers.keys()).map(
    key => `--header "${escape(key)}: ${escape(req.headers.get(key))}"`
  )

  const body = `-d "${escape(req.body)}"`

  return [CURL, redirect, url, method, ...headers, body].join(' ')
}

const defaultDefaultCallback = console.log

/**
 * [inject description]
 * @param  {function} [defaultCallback=defaultDefaultCallback] [description]
 * @return {Promise}                                          [description]
 */
const inject = (defaultCallback = defaultDefaultCallback) => {
  _fetch = global.fetch

  global.fetch = (input, init, callback = defaultCallback) => {
    const command = parser(input, init)
    callback(command)

    return _fetch(input, init)
  }
}

/**
 * [eject description]
 * @return {void} [description]
 */
const eject = () => (global.fetch = _fetch)

module.exports = { parser, inject, eject }

// # done
// [*] method: The request method, e.g., GET, POST.
// [*] headers: Any headers you want to add to your request, contained within a Headers object or an object literal with ByteString values.
// [*] body: Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body.
// [ ] mode: The mode you want to use for the request, e.g., cors, no-cors, or same-origin.
// [ ] credentials: The request credentials you want to use for the request: omit, same-origin, or include. To automatically send cookies for the current domain, this option must be provided. Starting with Chrome 50, this property also takes a FederatedCredential instance or a PasswordCredential instance.
// [*] cache: The cache mode you want to use for the request: default, no-store, reload, no-cache, force-cache, or only-if-cached.
// [*] redirect: The redirect mode to use: follow (automatically follow redirects), error (abort with an error if a redirect occurs), or manual (handle redirects manually). In Chrome the default is follow (before Chrome 47 it defaulted to manual).
// [ ] referrer: A USVString specifying no-referrer, client, or a URL. The default is client.
// [ ] referrerPolicy: Specifies the value of the referer HTTP header. May be one of no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, unsafe-url.
// [ ] integrity: Contains the subresource integrity value of the request (e.g., sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=).
// [ ] keepalive: The keepalive option can be used to allow the request to outlive the page. Fetch with the keepalive flag is a replacement for the Navigator.sendBeacon() API.
// [ ] signal: An AbortSignal object instance; allows you to communicate with a fetch request and abort it if desired via an AbortController.
