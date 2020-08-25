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
  uuid: 'byuuid',
  name: 'byname',
  nameExact: 'bynameexact',
  codec: 'bycodec',
  codexExact: 'bycodecexact',
  country: 'bycountry',
  countryExact: 'bycountryexact',
  countryCodeExact: 'bycountrycodeexact',
  state: 'bystate',
  stateExact: 'bystateexact',
  language: 'bylanguage',
  languageExact: 'bylanguageexact',
  tag: 'bytag',
  tagExact: 'bytagexact'
} as const

export type Station = {
  changeuuid: string
  stationuuid: string
  name: string
  url: string
  urlresolved: string
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

export type AdvancedStationQuery = {
  name: string
  nameExact: boolean
  country: string
  countryExact: boolean
  countryCode: string
  state: string
  stateExact: boolean
  language: string
  languageExact: boolean
  tag: string
  tagExact: boolean
  tagList: string[]
  codec: string
  bitrateMin: string
  bitrateMax: string
  order: keyof typeof StationSearchOrder
  reverse: boolean
  offset: number
  limit: number
}

export type StationQuery = {
  offset?: number
  limit?: number
  reverse?: boolean
  order?: keyof typeof StationSearchOrder
  hideBroken?: boolean
}

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
