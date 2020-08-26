import nock from 'nock'
import { RadioBrowser } from '../src/radioBrowser'

import fetch from 'node-fetch'
// @ts-ignore
global.fetch = fetch

describe('Radio Browser', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  test('Resolve base url', async () => {
    const mockResult = [
      {
        name: 'server name',
        ip: '1.2.2.2.'
      }
    ]

    nock(/radio-browser.info/)
      .get('/json/servers')
      .reply(200, mockResult)

    const result = await RadioBrowser.resolveBaseUrl()

    expect(result).toEqual(mockResult)
    expect(RadioBrowser.getBaseUrl()).toBe(mockResult[0].ip)
  })

  test('Resolve base url but do not set it', async () => {
    const defaultBaseUrl = RadioBrowser.getBaseUrl()
    const mockResult = [
      {
        name: 'server name',
        ip: '1.2.2.2.'
      }
    ]

    nock(/radio-browser.info/)
      .get('/json/servers')
      .reply(200, mockResult)

    const result = await RadioBrowser.resolveBaseUrl(false)

    expect(result).toEqual(mockResult)
    expect(RadioBrowser.getBaseUrl()).toBe(defaultBaseUrl)
  })

  test('Manually set base url', () => {
    const url = '1.2.3.4'
    RadioBrowser.setBaseUrl(url)

    expect(RadioBrowser.getBaseUrl()).toBe(url)
  })

  test('Throw if response is not OK', async () => {
    const errorText = 'server error'
    nock(/radio-browser.info/)
      .get('/json/servers')
      .reply(500, errorText)

    expect.assertions(1)
    try {
      await RadioBrowser.resolveBaseUrl()
    } catch (e) {
      const result = await e.text()
      expect(result).toBe(errorText)
    }
  })
})
