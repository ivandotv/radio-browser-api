import {
  StationSearchType,
  AdvancedStationQuery,
  CountryResult,
  CountryStateResult,
  Query,
  Station,
  StationQuery,
  StationResponse,
  TagResult
} from './constants'

/**
 * Query the radio browser api.
 * @public
 */
export class RadioBrowserApi {
  static version = __VERSION__

  protected baseUrl: string | undefined

  protected fetchConfig: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  /**
   * Creates an instance of radio browser api.
   * @param appName - App name to be used as user agent header to indentify the calls to the API
   * @param hideBroken - Hide broken stations for all future API calls
   */
  constructor(protected appName: string, protected hideBroken = true) {
    if (!appName) {
      throw new Error('appName is required')
    }
    this.fetchConfig.headers = { 'user-agent': this.appName }
  }

  /**
   * Resolves API base url this will be the default for all class instances.
   * @param autoSet - Automatically set first resolved base url
   * @param config-  Fetch configuration
   * @returns Array of objects with the ip and name of the api server
   */
  async resolveBaseUrl(
    config: RequestInit = {}
  ): Promise<{ ip: string; name: string }[]> {
    let result: { ip: string; name: string }[]

    // temporary fix for https cert error when in frontend
    // hardcode the server
    // https://github.com/segler-alex/radiobrowser-api-rust/issues/122
    // if (typeof window !== 'undefined') {
    //   return [{ ip: '45.77.62.161', name: 'fr1.api.radio-browser.info' }]
    // }
    const response = await fetch(
      // this should be https when the above issue is resolved
      'http://all.api.radio-browser.info/json/servers',
      config
    )
    if (response.ok) {
      result = await response.json()

      return result
    } else {
      throw response
    }
  }

  /**
   * Sets base url for all api calls
   * @param url - Url to the api server
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url
  }

  /**
   * Get current  base url
   * @returns Base url
   */
  getBaseUrl(): string | undefined {
    return this.baseUrl
  }

  /**
   * Gets available countries
   * @param search - Search for country
   * @param query - Query params
   * @param fetchConfig - Fetch configuration
   * @returns Array of country results with the name of the station and station count
   */
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

  /**
   * Gets countries by country code
   * @param search - Country code
   * @param query  - Query
   * @param fetchConfig - Fetch configuration
   * @returns Array of country results with the name of the station and station count
   */
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

  /**
   * Gets available codes
   * @param query - Query
   * @param fetchConfig -  Fetch configuration
   * @returns List of available codes
   */
  async getCodecs(
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    return this.runRequest(this.buildRequest('codecs', '', query), fetchConfig)
  }

  /**
   * Gets country states. States **should** be regions inside a country.
   * @param country - Limit state to particular country
   * @param query - Query
   * @param fetchConfig - Fetch configuration
   * @returns Array of country states
   */
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

  /**
   * Gets all available languages
   * @param language- Limit results to particular language
   * @param query -  Query
   * @param fetchConfig - Fetch configuration
   * @returns Array of language results
   */
  async getLanguages(
    language?: string,
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<CountryResult[]> {
    return this.runRequest(
      this.buildRequest('languages', language, query),
      fetchConfig
    )
  }

  /**
   * Gets all available tags
   * @param tag - Limit results to particular tag
   * @param query - Query
   * @param fetchConfig - Fetch configuration
   * @returns List of tag results
   */
  async getTags(
    tag?: string,
    query?: Query,
    fetchConfig?: RequestInit
  ): Promise<TagResult[]> {
    tag = tag ? tag.toLowerCase() : '' // empty string returns all tags

    return this.runRequest(this.buildRequest('tags', tag, query), fetchConfig)
  }

  /**
   * Gets stations by various available parameters
   * @param searchType - Parameter for the search
   * @param search - Search value for the parameter
   * @param query - Query
   * @param fetchConfig - Fetch configuration
   * @param removeDuplicates - remove duplicate stations
   * @returns Array of station results
   */
  async getStationsBy(
    searchType: keyof typeof StationSearchType,
    search?: string,
    query?: StationQuery,
    fetchConfig?: RequestInit,
    removeDuplicates = false
  ): Promise<Station[]> {
    if (!StationSearchType[searchType]) {
      throw new Error(`search type does not exist: ${searchType}`)
    }

    search = search ? search.toLowerCase() : ''

    // http://fr1.api.radio-browser.info/{format}/stations/byuuid/{searchterm}
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest(`stations/${searchType.toLowerCase()}`, search, query),
      fetchConfig
    )

    return this.normalizeStations(stations, removeDuplicates)
  }

  /**
   * Normalizes stations from the API response
   * @param stations - Array of station responses
   * @param removeDuplicates - remove duplicate stations
   * @returns Array of normalized stations
   */
  protected normalizeStations(
    stations: StationResponse[],
    removeDuplicates = false
  ): Station[] {
    const result = []
    const duplicates: { [key: string]: boolean } = {}

    for (const response of stations) {
      if (removeDuplicates) {
        const nameAndUrl = `${response.name.toLowerCase().trim()}${response.url
          .toLowerCase()
          .trim()}`

        // guard against results having the same stations under different id's
        if (duplicates[nameAndUrl]) continue

        duplicates[nameAndUrl] = true
      }

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
        geoLat: response.geo_lat,
        geoLong: response.geo_long,
        tags: Array.from(new Set(response.tags.split(','))).filter(
          (tag) => tag.length > 0 && tag.length < 10
        ) // drop duplicates and tags over 10 characters
      }

      result.push(station)
    }

