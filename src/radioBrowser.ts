import {
  StationSearchType,
  AdvancedStationQuery,
  CountryResult,
  CountryStateResult,
  Query,
  Station,
  StationQuery,
  StationResponse
} from './constants'

export class RadioBrowserApi {
  protected baseUrl = 'https://fr1.api.radio-browser.info/json'

  hideBroken: boolean

  protected fetchConfig: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  constructor(
    protected fetchImpl: typeof fetch,
    protected userAgent?: string,
    hideBroken = true
  ) {
    if (this.userAgent) {
      this.fetchConfig.headers = { 'user-agent': this.userAgent }
    }
    this.hideBroken = hideBroken
  }

  async resolveBaseUrl(
    autoSet = true,
    config: RequestInit = {}
  ): Promise<{ ip: string; name: string }[]> {
    const result = await this.runRequest<{ name: string; ip: string }[]>(
      'https://all.api.radio-browser.info/json/servers',
      config
    )

    if (autoSet) {
      this.baseUrl = `https://${result[0].name}`
    }

    return result
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url
  }

  getBaseUrl(): string {
    return this.baseUrl
  }

  async getCountries(
    search?: string,
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    return this.runRequest(
      this.buildRequest('countries', search, query),
      fetchConfig
    )
  }

  async getCountryCodes(
    search?: string,
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    search = search ? `${search.toUpperCase()}` : ''

    return this.runRequest(
      this.buildRequest('countrycodes', search, query),
      fetchConfig
    )
  }

  async getCodecs(
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    return this.runRequest(this.buildRequest('codecs', '', query), fetchConfig)
  }

  async getCountryStates(
    country?: string,
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryStateResult[]> {
    return this.runRequest(
      this.buildRequest('states', country, query),
      fetchConfig
    )
  }

  async getLanguages(
    language?: string,
    config?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    return this.runRequest(
      this.buildRequest('languages', language, config),
      fetchConfig
    )
  }

  async getTags(
    tag?: string,
    config?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    tag = tag ? tag.toLowerCase() : '' // empty string returns all tags

    return this.runRequest(this.buildRequest('tags', tag, config), fetchConfig)
  }

  // http://fr1.api.radio-browser.info/{format}/stations/byuuid/{searchterm}
  async getStationsBy(
    searchType: keyof typeof StationSearchType,
    search?: string,
    query?: StationQuery,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    if (!StationSearchType[searchType]) {
      throw new Error(`search type does not exist: ${searchType}`)
    }

    search = search ? search.toLowerCase() : ''

    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest(`stations/${searchType.toLowerCase()}`, search, query),
      fetchConfig
    )

    return this.normalizeStations(stations)
  }

  protected normalizeStations(stations: StationResponse[]): Station[] {
    const result = []
    const duplicates: { [key: string]: boolean } = {}

    for (const response of stations) {
      const nameAndUrl = `${response.name
        .toLowerCase()
        .trim()}${response.url.toLowerCase().trim()}`

      // guard against results having the same stations under different id's
      if (duplicates[nameAndUrl]) continue

      duplicates[nameAndUrl] = true

      const station: Station = {
        changeId: response.changeuuid,
        id: response.stationuuid,
        name: response.name,
        url: response.url,
        urlResolved: response.url_resolved,
        homepage: response.homepage,
        favicon: response.favicon,
        country: response.country,
        countryCode: response.countrycode,
        state: response.state,
        votes: response.votes,
        codec: response.codec,
        bitrate: response.bitrate,
        clickCount: response.clickcount,
        clickTrend: response.clicktrend,
        hls: Boolean(response.hls),
        lastCheckOk: Boolean(response.lastcheckok),
        lastChangeTime: new Date(response.lastchangetime),
        lastCheckOkTime: new Date(response.lastcheckoktime),
        clickTimestamp: new Date(response.clicktimestamp),
        lastLocalCheckTime: new Date(response.lastlocalchecktime),
        language: response.language.split(','),
        lastCheckTime: new Date(response.lastchecktime),
        tags: [...new Set(response.tags.split(','))].filter(
          (tag) => tag.length > 0 && tag.length < 10
        ) // drop duplicates and tags over 10 characters
      }

      result.push(station)
    }

    return result
  }

  async getAllStations(
    query?: Omit<StationQuery, 'hideBroken'>,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest('stations', '', query),
      fetchConfig
    )

    return this.normalizeStations(stations)
  }

  async searchStations(
    query: AdvancedStationQuery,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest('stations/search', undefined, query),
      fetchConfig
    )

    return this.normalizeStations(stations)
  }

  async getStationsByClicks(
    limit?: number,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.resolveGetStations('topclick', limit, fetchConfig)
  }

  async getStationsByVotes(
    limit?: number,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.resolveGetStations('topvote', limit, fetchConfig)
  }

  async getStationsByRecentClicks(
    limit?: number,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.resolveGetStations('lastclick', limit, fetchConfig)
  }

  async sendStationClick(
    uuid: string,
    fetchConfig?: RequestInit
  ): Promise<{
    ok: boolean
    message: string
    stationuuid: string
    name: string
    url: string
  }> {
    return this.runRequest(
      this.buildRequest('url', uuid, undefined, false),
      fetchConfig
    )
  }

  async voteForStation(
    uuid: string,
    fetchConfig?: RequestInit
  ): Promise<{
    ok: boolean
    message: string
    stationuuid: string
    name: string
    url: string
  }> {
    return this.runRequest(this.buildRequest('vote', uuid), fetchConfig)
  }

  async getStationsById(
    ids: string[],
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    const stationsIds = ids.join(',')
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest(
        `stations/byuuid/${stationsIds}`,
        undefined,
        undefined,
        false
      ),
      fetchConfig
    )

    return this.normalizeStations(stations)
  }

  async getStationByUrl(
    url: string,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest(`stations/byurl/${url}`, undefined, undefined, false),
      fetchConfig
    )

    return this.normalizeStations(stations)
  }

  protected async resolveGetStations(
    endPoint: string,
    limit?: number,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    const limitStations = limit ? `/${limit}` : ''
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest(
        `stations/${endPoint}${limitStations}`,
        undefined,
        undefined,
        false
      ),
      fetchConfig
    )

    return this.normalizeStations(stations)
  }

  protected buildRequest(
    endPoint: string,
    search?: string,
    query?: Query | AdvancedStationQuery | StationQuery,
    addHideBrokenParam = true
  ): string {
    search = search ? `/${encodeURIComponent(search)}` : ''

    let queryCopy
    if (query) {
      queryCopy = { ...query }
      if ('tagList' in queryCopy && Array.isArray(queryCopy.tagList)) {
        queryCopy.tagList = [...queryCopy.tagList]
      }
      if (addHideBrokenParam && typeof queryCopy.hideBroken === 'undefined') {
        queryCopy.hideBroken = this.hideBroken
      }
    }

    const queryParams = queryCopy ? this.createQueryParams(queryCopy) : ''

    return `${this.baseUrl}/${endPoint}${search}${queryParams}`
  }

  protected async runRequest<T>(
    url: string,
    config: RequestInit = {}
  ): Promise<T> {
    // manual merge deep
    const headers = Object.assign({}, this.fetchConfig.headers, config.headers)
    const fetchConfig = Object.assign({}, this.fetchConfig, config)
    fetchConfig.headers = headers

    const response = await this.fetchImpl(url, fetchConfig)

    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  }

  protected createQueryParams(params?: object): string {
    let result = ''
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        result += `&${key}=${encodeURIComponent(value)}`
      }
    }

    return result ? `?${result.slice(1).toLowerCase()}` : ''
  }
}
