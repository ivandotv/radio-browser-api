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

• **new RadioBrowserApi**(`appName`, `hideBroken?`): [`RadioBrowserApi`](RadioBrowserApi.md)

Creates an instance of radio browser api.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `appName` | `string` | `undefined` | App name to be used as user agent header to indentify the calls to the API |
| `hideBroken` | `boolean` | `true` | Hide broken stations for all future API calls |

#### Returns

[`RadioBrowserApi`](RadioBrowserApi.md)

#### Defined in

[radioBrowser.ts:31](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L31)

## Properties

### version

▪ `Static` **version**: `string` = `__VERSION__`

#### Defined in

[radioBrowser.ts:17](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L17)

## Methods

### getAllStations

▸ **getAllStations**(`query?`, `fetchConfig?`, `removeDuplicates?`): `Promise`\<[`Station`](../README.md#station)[]\>

Gets all available stations. Please note that if results
are not limited somehow, they can be huge (size in MB)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `query?` | `Omit`\<[`StationQuery`](../README.md#stationquery), ``"hidebroken"``\> | `undefined` | Query |
| `fetchConfig?` | `RequestInit` | `undefined` | Fetch configuration |
| `removeDuplicates` | `boolean` | `false` | remove duplicate stations |

#### Returns

`Promise`\<[`Station`](../README.md#station)[]\>

Array of all available stations

#### Defined in

[radioBrowser.ts:281](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L281)

___

### getBaseUrl

▸ **getBaseUrl**(): `undefined` \| `string`

Get current  base url

#### Returns

`undefined` \| `string`

Base url

#### Defined in

[radioBrowser.ts:72](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L72)

___

### getCodecs

▸ **getCodecs**(`query?`, `fetchConfig?`): `Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

Gets available codes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

List of available codes

#### Defined in

[radioBrowser.ts:120](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L120)

___

### getCountries

▸ **getCountries**(`search?`, `query?`, `fetchConfig?`): `Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

Gets available countries

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `search?` | `string` | Search for country |
| `query?` | [`Query`](../README.md#query) | Query params |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

Array of country results with the name of the station and station count

#### Defined in

[radioBrowser.ts:83](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L83)

___

### getCountryCodes

▸ **getCountryCodes**(`search?`, `query?`, `fetchConfig?`): `Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

Gets countries by country code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `search?` | `string` | Country code |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

Array of country results with the name of the station and station count

#### Defined in

[radioBrowser.ts:101](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L101)

___

### getCountryStates

▸ **getCountryStates**(`country?`, `query?`, `fetchConfig?`): `Promise`\<[`CountryStateResult`](../README.md#countrystateresult)[]\>

Gets country states. States **should** be regions inside a country.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `country?` | `string` | Limit state to particular country |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`CountryStateResult`](../README.md#countrystateresult)[]\>

Array of country states

#### Defined in

[radioBrowser.ts:134](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L134)

___

### getLanguages

▸ **getLanguages**(`language?`, `query?`, `fetchConfig?`): `Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

Gets all available languages

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language?` | `string` | Limit results to particular language |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

Array of language results

#### Defined in

[radioBrowser.ts:152](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L152)

___

### getStationByUrl

▸ **getStationByUrl**(`url`, `fetchConfig?`): `Promise`\<[`Station`](../README.md#station)[]\>

Gets station by station url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | Station url |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:424](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L424)

___

### getStationsBy

▸ **getStationsBy**(`searchType`, `search?`, `query?`, `fetchConfig?`, `removeDuplicates?`): `Promise`\<[`Station`](../README.md#station)[]\>

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

`Promise`\<[`Station`](../README.md#station)[]\>

Array of station results

#### Defined in

[radioBrowser.ts:189](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L189)

___

### getStationsByClicks

▸ **getStationsByClicks**(`limit?`, `fetchConfig?`): `Promise`\<[`Station`](../README.md#station)[]\>

Gets stations by clicks. Stations with the highest number of clicks are most popular

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit?` | `number` | Limit the number of returned stations |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:320](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L320)

___

### getStationsById

▸ **getStationsById**(`ids`, `fetchConfig?`): `Promise`\<[`Station`](../README.md#station)[]\>

Gets stations by station id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `string`[] | Array of station id's |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:400](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L400)

___

### getStationsByRecentClicks

▸ **getStationsByRecentClicks**(`limit?`, `fetchConfig?`): `Promise`\<[`Station`](../README.md#station)[]\>

Gets stations by recent clicks. They are basically most recently listened stations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit?` | `number` | Limit the number of returned stations |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:346](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L346)

___

### getStationsByVotes

▸ **getStationsByVotes**(`limit?`, `fetchConfig?`): `Promise`\<[`Station`](../README.md#station)[]\>

Gets stations by votes. Returns most voted stations

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit?` | `number` | Limit the number of returned stations |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`Station`](../README.md#station)[]\>

Array of stations

#### Defined in

[radioBrowser.ts:333](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L333)

___

### getTags

▸ **getTags**(`tag?`, `query?`, `fetchConfig?`): `Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

Gets all available tags

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag?` | `string` | Limit results to particular tag |
| `query?` | [`Query`](../README.md#query) | Query |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<[`CountryResult`](../README.md#countryresult)[]\>

List of tag results

#### Defined in

[radioBrowser.ts:170](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L170)

___

### resolveBaseUrl

▸ **resolveBaseUrl**(`config?`): `Promise`\<\{ `ip`: `string` ; `name`: `string`  }[]\>

Resolves API base url this will be the default for all class instances.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<\{ `ip`: `string` ; `name`: `string`  }[]\>

Array of objects with the ip and name of the api server

#### Defined in

[radioBrowser.ts:43](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L43)

___

### searchStations

▸ **searchStations**(`query`, `fetchConfig?`, `removeDuplicates?`): `Promise`\<[`Station`](../README.md#station)[]\>

Searches stations by particular params

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `query` | [`AdvancedStationQuery`](../README.md#advancedstationquery) | `undefined` | Query |
| `fetchConfig?` | `RequestInit` | `undefined` | Fetch configuration |
| `removeDuplicates` | `boolean` | `false` | remove duplicate stations |

#### Returns

`Promise`\<[`Station`](../README.md#station)[]\>

Array of station results

#### Defined in

[radioBrowser.ts:301](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L301)

___

### sendStationClick

▸ **sendStationClick**(`id`, `fetchConfig?`): `Promise`\<\{ `message`: `string` ; `name`: `string` ; `ok`: `boolean` ; `stationuuid`: `string` ; `url`: `string`  }\>

Sends click for the station. This method should be used when user starts to listen to the station.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Station id |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<\{ `message`: `string` ; `name`: `string` ; `ok`: `boolean` ; `stationuuid`: `string` ; `url`: `string`  }\>

Station click object

#### Defined in

[radioBrowser.ts:359](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L359)

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

[radioBrowser.ts:64](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L64)

___

### voteForStation

▸ **voteForStation**(`id`, `fetchConfig?`): `Promise`\<\{ `message`: `string` ; `name`: `string` ; `ok`: `boolean` ; `stationuuid`: `string` ; `url`: `string`  }\>

Votes for station. This method should be used when user adds the station to favourites etc..

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Station id |
| `fetchConfig?` | `RequestInit` | Fetch configuration |

#### Returns

`Promise`\<\{ `message`: `string` ; `name`: `string` ; `ok`: `boolean` ; `stationuuid`: `string` ; `url`: `string`  }\>

Station vote object

#### Defined in

[radioBrowser.ts:381](https://github.com/ivandotv/radio-browser-api/blob/0e81016121e8bd1e05a267f9d778460f33657efb/src/radioBrowser.ts#L381)
