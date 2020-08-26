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
function createQueryParams(params?: object): string {
  let result = ''
  if (params) {
    result += '?'
    for (const [key, value] of Object.entries(params)) {
      result += `&${key}=${encodeURIComponent(value)}`
    }
  }

  return result
}

export class RadioBrowser {
  protected static baseUrl: string = 'https://fr1.api.radio-browser.info/json'

  protected fetchConfig: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  // todo preko konstruktora u header ce da idu app name i sta vec treba
  constructor(protected userAgent: string) {
    this.fetchConfig.headers = { 'user-agent': this.userAgent }
  }

  static async resolveBaseUrl(
    autoSet = true
  ): Promise<{ ip: string; name: string }> {
    // alternative 'http://all.api.radio-browser.info/json/servers',
    const url = 'https://fr1.api.radio-browser.info/json/servers'
    const response = await fetch(url)

    if (response.ok) {
      const result = await response.json()
      if (autoSet) {
        this.baseUrl = result[0].ip
      }

      return result
    } else {
      throw response
    }
  }

  static setBaseUrl(url: string): void {
    this.baseUrl = url
  }

  static getBaseUrl(): string {
    return this.baseUrl
  }

  protected buildRequest(
    endPoint: string,
    search?: string,
    config?: object
  ): string {
    search = search ? `/${encodeURIComponent(search)}` : ''
    const query = config ? createQueryParams(config) : ''

    return `${RadioBrowser.baseUrl}/${endPoint}${search}${query}`
  }

  protected async runRequest<T>(
    url: string,
    config: RequestInit = {}
  ): Promise<T> {
    // manual merge deep
    const headers = Object.assign({}, this.fetchConfig.headers, config.headers)
    const fetchConfig = Object.assign({}, this.fetchConfig, config)
    fetchConfig.headers = headers

    const response = await fetch(url, fetchConfig)

    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
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
    search = search ? `/${search.toUpperCase()}` : ''

    return this.runRequest(
      this.buildRequest('countrycodes', search, query),
      fetchConfig
    )
  }

  async getCodecs(
    search?: string,
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    search = search ? `/${search.toUpperCase()}` : ''

    return this.runRequest(
      this.buildRequest('codecs', search, query),
      fetchConfig
    )
  }

  async getCountryStates(
    search?: string,
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryStateResult[]> {
    return this.runRequest(
      this.buildRequest('states', search, query),
      fetchConfig
    )
  }

  async getLanguages(
    search?: string,
    config?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    return this.runRequest(
      this.buildRequest('languages', search, config),
      fetchConfig
    )
  }

  async getTags(
    search?: string,
    config?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    search = search ? search.toLowerCase() : ''

    return this.runRequest(
      this.buildRequest('languages', search, config),
      fetchConfig
    )
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

    return this.runRequest(
      this.buildRequest('stations', `${searchType}/${search}`, query),
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

  async searchStations(
    query: AdvancedStationQuery,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.runRequest(
      this.buildRequest('search', undefined, query),
      fetchConfig
    )
  }
}
