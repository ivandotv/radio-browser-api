[radio-browser-api](../README.md) / RadioBrowserApi

# Class: RadioBrowserApi

Query the radio browser api.

## Table of contents

### Constructors

- [constructor](RadioBrowserApi.md#constructor)

### Properties

- [version](RadioBrowserApi.md#version)

### Methods

- [getAllStations](RadioBrowserApi.md#getallstations)
- [getBaseUrl](RadioBrowserApi.md#getbaseurl)
- [getCodecs](RadioBrowserApi.md#getcodecs)
- [getCountries](RadioBrowserApi.md#getcountries)
- [getCountryCodes](RadioBrowserApi.md#getcountrycodes)
- [getCountryStates](RadioBrowserApi.md#getcountrystates)
- [getLanguages](RadioBrowserApi.md#getlanguages)
- [getStationByUrl](RadioBrowserApi.md#getstationbyurl)
- [getStationsBy](RadioBrowserApi.md#getstationsby)
- [getStationsByClicks](RadioBrowserApi.md#getstationsbyclicks)
- [getStationsById](RadioBrowserApi.md#getstationsbyid)
- [getStationsByRecentClicks](RadioBrowserApi.md#getstationsbyrecentclicks)
- [getStationsByVotes](RadioBrowserApi.md#getstationsbyvotes)
- [getTags](RadioBrowserApi.md#gettags)
- [resolveBaseUrl](RadioBrowserApi.md#resolvebaseurl)
- [searchStations](RadioBrowserApi.md#searchstations)
- [sendStationClick](RadioBrowserApi.md#sendstationclick)
- [setBaseUrl](RadioBrowserApi.md#setbaseurl)
- [voteForStation](RadioBrowserApi.md#voteforstation)

## Constructors

### constructor

• **new RadioBrowserApi**(`appName`, `hideBroken?`)

Creates an instance of radio browser api.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `appName` | `string` | `undefined` | App name to be used as user agent header to indentify the calls to the API |
| `hideBroken` | `boolean` | `true` | Hide broken stations for all future API calls |

#### Defined in

[radioBrowser.ts:32](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L32)

## Properties

### version

▪ `Static` **version**: `string` = `__VERSION__`

#### Defined in

[radioBrowser.ts:18](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L18)

## Methods

### getAllStations

▸ **getAllStations**(`query?`, `fetchConfig?`, `removeDuplicates?`): `Promise`<[`Station`](../README.md#station)[]\>

Gets all available stations. Please note that if results
are not limited somehow, they can be huge (size in MB)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `query?` | `Omit`<[`StationQuery`](../README.md#stationquery), ``"hidebroken"``\> | `undefined` | Query |
| `fetchConfig?` | `RequestInit` | `undefined` | Fetch configuration |
| `removeDuplicates` | `boolean` | `false` | remove duplicate stations |

#### Returns

`Promise`<[`Station`](../README.md#station)[]\>

Array of all available stations

#### Defined in

[radioBrowser.ts:291](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L291)

___

### getBaseUrl

▸ **getBaseUrl**(): `undefined` \| `string`

Get current  base url

#### Returns

`undefined` \| `string`

Base url

#### Defined in

[radioBrowser.ts:82](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L82)

___

### getCodecs

▸ **getCodecs**(`query?`, `fetchConfig?`): `Promise`<[`CountryResult`](../README.md#countryresult)[]\>

Gets available codes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`CountryResult`](../README.md#countryresult)[]\>

List of available codes

#### Defined in

[radioBrowser.ts:130](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L130)

___

### getCountries

▸ **getCountries**(`search?`, `query?`, `fetchConfig?`): `Promise`<[`CountryResult`](../README.md#countryresult)[]\>

Gets available countries

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `search?` | `string` | Search for country |
| `query?` | [`Query`](../README.md#query) | Query params |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`CountryResult`](../README.md#countryresult)[]\>

Array of country results with the name of the station and station count

#### Defined in

[radioBrowser.ts:93](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L93)

___

### getCountryCodes

▸ **getCountryCodes**(`search?`, `query?`, `fetchConfig?`): `Promise`<[`CountryResult`](../README.md#countryresult)[]\>

Gets countries by country code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `search?` | `string` | Country code |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`CountryResult`](../README.md#countryresult)[]\>

Array of country results with the name of the station and station count

#### Defined in

[radioBrowser.ts:111](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L111)

___

### getCountryStates

▸ **getCountryStates**(`country?`, `query?`, `fetchConfig?`): `Promise`<[`CountryStateResult`](../README.md#countrystateresult)[]\>

Gets country states. States **should** be regions inside a country.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `country?` | `string` | Limit state to particular country |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`CountryStateResult`](../README.md#countrystateresult)[]\>

Array of country states

#### Defined in

[radioBrowser.ts:144](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L144)

___

### getLanguages

▸ **getLanguages**(`language?`, `query?`, `fetchConfig?`): `Promise`<[`CountryResult`](../README.md#countryresult)[]\>

Gets all available languages

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language?` | `string` | - |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`CountryResult`](../README.md#countryresult)[]\>

Array of language results

#### Defined in

[radioBrowser.ts:162](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L162)

___

### getStationByUrl

▸ **getStationByUrl**(`url`, `fetchConfig?`): `Promise`<[`Station`](../README.md#station)[]\>

Gets station by station url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | Station url |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:434](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L434)

___

### getStationsBy

▸ **getStationsBy**(`searchType`, `search?`, `query?`, `fetchConfig?`, `removeDuplicates?`): `Promise`<[`Station`](../README.md#station)[]\>

Gets stations by various available parameters

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `searchType` | ``"byUuid"`` \| ``"byName"`` \| ``"byNameExact"`` \| ``"byCodec"`` \| ``"byCountry"`` \| ``"byCountryExact"`` \| ``"byCountryCodeExact"`` \| ``"byState"`` \| ``"byStateExact"`` \| ``"byLanguage"`` \| ``"byLanguageExact"`` \| ``"byTag"`` \| ``"byTagExact"`` \| ``"byCodexExact"`` | `undefined` | Parameter for the search |
| `search?` | `string` | `undefined` | Search value for the parameter |
| `query?` | [`StationQuery`](../README.md#stationquery) | `undefined` | Query |
| `fetchConfig?` | `RequestInit` | `undefined` | Fetch configuration |
| `removeDuplicates` | `boolean` | `false` | remove duplicate stations |

#### Returns

`Promise`<[`Station`](../README.md#station)[]\>

Array of station results

#### Defined in

[radioBrowser.ts:199](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L199)

___

### getStationsByClicks

▸ **getStationsByClicks**(`limit?`, `fetchConfig?`): `Promise`<[`Station`](../README.md#station)[]\>

Gets stations by clicks. Stations with the highest number of clicks are most popular

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit?` | `number` | Limit the number of returned stations |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:330](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L330)

___

### getStationsById

▸ **getStationsById**(`ids`, `fetchConfig?`): `Promise`<[`Station`](../README.md#station)[]\>

Gets stations by station id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `string`[] | Array of station id's |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:410](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L410)

___

### getStationsByRecentClicks

▸ **getStationsByRecentClicks**(`limit?`, `fetchConfig?`): `Promise`<[`Station`](../README.md#station)[]\>

Gets stations by recent clicks. They are basically most recently listened stations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit?` | `number` | Limit the number of returned stations |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:356](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L356)

___

### getStationsByVotes

▸ **getStationsByVotes**(`limit?`, `fetchConfig?`): `Promise`<[`Station`](../README.md#station)[]\>

Gets stations by votes. Returns most voted stations

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit?` | `number` | Limit the number of returned stations |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:343](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L343)

___

### getTags

▸ **getTags**(`tag?`, `query?`, `fetchConfig?`): `Promise`<[`CountryResult`](../README.md#countryresult)[]\>

Gets all available tags

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag?` | `string` | Limit results to particular tag |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<[`CountryResult`](../README.md#countryresult)[]\>

List of tag results

#### Defined in

[radioBrowser.ts:180](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L180)

___

### resolveBaseUrl

▸ **resolveBaseUrl**(`config?`): `Promise`<{ `ip`: `string` ; `name`: `string`  }[]\>

Resolves API base url this will be the default for all class instances.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `RequestInit` |

#### Returns

`Promise`<{ `ip`: `string` ; `name`: `string`  }[]\>

Array of objects with the ip and name of the api server

#### Defined in

[radioBrowser.ts:45](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L45)

___

### searchStations

▸ **searchStations**(`query`, `fetchConfig?`, `removeDuplicates?`): `Promise`<[`Station`](../README.md#station)[]\>

Searches stations by particular params

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `query` | [`AdvancedStationQuery`](../README.md#advancedstationquery) | `undefined` | Query |
| `fetchConfig?` | `RequestInit` | `undefined` | Fetch configuration |
| `removeDuplicates` | `boolean` | `false` | remove duplicate stations |

#### Returns

`Promise`<[`Station`](../README.md#station)[]\>

Array of station results

#### Defined in

[radioBrowser.ts:311](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L311)

___

### sendStationClick

▸ **sendStationClick**(`id`, `fetchConfig?`): `Promise`<{ `message`: `string` ; `name`: `string` ; `ok`: `boolean` ; `stationuuid`: `string` ; `url`: `string`  }\>

Sends click for the station. This method should be used when user starts to listen to the station.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Station id |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<{ `message`: `string` ; `name`: `string` ; `ok`: `boolean` ; `stationuuid`: `string` ; `url`: `string`  }\>

Station click object

#### Defined in

[radioBrowser.ts:369](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L369)

___

### setBaseUrl

▸ **setBaseUrl**(`url`): `void`

Sets base url for all api calls

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | Url to the api server |

#### Returns

`void`

#### Defined in

[radioBrowser.ts:74](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L74)

___

### voteForStation

▸ **voteForStation**(`id`, `fetchConfig?`): `Promise`<{ `message`: `string` ; `name`: `string` ; `ok`: `boolean` ; `stationuuid`: `string` ; `url`: `string`  }\>

Votes for station. This method should be used when user adds the station to favourites etc..

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Station id |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`<{ `message`: `string` ; `name`: `string` ; `ok`: `boolean` ; `stationuuid`: `string` ; `url`: `string`  }\>

Station vote object

#### Defined in

[radioBrowser.ts:391](https://github.com/ivandotv/radio-browser-api/blob/f9058c6/src/radioBrowser.ts#L391)