    return result
  }

  /**
   * Gets all available stations. Please note that if results
   * are not limited somehow, they can be huge (size in MB)
   * @param query - Query
   * @param fetchConfig - Fetch configuration
   * @param removeDuplicates - remove duplicate stations
   * @returns Array of all available stations
   */
  async getAllStations(
    query?: Omit<StationQuery, 'hidebroken'>,
    fetchConfig?: RequestInit,
    removeDuplicates = false
  ): Promise<Station[]> {
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest('stations', '', query),
      fetchConfig
    )

    return this.normalizeStations(stations, removeDuplicates)
  }

  /**
   * Searches stations by particular params
   * @param query - Query
   * @param fetchConfig - Fetch configuration
   * @param removeDuplicates - remove duplicate stations
   * @returns Array of station results
   */
  async searchStations(
    query: AdvancedStationQuery,
    fetchConfig?: RequestInit,
    removeDuplicates = false
  ): Promise<Station[]> {
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest('stations/search', undefined, query),
      fetchConfig
    )

    return this.normalizeStations(stations, removeDuplicates)
  }

  /**
   * Gets stations by clicks. Stations with the highest number of clicks are most popular
   * @param limit - Limit the number of returned stations
   * @param fetchConfig - Fetch configuration
   * @returns Array of stations
   */
  async getStationsByClicks(
    limit?: number,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.resolveGetStations('topclick', limit, fetchConfig)
  }

  /**
   * Gets stations by votes. Returns most voted stations
   * @param limit - Limit the number of returned stations
   * @param fetchConfig - Fetch configuration
   * @returns Array of stations
   */
  async getStationsByVotes(
    limit?: number,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.resolveGetStations('topvote', limit, fetchConfig)
  }

  /**
   * Gets stations by recent clicks. They are basically most recently listened stations.
   * @param limit - Limit the number of returned stations
   * @param fetchConfig - Fetch configuration
   * @returns Array of stations
   */
  async getStationsByRecentClicks(
    limit?: number,
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    return this.resolveGetStations('lastclick', limit, fetchConfig)
  }

  /**
   * Sends click for the station. This method should be used when user starts to listen to the station.
   * @param id - Station id
   * @param fetchConfig  - Fetch configuration
   * @returns Station click object
   */
  async sendStationClick(
    id: string,
    fetchConfig?: RequestInit
  ): Promise<{
    ok: boolean
    message: string
    stationuuid: string
    name: string
    url: string
  }> {
    return this.runRequest(
      this.buildRequest('url', id, undefined, false),
      fetchConfig
    )
  }

  /**
   * Votes for station. This method should be used when user adds the station to favourites etc..
   * @param id - Station id
   * @param fetchConfig - Fetch configuration
   * @returns Station vote object
   */
  async voteForStation(
    id: string,
    fetchConfig?: RequestInit
  ): Promise<{
    ok: boolean
    message: string
    stationuuid: string
    name: string
    url: string
  }> {
    return this.runRequest(this.buildRequest('vote', id), fetchConfig)
  }

  /**
   * Gets stations by station id
   * @param ids - Array of station id's
   * @param fetchConfig - Fetch configuration
   * @returns Array of stations
   */
  async getStationsById(
    ids: string[],
    fetchConfig?: RequestInit
  ): Promise<Station[]> {
    const stationsIds = ids.join(',')
    const stations = await this.runRequest<StationResponse[]>(
      this.buildRequest(
        `stations/byuuid?uuids=${stationsIds}`,
        undefined,
        undefined,
        false
      ),
      fetchConfig
    )

    return this.normalizeStations(stations)
  }

  /**
   * Gets station by station url
   * @param url - Station url
   * @param fetchConfig - Fetch configuration
   * @returns Array of stations
   */
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

  /**
   * Builds request to the API
   * @param endPoint - API endpoint
   * @param search - Search term
   * @param query - Query
   * @param addHideBrokenParam - Hide broken stations from the results
   * @returns Built request string
   */
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
      if (addHideBrokenParam && queryCopy.hideBroken === undefined) {
        queryCopy.hideBroken = this.hideBroken
      }
    }

    const queryParams = queryCopy ? this.createQueryParams(queryCopy) : ''

    return `${endPoint}${search}${queryParams}`
  }

  /**
   * Fires of the request to the API
   * @param url - Request url
   * @param fetchConfig - Fetch configuration
   * @returns Fetch response
   */
  protected async runRequest<T>(
    url: string,
    fetchConfig: RequestInit = {}
  ): Promise<T> {
    const finalConfig = {
      ...this.fetchConfig,
      ...fetchConfig,
      headers: {
        ...this.fetchConfig.headers,
        ...fetchConfig.headers
      }
    }

    if (!this.baseUrl) {
      const results = await this.resolveBaseUrl()
      const random = Math.floor(Math.random() * results.length)
      this.baseUrl = `https://${results[random].name}`
    }

    const response = await fetch(`${this.baseUrl}/json/${url}`, finalConfig)

    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  }

  /**
   * Encodes query parameters
   * @param params - Object that represents paramters as key value pairs
   * @returns  String of encoded query parameters
   */
  protected createQueryParams(params?: object): string {
    let result = ''
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        let finalKey = key.toLowerCase()

        switch (finalKey) {
          case 'hasgeoinfo':
            finalKey = 'has_geo_info'
            break
          case 'hidebroken':
            finalKey = 'hidebroken'
            break

          case 'taglist':
            // github.com/segler-alex/radiobrowser-api-rust/issues/80
            finalKey = 'tagList' // tagList is the only one that is not lowercased
        }

        result += `&${finalKey}=${encodeURIComponent(value)}`
      }
    }

    return result.length ? `?${result.slice(1)}` : ''
  }
}
