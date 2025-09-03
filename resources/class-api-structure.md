# Class API – URL Structure, Requests, and Responses

This page outlines the **URL structure** and the **request/response formats** used by the Class API.

---

## URL Structure

All endpoints follow this pattern:

```
https://api.class.com.au/api/{version}/{scope}/{area}/{action}
```

**Components**

| URL Component | Description |
| --- | --- |
| `version` | The API version. Currently the only valid value is `1.0`. |
| `scope` | The scope of the requested resource:<br><br>• **Business level**: `b/{BusinessCode}`<br>• **Fund level**: `f/{BusinessCode}/{FundCode}` |
| `area` | Logical grouping of endpoints by resource (e.g., `fund-data`, `member-data`). |
| `action` | The specific resource and action (e.g., `member-detail/{memberId}`). |

**Examples**

- `https://api.class.com.au/api/1.0/b/Business/fund-data/fund-list`  
- `https://api.class.com.au/api/1.0/f/Business/Fund/member-data/member-detail/35572c36-9d63-4be5-a86f-072040a2781e`

---

## Request Headers

The Class API uses standard HTTP headers to control behavior.

| Header | Description |
| --- | --- |
| `Accept` | Specifies response media type **and** action version.<br><br>Supported media types: `application/json`, `application/xml`.<br><br>Action version format: `application/vnd.superip.action.v{version}+{json|xml}`. For the initial API, `{version}` is typically `1`.<br><br>**Defaults if omitted**: media type → `application/xml`; action version → the oldest available for that action.<br><br>**Examples**:<br>• `Accept: application/vnd.superip.action.v1+json`<br>• `Accept: application/xml` |
| `Content-Type` | Media type of the request body.<br><br>Supported: `application/json`, `application/xml`, `application/x-www-form-urlencoded; charset=UTF-8`.<br><br>**Default if omitted**: interpreted as XML. |
| `Authorization` | Send the access token as a [Bearer token](https://tools.ietf.org/html/rfc6750). **Case-sensitive**, including the word `Bearer`.<br><br>**Example**: `Authorization: Bearer Orh1Vz8T...` |

> **Tip:** When in doubt, prefer `Accept: application/vnd.superip.action.v1+json` and `Content-Type: application/json` for JSON workflows.

---

## Response Format

All responses share a common envelope:

```json
{
  "Errors": [
    {
      "Code": "ErrorCode",
      "Message": "A detailed, human-readable message explaining the error"
    }
  ],
  "Data": { }
}
```

- **Unsuccessful requests**  
  - `Errors`: contains one or more error objects with a code and message.  
  - `Data`: empty object.

- **Successful requests**  
  - `Errors`: empty array.  
  - `Data`: contains the endpoint-specific payload (see each endpoint’s documentation).

---

## Response Code Overview

| Status Code | Name | Description |
| --- | --- | --- |
| `200` | OK | Request completed successfully. |
| `400` | Bad Request | The request could not be processed. See response `Errors` for details. |
| `401` | Unauthorized | Missing/invalid credentials, insufficient permissions, **expired token**, or **token scope** does not satisfy required scope. |
| `404` | Not Found | Resource not found (e.g., Business or Fund does not exist; token target scope does not match the business; valid business/fund but incorrect API name). |
| `406` | Not Acceptable | The `Accept` header did not include any supported media types. |
| `415` | Unsupported Media Type | The `Content-Type` header specified an unsupported media type. |
| `500` | Internal Server Error | An unhandled error occurred. Please report to Class. |
| `501` | Not Implemented | Unsupported API version or action version. |
| `503` | Unavailable | Service is down for maintenance or temporarily unavailable. |

---

## Minimal cURL Example (Bearer + JSON)

```bash
curl --location 'https://api.class.com.au/api/1.0/b/Business/fund-data/fund-list' \
  --header 'Authorization: Bearer <ACCESS_TOKEN>' \
  --header 'Accept: application/vnd.superip.action.v1+json'
```
```