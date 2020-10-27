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

export const StationSearchType = {
  byUuid: 'byUuid',
  byName: 'byName',
  byNameExact: 'byNameExact',
  byCodec: 'byCodec',
  byCodexExact: 'byCodecExact',
  byCountry: 'byCountry',
  byCountryExact: 'byCountryExact',
  byCountryCodeExact: 'byCountryCodeExact',
  byState: 'byState',
  byStateExact: 'byStateExact',
  byLanguage: 'byLanguage',
  byLanguageExact: 'byLanguageexact',
  byTag: 'byTag',
  byTagExact: 'byTagExact'
} as const

export type Station = {
  changeuuid: string
  stationuuid: string
  name: string
  url: string
  // eslint-disable-next-line
  url_resolved: string
  homepage: string
  favicon: string
  tags: string[]
  country: string
  countrycode: string
  state: string
  language: string[]
  votes: number
  lastchangetime: Date
  codec: string
  bitrate: number
  hls: boolean
  lastcheckok: boolean
  lastchecktime: Date
  lastcheckoktime: Date
  clicktimestamp: Date
  clickcount: number
  clicktrend: number
}

export type StationQuery = {
  offset?: number
  limit?: number
  reverse?: boolean
  order?: keyof typeof StationSearchOrder
  hideBroken?: boolean
}

export type AdvancedStationQuery = {
  name?: string
  nameExact?: boolean
  country?: string
  countryExact?: boolean
  countryCode?: string
  state?: string
  stateExact?: boolean
  language?: string
  languageExact?: boolean
  tag?: string
  tagExact?: boolean
  tagList?: string[]
  codec?: string
  bitrateMin?: string
  bitrateMax?: string
} & StationQuery

export type Query = {
  order?: 'name' | 'stationcount'
  reverse?: boolean
  hideBroken?: boolean
} & Object

// valid for country codes also
export type CountryResult = {
  name: string
  stationcount: number
}

export type CountryStateResult = CountryResult & {
  country: string
}
