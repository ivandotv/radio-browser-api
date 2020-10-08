import nock from 'nock'
import nodeFetch from 'node-fetch'
import { StationQuery } from '../dist/types'
import { Query } from '../src'
import { StationSearchType } from '../src/constants'
import { RadioBrowserApi } from '../src/radioBrowser'

const globalTest = {
  fetch: (nodeFetch as unknown) as typeof fetch
}
const baseUrl = 'https://fr1.api.radio-browser.info'

describe('Radio Browser', () => {
  afterEach(() => {
    nock.cleanAll()
    jest.clearAllMocks()
  })

  test('Resolve base url', async () => {
    const mockResult = [
      {
        name: 'some.server.name.info',
        ip: '1.2.2.2'
      }
    ]

    nock('https://all.api.radio-browser.info')
      .get('/json/servers')
      .reply(200, mockResult)

    const api = new RadioBrowserApi('test', globalTest.fetch)
    const result = await api.resolveBaseUrl()

    expect(result).toEqual(mockResult)
    expect(api.getBaseUrl()).toBe('https://' + mockResult[0].name)
  })

  test('Resolve base url but do not set it', async () => {
    const api = new RadioBrowserApi('test', globalTest.fetch)
    const defaultBaseUrl = api.getBaseUrl()
    const mockResult = [
      {
        name: 'first.server',
        ip: '1.2.2.2.'
      },
      {
        name: 'second.server',
        ip: '1.2.2.2.'
      }
    ]

    nock('https://all.api.radio-browser.info')
      .get('/json/servers')
      .reply(200, mockResult)

    const result = await api.resolveBaseUrl(false)

    expect(result).toEqual(mockResult)
    expect(api.getBaseUrl()).toBe(defaultBaseUrl)
  })

  test('Manually set base url', () => {
    const url = '1.2.3.4'

    const api = new RadioBrowserApi('test', globalTest.fetch)
    api.setBaseUrl(url)

    expect(api.getBaseUrl()).toBe(url)
  })

  test('Throw if resolve base url is not OK', async () => {
    const errorText = 'server error'
    nock(/radio-browser.info/)
      .get('/json/servers')
      .reply(500, errorText)

    const api = new RadioBrowserApi('test', globalTest.fetch)
    expect.assertions(1)
    try {
      await api.resolveBaseUrl()
    } catch (e) {
      const result = await e.text()
      expect(result).toBe(errorText)
    }
  })

  test('Custom user agent is present', async () => {
    nock(/radio-browser.info/)
      .get('/json/servers')
      .reply(200, [{ name: '', ip: '' }])

    const agent = 'test'
    const spy = jest.spyOn(globalTest, 'fetch')
    const api = new RadioBrowserApi(agent, globalTest.fetch)

    await api.resolveBaseUrl()

    expect(spy).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ 'user-agent': agent })
      })
    )
  })

  test('Custom headers are present', async () => {
    nock(/radio-browser.info/)
      .get('/json/servers')
      .reply(200, [{ name: '', ip: '' }])

    const api = new RadioBrowserApi('test', globalTest.fetch)
    const spy = jest.spyOn(globalTest, 'fetch')

    const headerName = 'x-jest-test'
    const headerValue = '1'

    await api.resolveBaseUrl(true, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(spy).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ [headerName]: headerValue })
      })
    )
  })

  test('get countries', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const country = 'germany'
    const query = { order: 'name', hideBroken: true }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get(`/json/countries/${country}`)
      .query({ order: 'name', hidebroken: 'true' })
      .reply(200, mockResult)

    const result = await api.getCountries(country, query as Query, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })

  test('get country by country code', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const country = 'RS'
    const query = { order: 'name', reverse: true }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get(`/json/countrycodes/${country}`)
      .query({
        hidebroken: 'true',
        ...query
      })
      .reply(200, mockResult)

    const result = await api.getCountryByCountryCode(country, query as Query, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })

  test('get codecs', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const query = { order: 'name', reverse: true }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get('/json/codecs')
      .query({
        hidebroken: 'true',
        ...query
      })
      .reply(200, mockResult)

    const result = await api.getCodecs(query as Query, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })

  test('get country states', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const country = 'Germany'
    const query = { order: 'name', reverse: true }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get(`/json/states/${country}`)
      .query({
        hidebroken: 'true',
        ...query
      })
      .reply(200, mockResult)

    const result = await api.getCountryStates(country, query as Query, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })

  test('get languages', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const language = 'ger'
    const query = { order: 'name', reverse: true }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get(`/json/languages/${language}`)
      .query({
        hidebroken: 'true',
        ...query
      })
      .reply(200, mockResult)

    const result = await api.getLanguages(language, query as Query, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })

  test('get tags', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const tag = 'jazz'
    const query = { order: 'name', reverse: true }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get(`/json/tags/${tag}`)
      .query({
        hidebroken: 'true',
        ...query
      })
      .reply(200, mockResult)

    const result = await api.getTags(tag, query as Query, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })
  describe('Get stations by', () => {
    test('by language', async () => {
      const userAgent = 'test'
      const api = new RadioBrowserApi(userAgent, globalTest.fetch)

      const headerName = 'x-jest-test'
      const headerValue = '1'
      const mockResult = [{ name: 'rs', stationcount: 10 }]
      const language = 'ger'
      const query = { order: 'name', reverse: true }

      const scope = nock(baseUrl, {
        reqheaders: {
          [headerName]: headerValue,
          'user-agent': userAgent
        }
      })
        .get(`/json/stations/bylanguage/${language}`)
        .query({
          hidebroken: 'true',
          ...query
        })
        .reply(200, mockResult)

      const result = await api.getStationsBy(
        StationSearchType.byLanguage,
        language,
        query as StationQuery,
        {
          headers: {
            [headerName]: headerValue
          }
        }
      )

      expect(scope.isDone()).toBe(true)
      expect(result).toEqual(mockResult)
    })

    test('by tag', async () => {
      const userAgent = 'test'
      const api = new RadioBrowserApi(userAgent, globalTest.fetch)

      const headerName = 'x-jest-test'
      const headerValue = '1'
      const mockResult = [{ name: 'rs', stationcount: 10 }]
      const tag = 'jazz'
      const query = { order: 'name', reverse: true }

      const scope = nock(baseUrl, {
        reqheaders: {
          [headerName]: headerValue,
          'user-agent': userAgent
        }
      })
        .get(`/json/stations/bytag/${tag}`)
        .query({
          hidebroken: 'true',
          ...query
        })
        .reply(200, mockResult)

      const result = await api.getStationsBy(
        StationSearchType.byTag,
        tag,
        query as StationQuery,
        {
          headers: {
            [headerName]: headerValue
          }
        }
      )

      expect(scope.isDone()).toBe(true)
      expect(result).toEqual(mockResult)
    })
    test('Throw if station search type does not exist', async () => {
      expect.assertions(1)

      const userAgent = 'test'
      const api = new RadioBrowserApi(userAgent, globalTest.fetch)
      try {
        await api.getStationsBy(
          // @ts-ignore
          'byColor', // does not exits
          'red'
        )
      } catch (e: any) {
        expect(e.message).toMatch(/search type does not exist/)
      }
    })
  })

  test('get all stations', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const query = { order: 'name', reverse: true }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get('/json/stations')
      .query({
        hidebroken: 'true',
        ...query
      })
      .reply(200, mockResult)

    const result = await api.getAllStations(query as StationQuery, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })

  test('send station click', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const stationUuid = '1234567890'

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get(`/json/url/${stationUuid}`)
      .reply(200, mockResult)

    const result = await api.sendStationClick(stationUuid, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })

  test('vote for station', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const stationUuid = '1234567890'

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get(`/json/vote/${stationUuid}`)
      .reply(200, mockResult)

    const result = await api.voteForStation(stationUuid, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })

  test('get stations by votes', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const country = 'RS'
    const query = { order: 'name', reverse: true }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get(`/json/countrycodes/${country}`)
      .query({
        hidebroken: 'true',
        ...query
      })
      .reply(200, mockResult)

    const result = await api.getCountryByCountryCode(country, query as Query, {
      headers: {
        [headerName]: headerValue
      }
    })

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })
  describe('Advanced station search', () => {
    // advanced station search
    test('by tag list', async () => {
      const userAgent = 'test'
      const api = new RadioBrowserApi(userAgent, globalTest.fetch)

      const headerName = 'x-jest-test'
      const headerValue = '1'
      const mockResult = [{ name: 'rs', stationcount: 10 }]
      const query = {
        taglist: 'rap,pop,jazz'
      }

      const scope = nock(baseUrl, {
        reqheaders: {
          [headerName]: headerValue,
          'user-agent': userAgent
        }
      })
        .get('/json/stations/search')
        .query({
          hidebroken: 'true',
          ...query
        })
        .reply(200, mockResult)

      const result = await api.searchStations(
        {
          tagList: ['rap', 'pop', 'jazz']
        },
        {
          headers: {
            [headerName]: headerValue
          }
        }
      )

      expect(scope.isDone()).toBe(true)
      expect(result).toEqual(mockResult)
    })
  })
  describe('Show or hide broken stations', () => {
    // advanced station search
    test('hide broken stations by default', async () => {
      const userAgent = 'test'
      const api = new RadioBrowserApi(userAgent, globalTest.fetch)

      const headerName = 'x-jest-test'
      const headerValue = '1'
      const mockResult = [{ name: 'rs', stationcount: 10 }]
      const query = {
        taglist: 'rap,pop,jazz'
      }

      const scope = nock(baseUrl, {
        reqheaders: {
          [headerName]: headerValue,
          'user-agent': userAgent
        }
      })
        .get('/json/stations/search')
        .query({
          hidebroken: 'true',
          ...query
        })
        .reply(200, mockResult)

      const result = await api.searchStations(
        {
          tagList: ['rap', 'pop', 'jazz']
        },
        {
          headers: {
            [headerName]: headerValue
          }
        }
      )

      expect(scope.isDone()).toBe(true)
      expect(result).toEqual(mockResult)
    })
  })

  test('hide broken stations explicitly', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const query = {
      taglist: 'rap,pop,jazz',
      hidebroken: 'true'
    }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get('/json/stations/search')
      .query(query)
      .reply(200, mockResult)

    const result = await api.searchStations(
      {
        tagList: ['rap', 'pop', 'jazz'],
        hideBroken: true
      },
      {
        headers: {
          [headerName]: headerValue
        }
      }
    )

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })
  test('Show broken stations', async () => {
    const userAgent = 'test'
    const api = new RadioBrowserApi(userAgent, globalTest.fetch)

    const headerName = 'x-jest-test'
    const headerValue = '1'
    const mockResult = [{ name: 'rs', stationcount: 10 }]
    const query = {
      taglist: 'rap,pop,jazz',
      hidebroken: 'false'
    }

    const scope = nock(baseUrl, {
      reqheaders: {
        [headerName]: headerValue,
        'user-agent': userAgent
      }
    })
      .get('/json/stations/search')
      .query(query)
      .reply(200, mockResult)

    const result = await api.searchStations(
      {
        tagList: ['rap', 'pop', 'jazz'],
        hideBroken: false
      },
      {
        headers: {
          [headerName]: headerValue
        }
      }
    )

    expect(scope.isDone()).toBe(true)
    expect(result).toEqual(mockResult)
  })
})
