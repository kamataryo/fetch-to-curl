import shlex from 'shlex'

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
  const redirect = init.redirect === 'follow' ? ['-L'] : []

  const url = typeof input === 'object' ? input.url : input

  const method = ['-X', init.method || 'GET']

  const headers = Object.keys(init.headers || {})
    .map(key => ['--header', `${key}: ${init.headers[key]}`])
    .concat(init.cache ? [['--header', `cache-control: ${init.cache}`]] : [])
    .reduce((prev, header) => [...prev, ...header], [])

  const body = init.body === void 0 ? [] : ['-d', init.body]

  return [CURL, ...redirect, url, ...method, ...headers, ...body]
    .map(quote)
    .join(' ')
}

let _fetch = false

/**
 * inject fetch callback
 * @param  {function} defaultCallback default callback
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
 * eject fetch callback
 * @return {void}
 */
export const eject = () => {
  global.fetch = _fetch || global.fetch
  const ret = _fetch
  _fetch = void 0

  return { fetch: ret }
}
