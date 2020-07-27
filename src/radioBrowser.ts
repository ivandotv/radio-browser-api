import { serialize } from 'v8'

export class RadioBrowser {
  protected rootUrl: string = 'http://fr1.api.radio-browser.info/json'

  constructor() {}

  async getCountries(
    search?: string,
    config?: GetCountriesConfig
  ): CountryResult {
    search = search ? `/${encodeURIComponent(search)}` : ''
    const response = await fetch(`${this.rootUrl}/countries${search}`)
  }

  async getCountryCodes(search?: string, config?: CountryCodes): CountryResult {
    search = search ? `/${search.toUpperCase()}` : ''

    const response = await fetch(`${this.rootUrl}/countrycodes${search}`)
  }

  async getCodecs(search?: string, config?: CountryCodes): CountryResult {
    search = search ? `/${search.toUpperCase()}` : ''

    const response = await fetch(`${this.rootUrl}/codecs${search}`)
  }

  async getCountryStates(
    search?: string,
    config?: CountryCodes
  ): CountryStatesResult {
    search = search ? `/${search.toUpperCase()}` : ''

    const response = await fetch(`${this.rootUrl}/states${search}`)
  }

  async getLanguages(search?: string, config?: CountryCodes): CountryResult {
    search = search ? `/${search}` : ''

    const response = await fetch(`${this.rootUrl}/languages${search}`)
  }

  async getTags(search?: string, config?: CountryCodes): CountryResult {
    search = search ? `/${search.toLocaleLowerCase()}` : ''

    const response = await fetch(`${this.rootUrl}/tags${search}`)
  }
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
