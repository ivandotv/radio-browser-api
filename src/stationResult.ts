// todo - don't export just the type
export type StationResult = {
  changeUUID: string
  stationUUID: string
  name: string
  url: string
  urlResolved: string
  homepage: string
  favicon: string
  tags: string[]
  country: string
  countryCode: string
  state: string
  language: string[]
  votes: number
  lastChangeTime: Date
  codec: string
  bitrate: number
  hls: boolean
  lastCheckOk: boolean
  lastCheckTime: Date
  lastCheckOKTime: Date
  clickTimeStamp: Date
  clickCount: number
  clickTrend: number
}
