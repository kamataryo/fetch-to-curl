import { inject, eject } from './index.mjs'
import test from 'ava'
import sinon from 'sinon'

const noop = sinon.spy()
global.fetch = noop

const spy = sinon.spy()

test('inject', t => {
  inject(spy)
  global.fetch('https://example.com', { method: 'POST' })
  t.is(spy.args[0][0], 'curl https://example.com -X POST')
  t.is(noop.args[0][0], 'https://example.com')
  t.deepEqual(noop.args[0][1], { method: 'POST' })
  spy.resetHistory()
  noop.resetHistory()
  eject()
})

test('eject', t => {
  inject(spy)
  eject()
  global.fetch('https://example.com', { method: 'POST' })
  t.true(spy.notCalled)
  t.is(noop.args[0][0], 'https://example.com')
  t.deepEqual(noop.args[0][1], { method: 'POST' })
  eject()
})
