import {
  StationSearchType,
  AdvancedStationQuery,
  CountryResult,
  CountryStateResult,
  Query,
  Station,
  StationQuery
} from './constants'

// todo list of station checks
// todo list of station clicks

export class RadioBrowserApi {
  protected baseUrl = 'https://fr1.api.radio-browser.info/json'

  protected fetchConfig: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  constructor(protected userAgent: string, protected fetchImpl: typeof fetch) {
    this.fetchConfig.headers = { 'user-agent': this.userAgent }
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

  async getCountryByCountryCode(
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
    tag = tag ? tag.toLowerCase() : ''

    return this.runRequest(this.buildRequest('tags', tag, config), fetchConfig)
  }

  // http://fr1.api.radio-browser.info/{format}/stations/byuuid/{searchterm}
  async getStationsBy(
    searchType: keyof typeof StationSearchType,
    search?: string,
    query?: StationQuery,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    // searchType = searchType.toLowerCase() as keyof typeof StationSearchType
    if (!StationSearchType[searchType]) {
      throw new Error(`search type does not exist: ${searchType}`)
    }

    search = search ? search.toLowerCase() : ''

    return this.runRequest(
      this.buildRequest(`stations/${searchType.toLowerCase()}`, search, query),
      fetchConfig
    )
  }

  async getAllStations(
    query?: Omit<StationQuery, 'hideBroken'>,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.runRequest(
      this.buildRequest('stations', '', query),
      fetchConfig
    )
  }

  async searchStations(
    query: AdvancedStationQuery,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.runRequest(
      this.buildRequest('stations/search', undefined, query),
      fetchConfig
    )
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
    return this.runRequest(this.buildRequest('url', uuid), fetchConfig)
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

  protected buildRequest(
    endPoint: string,
    search?: string,
    query?: object
  ): string {
    search = search ? `/${encodeURIComponent(search)}` : ''
    const queryParams = query ? this.createQueryParams(query) : ''

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
