radio-browser-api

# radio-browser-api

## Table of contents

### Classes

- [RadioBrowserApi](classes/RadioBrowserApi.md)

### Type aliases

- [AdvancedStationQuery](README.md#advancedstationquery)
- [CountryResult](README.md#countryresult)
- [CountryStateResult](README.md#countrystateresult)
- [Query](README.md#query)
- [Station](README.md#station)
- [StationQuery](README.md#stationquery)
- [StationResponse](README.md#stationresponse)
- [TagResult](README.md#tagresult)

### Variables

- [StationSearchOrder](README.md#stationsearchorder)
- [StationSearchType](README.md#stationsearchtype)

## Type aliases

### AdvancedStationQuery

Ƭ **AdvancedStationQuery**: { `bitrateMax?`: `string` ; `bitrateMin?`: `string` ; `codec?`: `string` ; `country?`: `string` ; `countryCode?`: `string` ; `countryExact?`: `boolean` ; `hasGeoInfo?`: `boolean` ; `language?`: `string` ; `languageExact?`: `boolean` ; `name?`: `string` ; `nameExact?`: `boolean` ; `state?`: `string` ; `stateExact?`: `boolean` ; `tag?`: `string` ; `tagExact?`: `boolean` ; `tagList?`: `string`[]  } & [`StationQuery`](README.md#stationquery)

#### Defined in

[constants.ts:123](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L123)

___

### CountryResult

Ƭ **CountryResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `stationcount` | `number` |

#### Defined in

[constants.ts:155](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L155)

___

### CountryStateResult

Ƭ **CountryStateResult**: [`CountryResult`](README.md#countryresult) & { `country`: `string`  }

#### Defined in

[constants.ts:167](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L167)

___

### Query

Ƭ **Query**: { `hideBroken?`: `boolean` ; `order?`: ``"name"`` \| ``"stationcount"`` ; `reverse?`: `boolean`  } & `Record`<`string`, `any`\>

#### Defined in

[constants.ts:145](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L145)

___

### Station

Ƭ **Station**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bitrate` | `number` |
| `changeId` | `string` |
| `clickCount` | `number` |
| `clickTimestamp` | `Date` |
| `clickTrend` | `number` |
| `codec` | `string` |
| `country` | `string` |
| `countryCode` | `string` |
| `favicon` | `string` |
| `geoLat?` | `number` \| ``null`` |
| `geoLong?` | `number` \| ``null`` |
| `hls` | `boolean` |
| `homepage` | `string` |
| `id` | `string` |
| `language` | `string`[] |
| `lastChangeTime` | `Date` |
| `lastCheckOk` | `boolean` |
| `lastCheckOkTime` | `Date` |
| `lastCheckTime` | `Date` |
| `lastLocalCheckTime` | `Date` |
| `name` | `string` |
| `state` | `string` |
| `tags` | `string`[] |
| `url` | `string` |
| `urlResolved` | `string` |
| `votes` | `number` |

#### Defined in

[constants.ts:79](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L79)

___

### StationQuery

Ƭ **StationQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hideBroken?` | `boolean` |
| `limit?` | `number` |
| `offset?` | `number` |
| `order?` | keyof typeof [`StationSearchOrder`](README.md#stationsearchorder) |
| `removeDuplicates?` | `boolean` |
| `reverse?` | `boolean` |

#### Defined in

[constants.ts:111](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L111)

___

### StationResponse

Ƭ **StationResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bitrate` | `number` |
| `changeuuid` | `string` |
| `clickcount` | `number` |
| `clicktimestamp` | `string` |
| `clicktrend` | `number` |
| `codec` | `string` |
| `country` | `string` |
| `countrycode` | `string` |
| `favicon` | `string` |
| `geo_lat?` | `number` \| ``null`` |
| `geo_long?` | `number` \| ``null`` |
| `hls` | `number` |
| `homepage` | `string` |
| `language` | `string` |
| `lastchangetime` | `string` |
| `lastcheckok` | `number` |
| `lastcheckoktime` | `string` |
| `lastchecktime` | `string` |
| `lastlocalchecktime` | `string` |
| `name` | `string` |
| `state` | `string` |
| `stationuuid` | `string` |
| `tags` | `string` |
| `url` | `string` |
| `url_resolved` | `string` |
| `votes` | `number` |

#### Defined in

[constants.ts:47](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L47)

___

### TagResult

Ƭ **TagResult**: [`CountryResult`](README.md#countryresult)

#### Defined in

[constants.ts:163](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L163)

## Variables

### StationSearchOrder

• `Const` **StationSearchOrder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bitrate` | ``"bitrate"`` |
| `clickCount` | ``"clickCount"`` |
| `clickTimeStamp` | ``"clickTimeStamp"`` |
| `clickTrend` | ``"clickTrend"`` |
| `codec` | ``"codec"`` |
| `country` | ``"country"`` |
| `favicon` | ``"favicon"`` |
| `homepage` | ``"homepage"`` |
| `language` | ``"language"`` |
| `lastCheckOK` | ``"lastCheckOK"`` |
| `lastCheckTime` | ``"lastCheckTime"`` |
| `name` | ``"name"`` |
| `random` | ``"random"`` |
| `state` | ``"state"`` |
| `tags` | ``"tags"`` |
| `url` | ``"url"`` |
| `votes` | ``"votes"`` |

#### Defined in

[constants.ts:4](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L4)

___

### StationSearchType

• `Const` **StationSearchType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `byCodec` | ``"byCodec"`` |
| `byCodexExact` | ``"byCodecExact"`` |
| `byCountry` | ``"byCountry"`` |
| `byCountryCodeExact` | ``"byCountryCodeExact"`` |
| `byCountryExact` | ``"byCountryExact"`` |
| `byLanguage` | ``"byLanguage"`` |
| `byLanguageExact` | ``"byLanguageExact"`` |
| `byName` | ``"byName"`` |
| `byNameExact` | ``"byNameExact"`` |
| `byState` | ``"byState"`` |
| `byStateExact` | ``"byStateExact"`` |
| `byTag` | ``"byTag"`` |
| `byTagExact` | ``"byTagExact"`` |
| `byUuid` | ``"byUuid"`` |

#### Defined in

[constants.ts:27](https://github.com/ivandotv/radio-browser-api/blob/c597838/src/constants.ts#L27)
