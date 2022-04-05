import { Station, StationResponse } from '../../../src/constants'

export function getMockResponse(): StationResponse {
  return {
    changeuuid: '9619b77b-0601-11e8-ae97-52543be04c81',
    stationuuid: '9619b778-0601-11e8-ae97-52543be04c81',
    name: 'Radio 021',
    url: 'http://109.206.96.106:8000/',
    url_resolved: 'http://109.206.96.106:8000/',
    homepage: 'http://www.021.rs/',
    favicon: 'http://www.021.rs/favicon.ico',
    tags: 'talk,music,news',
    country: 'Serbia',
    countrycode: 'RS',
    state: 'Vojvodina',
    language: 'serbian,english,german',
    votes: 44,
    lastchangetime: '2020-01-19 13:17:10',
    codec: 'MP3',
    bitrate: 128,
    hls: 0,
    lastcheckok: 1,
    lastchecktime: '2020-10-27 06:04:51',
    lastcheckoktime: '2020-10-27 06:04:51',
    lastlocalchecktime: '2020-10-27 06:04:51',
    clicktimestamp: '2020-10-25 18:33:05',
    clickcount: 14,
    clicktrend: -1,
    geo_lat: 47.70441105302798,
    geo_long: 14.795494079589846
  }
}

export function getMockStation(): Station {
  return {
    changeId: '9619b77b-0601-11e8-ae97-52543be04c81',
    id: '9619b778-0601-11e8-ae97-52543be04c81',
    name: 'Radio 021',
    url: 'http://109.206.96.106:8000/',
    urlResolved: 'http://109.206.96.106:8000/',
    homepage: 'http://www.021.rs/',
    favicon: 'http://www.021.rs/favicon.ico',
    tags: ['talk', 'music', 'news'],
    country: 'Serbia',
    countryCode: 'RS',
    state: 'Vojvodina',
    language: ['serbian', 'english', 'german'],
    votes: 44,
    lastChangeTime: new Date('2020-01-19 13:17:10'),
    codec: 'MP3',
    bitrate: 128,
    hls: Boolean(0),
    lastCheckOk: Boolean(1),
    lastCheckTime: new Date('2020-10-27 06:04:51'),
    lastCheckOkTime: new Date('2020-10-27 06:04:51'),
    lastLocalCheckTime: new Date('2020-10-27 06:04:51'),
    clickTimestamp: new Date('2020-10-25 18:33:05'),
    clickCount: 14,
    clickTrend: -1,
    geoLat: 47.70441105302798,
    geoLong: 14.795494079589846
  }
}

export function getMockResponseWithoutGeoInfo(): StationResponse {
  return {
    changeuuid: '9619b77b-0601-11e8-ae97-52543be04c81',
    stationuuid: '9619b778-0601-11e8-ae97-52543be04c81',
    name: 'Radio 021',
    url: 'http://109.206.96.106:8000/',
    url_resolved: 'http://109.206.96.106:8000/',
    homepage: 'http://www.021.rs/',
    favicon: 'http://www.021.rs/favicon.ico',
    tags: 'talk,music,news',
    country: 'Serbia',
    countrycode: 'RS',
    state: 'Vojvodina',
    language: 'serbian,english,german',
    votes: 44,
    lastchangetime: '2020-01-19 13:17:10',
    codec: 'MP3',
    bitrate: 128,
    hls: 0,
    lastcheckok: 1,
    lastchecktime: '2020-10-27 06:04:51',
    lastcheckoktime: '2020-10-27 06:04:51',
    lastlocalchecktime: '2020-10-27 06:04:51',
    clicktimestamp: '2020-10-25 18:33:05',
    clickcount: 14,
    clicktrend: -1,
    geo_lat: null,
    geo_long: null
  }
}

export function getMockStationWithoutGeoInfo(): Station {
  return {
    changeId: '9619b77b-0601-11e8-ae97-52543be04c81',
    id: '9619b778-0601-11e8-ae97-52543be04c81',
    name: 'Radio 021',
    url: 'http://109.206.96.106:8000/',
    urlResolved: 'http://109.206.96.106:8000/',
    homepage: 'http://www.021.rs/',
    favicon: 'http://www.021.rs/favicon.ico',
    tags: ['talk', 'music', 'news'],
    country: 'Serbia',
    countryCode: 'RS',
    state: 'Vojvodina',
    language: ['serbian', 'english', 'german'],
    votes: 44,
    lastChangeTime: new Date('2020-01-19 13:17:10'),
    codec: 'MP3',
    bitrate: 128,
    hls: Boolean(0),
    lastCheckOk: Boolean(1),
    lastCheckTime: new Date('2020-10-27 06:04:51'),
    lastCheckOkTime: new Date('2020-10-27 06:04:51'),
    lastLocalCheckTime: new Date('2020-10-27 06:04:51'),
    clickTimestamp: new Date('2020-10-25 18:33:05'),
    clickCount: 14,
    clickTrend: -1,
    geoLat: null,
    geoLong: null
  }
}
