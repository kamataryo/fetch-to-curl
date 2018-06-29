const { parser } = require('./')
const { expect } = require('chai')

describe('parser', () => {
  it('command', () => {
    const command = parser()
    expect(command).to.contains('curl')
  })

  it('redirect', () => {
    const command = parser('https://example.com', { redirect: 'follow' })
    expect(command).to.contain('-L')
  })

  it('url', () => {
    const command = parser('https://example.com')
    expect(command).to.contains('https://example.com')
  })

  it('method', () => {
    const command = parser('https://example.com', { method: 'POST' })
    expect(command).to.contains('-X')
    expect(command).to.contains('POST')
  })

  it('cache', () => {
    const command = parser('https://example.com', { cache: 'no-chache' })
    expect(command).to.contains('--header "cache-control: no-cache')
  })

  it('header', () => {
    const command = parser('https://example.com', {
      headers: { 'content-type': 'application/json' },
    })
    expect(command).to.contain('--header "content-type: application/json"')
  })

  it('body', () => {
    const command = parser('https://example.com', {
      method: 'POST',
      body: 'hello',
    })
    expect(command).to.contains('-d "hello"')
  })
})
