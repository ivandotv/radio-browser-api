<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [radio-browser-api](./radio-browser-api.md) &gt; [RadioBrowserApi](./radio-browser-api.radiobrowserapi.md) &gt; [resolveBaseUrl](./radio-browser-api.radiobrowserapi.resolvebaseurl.md)

## RadioBrowserApi.resolveBaseUrl() method

Resolves API base url

<b>Signature:</b>

```typescript
resolveBaseUrl(autoSet?: boolean, config?: RequestInit): Promise<{
        ip: string;
        name: string;
    }[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  autoSet | boolean | Automatically set first resolved base url |
|  config | RequestInit | Fetch configuration |

<b>Returns:</b>

Promise&lt;{ ip: string; name: string; }\[\]&gt;

Array of objects with the ip and name of the api server
