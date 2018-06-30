import test from 'ava'
import { parser } from './index.mjs'

test('command', t => {
  const command = parser()
  t.true(command.includes('curl'))
})

test('redirect', t => {
  const command = parser('https://example.com', { redirect: 'follow' })
  t.true(command.includes('-L'))
})

test('url', t => {
  const command = parser('https://example.com')
  t.true(command.includes('https://example.com'))
})

test('method', t => {
  const command = parser('https://example.com', { method: 'POST' })
  t.true(command.includes('-X'))
  t.true(command.includes('POST'))
})

test('cache', t => {
  const command = parser('https://example.com', { cache: 'no-cache' })
  t.true(command.includes('--header'))
  t.true(command.includes('cache-control: no-cache'))
})

test('header', t => {
  const command = parser('https://example.com', {
    headers: {
      'content-type': 'application/json',
      Autorization: 'Bearer mytoken',
    },
  })
  t.true(command.includes('--header'))
  t.true(command.includes('content-type: application/json'))
})

test('body', t => {
  const command = parser('https://example.com', {
    method: 'POST',
    body: 'hello',
  })
  t.true(command.includes('-d'))
  t.true(command.includes('hello'))
})
