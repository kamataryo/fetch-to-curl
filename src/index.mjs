import whatwgFetch from 'whatwg-fetch'
import shlex from 'shlex'

const { Request } = whatwgFetch
const { quote } = shlex

/**
 * default executable
 * @type {string}
 */
const CURL = 'curl'

/**
 * parse fetch arguments
 * @param  {string|Request} input     URL or Request object
 * @param  {object}         [init={}] fetch options
 * @return {string}                   curl command text
 */
export const parser = (input, init = {}) => {
  const req = new Request(input, init)

  const redirect = init.redirect === 'follow' ? ['-L'] : []

  const url = req.url

  const method = ['-X', req.method]

  const headers = Object.keys(req.headers.map)
    .map(key => ['--header', `${key}: ${req.headers.map[key]}`])
    .concat(init.cache ? [['--header', `cache-control: ${init.cache}`]] : [])
    .reduce((prev, header) => [...prev, ...header], [])

  const body = init.body === void 0 ? [] : ['-d', req._bodyText]

  return [CURL, ...redirect, url, ...method, ...headers, ...body]
    .map(quote)
    .join(' ')
}

let _fetch = false

/**
 * inject fetch proxy
 * @return {void}
 */
export const inject = defaultCallback => {
  if (typeof global.fetch !== 'function') {
    throw new Error('fetch is not defined.')
  }

  _fetch = _fetch || global.fetch

  global.fetch = (input, init, callback = defaultCallback) => {
    const command = parser(input, init)
    typeof callback === 'function' && callback(command)

    return _fetch(input, init)
  }

  return { fetch: global.fetch }
}

/**
 * eject fetch proxy
 * @return {void}
 */
export const eject = () => {
  global.fetch = _fetch || global.fetch
  const ret = _fetch
  _fetch = void 0

  return { fetch: ret }
}
