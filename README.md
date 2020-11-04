# Radio Browser API

![Unit tests](https://github.com/ivandotv/radio-browser-api/workflows/Unit%20tests/badge.svg)
![Codecov](https://img.shields.io/codecov/c/github/ivandotv/radio-browser-api)
![NPM](https://img.shields.io/npm/l/radio-browser-api)

## Install

```js
npm install radio-browser-api
```

## Table of Contents

- [What is it](#what-is-it)
- [Usage](#usage)

## What is it

This is a wrapper around free and open-source [radio browser api](https://api.radio-browser.info/).
It simplifies the task of querying the API by creating methods for each API route and normalizing the responses and errors.

It can be used both in the browser and in nodejs. It has a peer dependency on (`node-fetch`)[https://www.npmjs.com/package/node-fetch] for working in nodejs.

I suggest you familiarize yourself with the [original API docs](https://de1.api.radio-browser.info/) before using this library.

Also note that this library modifies the results from the API, because the API is brittle, in a way that returns duplicate stations, duplicated tags, or tags that are not tags rather, complete sentences. The library cleans this up for you.

API by default, returns `broken` stations (stations that are in the system but don't have their streams up and running) library by default hides those stations ( this can be changed when creating the library instance, or per API call)

## Usage

First, you need to instantiate the class instance and pass in the only required argument which is an object that represents the `fetch`. This package has a `peerDependency` on `node-fetch` you can safely ignore it if you intend to use it only in the browser.

Server:

```ts
import nodeFetch from 'node-fetch'
import { RadioBrowserApi } from 'radio-browser-api'

const fetchImpl = (nodeFetch as unknown) as typeof fetch
const api = new RadioBrowserApi(globalTest.fetch)
```

Browser:

```ts
import { RadioBrowserApi } from 'radio-browser-api'

const api = new RadioBrowserApi(fetch.bind(window))
```

After you instantiate the class, you can get the list of **available API servers** (I know, weird right?). Essentially the underlying API URLs can change and the author has two to three servers always running. Something like:
`https://fr1.api.radio-browser.info` or `https://de1.api.radio-browser.info`
This step is not mandatory because the class has one of the servers hardcoded, but If you get errors that service is not available, you can query for available servers.

```ts
const api = new RadioBrowserApi(fetch.bind(window))

api.resolveBaseUrl().then((urls: { ip: string; name: string }[]) => {
  // set the server to be used for all api calls
  api.setBaseUrl(urls[o0].ip)
})
```

### Querying the API

There are a lot of methods you can use to query the API.

```ts
import { RadioBrowserApi } from 'radio-browser-api'
//browser
const api = new RadioBrowserApi(fetch.bind(window))

// query stations by country code and limit to first 100 stations
const stations = await api.searchStations({
  countryCode: 'US',
  limit: 100,
  offset: 0 // this is the default - can be omited
})
// get next 100 stations
const stations = await api.searchStations({
  countryCode: 'US',
  limit: 100,
  offset: 1 // 1 - is the second page
})

// query stations by languge and tag
const stations = await api.searchStations({
  language: 'english',
  tag:'jazz'
  limit: 100
})

// query stations by array of tags
const stations = await api.searchStations({
  tagList: ['dance','house']
})

//etc..
```

The response that you get from searching the stations is an array of station objects. The structure of the station object looks like this.

```ts
type Station = {
  changeId: string // A globally unique identifier for the change of the station information
  id: string // A globally unique identifier for the station
  name: string // The name of the station
  url: string // The stream URL provided by the user
  urlResolved: string // An automatically "resolved" stream URL.
  homepage: string // URL to the homepage of the stream.
  favicon: string // URL to an icon or picture that represents the stream. (PNG, JPG)
  tags: string[] // Tags of the stream
  country: string // Full name of the country
  countryCode: string // Official countrycodes as in ISO 3166-1 alpha-2
  state: string // Full name of the entity where the station is located inside the country
  language: string[] // Languages that are spoken in this stream.
  votes: number // Number of votes for this station
  lastChangeTime: Date // Last time when the stream information was changed in the database
  codec: string // The codec of this stream recorded at the last check.
  bitrate: number // The bitrate of this stream recorded at the last check.
  hls: boolean // Mark if this stream is using HLS distribution or non-HLS.
  lastCheckOk: boolean // The current online/offline state of this stream.
  lastCheckTime: Date // The last time when any radio-browser server checked the online state of this stream
  lastCheckOkTime: Date // The last time when the stream was checked for the online status with a positive result
  lastLocalCheckTime: Date // The last time when this server checked the online state and the metadata of this stream
  clickTimestamp: Date // The time of the last click recorded for this stream
  clickCount: number // Clicks within the last 24 hours
  clickTrend: number // The difference of the clickcounts within the last 2 days. Positive values mean an increase, negative a decrease of clicks.
}
```

#### Important

When you try to play the stream you should use `urlResolved` property of the station object. API documentation says this about the property:

> An automatically "resolved" stream URL. Things resolved are playlists (M3U/PLS/ASX...), HTTP redirects (Code 301/302). This link is especially useful if you use this API from a platform that is not able to do resolve on its own (e.g. JavaScript in browser) or you just don't want to invest the time in decoding playlists yourself.

Some API routes are not covered, mainly because it would add to the size of the package, and the routes that are not covered are used for API diagnostic purposes and are not of much value to the end-user. However, pull requests are always welcomed 👍.
