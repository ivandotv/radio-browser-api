import { StationResult } from './stationResult'

// todo  - move from class to functions
export class RadioBrowser {
  protected rootUrl: string = 'http://fr1.api.radio-browser.info/json'

  constructor() {}

  async getCountries(
    search?: string,
    config?: GetCountriesConfig
  ): CountryResult[] {
    search = search ? `/${encodeURIComponent(search)}` : ''
    const response = await fetch(`${this.rootUrl}/countries${search}`)
  }

  async getCountryCodes(
    search?: string,
    config?: CountryCodes
  ): CountryResult[] {
    search = search ? `/${search.toUpperCase()}` : ''

    const response = await fetch(`${this.rootUrl}/countrycodes${search}`)
  }

  async getCodecs(search?: string, config?: CountryCodes): CountryResult[] {
    search = search ? `/${search.toUpperCase()}` : ''

    const response = await fetch(`${this.rootUrl}/codecs${search}`)
  }

  async getCountryStates(
    search?: string,
    config?: CountryCodes
  ): CountryStatesResult[] {
    search = search ? `/${search.toUpperCase()}` : ''

    const response = await fetch(`${this.rootUrl}/states${search}`)
  }

  async getLanguages(search?: string, config?: CountryCodes): CountryResult[] {
    search = search ? `/${search}` : ''

    const response = await fetch(`${this.rootUrl}/languages${search}`)
  }

  async getTags(search?: string, config?: CountryCodes): CountryResult[] {
    search = search ? `/${search.toLocaleLowerCase()}` : ''

    const response = await fetch(`${this.rootUrl}/tags${search}`)
  }

  // http://fr1.api.radio-browser.info/{format}/stations/byuuid/{searchterm}
  // mmm main method
  async getStations(
    searchType: keyof typeof StationSearchType,
    search: string,
    _config?: SearchStationConfig
  ): StationResult[] {
    if (!StationSearchType[searchType]) {
      throw new Error(`wrong search type: ${searchType}`)
    }
    search = search.toLocaleLowerCase()

    const response = await fetch(
      `${this.rootUrl}/${StationSearchType[
        searchType
      ].toLocaleLowerCase()}/${search}`
    )

    // return response
  }

  async getAllStations(
    _config?: Omit<SearchStationConfig, 'hideBroken'>
  ): StationResult[] {
    if (!StationSearchType[searchType]) {
      throw new Error(`wrong search type: ${searchType}`)
    }
    search = search.toLocaleLowerCase()

    const response = await fetch(
      `${this.rootUrl}/${StationSearchType[
        searchType
      ].toLocaleLowerCase()}/${search}`
    )

    // return response
  }
}

export const StationSearchType = {
  uuid: 'uuid',
  name: 'name',
  nameExact: 'nameExact',
  codec: 'codec',
  codexExact: 'codecExact',
  country: 'country',
  countryExact: 'countryExact',
  countryCodeExact: 'countryCodeExact',
  state: 'state',
  stateExact: 'stateExact',
  language: 'language',
  languageExact: 'languageExact',
  tag: 'tag',
  tagExact: 'tagExact'
} as const

export const StationSearchOrder = {
  name: 'name',
  url: 'url',
  homepage: 'homepage',
  favicon: 'favicon',
  tags: 'tags',
  country: 'country',
  state: 'state',
  language: 'language',
  votes: 'votes',
  codec: 'codec',
  bitrate: 'bitrate',
  lastCheckOK: 'lastCheckOK',
  lastCheckTime: 'lastCheckTime',
  clickTimeStamp: 'clickTimeStamp',
  clickCount: 'clickCount',
  clickTrend: 'clickTrend',
  random: 'random'
} as const

export type SearchStationConfig = {
  offset?: number
  limit?: number
  reverse?: boolean
  order?: keyof typeof StationSearchOrder
  hideBroken?: boolean
}

export type CountryStates = GetCountriesConfig & { country: string }
export type GetCountriesConfig = {
  order?: 'name' | 'stationcount'
  reverse?: boolean
  hideBroken?: boolean
}

export type CountryCodes = GetCountriesConfig

// valid for country codes also
export type CountryResult = {
  name: string
  stationcount: number
}

export type CountryStatesResult = CountryResult & {
  country: string
}
// function parseConfig(config: any): string {
//   for (const prop in config) {
//   }
// }
