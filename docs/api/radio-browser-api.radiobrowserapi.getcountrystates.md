<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [radio-browser-api](./radio-browser-api.md) &gt; [RadioBrowserApi](./radio-browser-api.radiobrowserapi.md) &gt; [getCountryStates](./radio-browser-api.radiobrowserapi.getcountrystates.md)

## RadioBrowserApi.getCountryStates() method

Gets country states. States \*\*should\*\* be regions inside a country.

<b>Signature:</b>

```typescript
getCountryStates(country?: string, query?: Query, fetchConfig?: RequestInit): Promise<CountryStateResult[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  country | string | Limit state to particular country |
|  query | [Query](./radio-browser-api.query.md) | Query |
|  fetchConfig | RequestInit | Fetch configuration |

<b>Returns:</b>

Promise&lt;[CountryStateResult](./radio-browser-api.countrystateresult.md)<!-- -->\[\]&gt;

Array of country states
