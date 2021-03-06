<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [radio-browser-api](./radio-browser-api.md) &gt; [RadioBrowserApi](./radio-browser-api.radiobrowserapi.md) &gt; [getAllStations](./radio-browser-api.radiobrowserapi.getallstations.md)

## RadioBrowserApi.getAllStations() method

Gets all available stations. Please note that if results are not limited somehow, they can be huge (size in MB)

<b>Signature:</b>

```typescript
getAllStations(query?: Omit<StationQuery, 'hideBroken'>, fetchConfig?: RequestInit, removeDuplicates?: boolean): Promise<Station[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  query | Omit&lt;[StationQuery](./radio-browser-api.stationquery.md)<!-- -->, 'hideBroken'&gt; | Query |
|  fetchConfig | RequestInit | Fetch configuration |
|  removeDuplicates | boolean | remove duplicate stations |

<b>Returns:</b>

Promise&lt;[Station](./radio-browser-api.station.md)<!-- -->\[\]&gt;

Array of all available stations

