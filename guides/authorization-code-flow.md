```markdown
# OAuth 2.0 Authorization Code Flow – Class API

This guide explains how to obtain **access tokens**, **refresh tokens**, and **ID tokens** using the [OAuth 2.0 Authorization Code Flow](http://tools.ietf.org/html/rfc6749#section-4.1). Access tokens let you interact with the Class API for SMSF data, transactions, and accounting reports.

> **Note:** To use this flow, update your redirect URL by emailing [partners@class.com.au](mailto:partners@class.com.au).

---

## Step 1: Flow Overview

The authorization code flow is designed for integrations that can keep the `client_secret` confidential (e.g., web server apps). It supports refresh tokens and involves:

1. Your integration directs the user to the Class authorization endpoint by making an authorization request.
2. Class authenticates the user and prompts them to authorize the requested access.
3. Class redirects the user to your registered redirect URI with an **authorization code**.
4. Your integration sends a **token request** to exchange the code for tokens.
5. Class returns an **access token** and, if requested, a **refresh token** and/or **ID token**.

---

## Step 2: Client Authentication

Some requests require client authentication using your `client_id` and `client_secret` via [HTTP Basic authentication](http://tools.ietf.org/html/rfc2617#section-2).

1. Concatenate: `<client_id>:<client_secret>`
2. Base64 encode the result.
3. Include it in the `Authorization` header, prefixed by `Basic`.  
   The header is **case-sensitive**, including the word `Basic`.

**Example header (placeholder value):**
```bash
# Authorization header example
Authorization: Basic PGNsaWVudF9pZD46PGNsaWVudF9zZWNyZXTvu78+
```

---

## Step 3: Authorization Request

The authorization request prompts the user for consent, then redirects them to the specified `redirect_uri`. If successful, the redirect includes an authorization `code`.

Requests are made via HTTP **GET** to the authorization endpoint. The endpoint URI should be obtained dynamically from the `authorization_endpoint` field of the [Discovery document](https://help.class.com.au/display/PUG/Discovery+document).

**Supported query parameters:**

| Parameter       | Required | Value                                   | Description |
|-----------------|----------|-----------------------------------------|-------------|
| `response_type` | True     | `code`                                  | Must be `code` for this flow. |
| `client_id`     | True     | Your issued client ID                   | Identifies your integration. |
| `redirect_uri`  | True     | One of your registered redirect URIs    | Must **exactly** match a registered redirect URI (including protocol, case, and any trailing character). A query string may be included and will be echoed back. |
| `scope`         | False    | Space-delimited list                    | Describes requested access. See **Authorization scope** docs. |
| `state`         | False\*  | Any string                              | Echoed back to mitigate CSRF. **Class mandates** using a random, unlinked value. See [RFC6749 §10.12](http://tools.ietf.org/html/rfc6749#section-10.12). |
| `response_mode` | False    | `query` (default) or `form_post`        | Select how the authorization response is returned. |
| `prompt`        | False    | `none`, `login`, `consent`              | Controls login/consent prompting. Multiple values may be space-delimited (except `none`). |
| `login_hint`    | False    | Email address                           | Pre-fills the login email field. |

**Example authorization request (wrapped for readability):**
```bash
curl --location 'https://app.class.com.au/connect/authorize?response_type=code&client_id=1eaa3979-9caf-4c6b-bab8-2cbcd549d410&redirect_uri=https%3a%2f%2fapp.class.com.au%2foauth-callback&scope=target%3ab%20offline_access%20business.fund.create%20fund.read&state=security_token%25Y2eeg2eCMB5owJ&prompt=consent'
```

---

## Step 4: Authorization Response

After the user authorizes or denies the request, the browser is redirected to your `redirect_uri`.

For **successful** requests:
- `code`: The authorization code (single-use).
- `state`: Echo of your original `state` value.

For **unsuccessful** requests:
- `error`: Error code (see Error codes documentation).

**Query response — success:**
```bash
# Browser redirect example (success)
# GET https://app.class.com.au/oauth-callback?code=1fd827c4-9ea3-4290-a99a-84c7d62d8b11&state=security_token%25Y2eeg2eCMB5owJ
```

**Query response — error:**
```bash
# Browser redirect example (error)
# GET https://app.class.com.au/oauth-callback?error=access_denied&state=security_token%25Y2eeg2eCMB5owJ
```

**Form POST response — success:**
```bash
# If response_mode=form_post (success)
# POST https://app.class.com.au/oauth-callback
# Content-Type: application/x-www-form-urlencoded; charset=utf-8

# Body:
# code=1fd827c4-9ea3-4290-a99a-84c7d62d8b11&state=security_token%25Y2eeg2eCMB5owJ
```

**Form POST response — error:**
```bash
# If response_mode=form_post (error)
# POST https://app.class.com.au/oauth-callback
# Content-Type: application/x-www-form-urlencoded; charset=utf-8

# Body:
# error=invalid_request&state=security_token%25Y2eeg2eCMB5owJ
```

---

## Step 5: Token Request

Exchange the authorization `code` for tokens at the token endpoint. This request **requires client authentication** (see Step 2).  
The endpoint URI should be obtained from `token_endpoint` in the [Discovery document](https://help.class.com.au/display/PUG/Discovery+document).

**Parameters:**

| Parameter     | Required | Value                 | Description |
|---------------|----------|-----------------------|-------------|
| `grant_type`  | True     | `authorization_code`  | Must be `authorization_code`. |
| `code`        | True     | Authorization code    | Single-use code from the authorization response. |
| `redirect_uri`| True     | Same as before        | Must **exactly** match the `redirect_uri` used in Step 3. |

**Example token request:**
```bash
curl --location 'https://app.class.com.au/connect/token' \
  --header 'Authorization: Basic PGNsaWVudF9pZD46PGNsaWVudF9zZWNyZXTvu78+' \
  --header 'Content-Type: application/x-www-form-urlencoded; charset=utf-8' \
  --data-urlencode 'grant_type=authorization_code' \
  --data-urlencode 'code=1fd827c4-9ea3-4290-a99a-84c7d62d8b11' \
  --data-urlencode 'redirect_uri=https%3a%2f%2fapp.class.com.au%2foauth-callback'
```

---

## Step 6: Token Response

The token endpoint responds with JSON.

**Success example:**
```bash
# HTTP/1.1 200 OK
# Content-Type: application/json;charset=UTF-8
# Cache-Control: no-cache
# Pragma: no-cache

{
  "access_token": "CBfgN5Z5...",
  "token_type": "bearer",
  "expires_in": "899",
  "scope": "target:b/OAUTH_TEST offline_access business.fund.create fund.read",
  "refresh_token": "9e0fccdb-ec4f-4e6a-ae60-83ad66be9547",
  "BusinessName": "OAuth Test Business",
  "BusinessCode": "OAUTH_TEST"
}
```

**Error example:**
```bash
# HTTP/1.1 400 Bad Request
# Content-Type: application/json;charset=UTF-8
# Cache-Control: no-cache
# Pragma: no-cache

{
  "error": "invalid_client",
  "error_description": "Client authentication failed"
}
```

---

## Step 7: Refresh Token Request

If `offline_access` was included in `scope`, you can exchange the `refresh_token` for a new `access_token` **without user interaction**. Each refresh token is typically **single-use**.

**Parameters:**

| Parameter        | Required | Value            | Description |
|------------------|----------|------------------|-------------|
| `grant_type`     | True     | `refresh_token`  | Must be `refresh_token`. |
| `refresh_token`  | True     | Your refresh token | From the previous token response. |

**Example refresh request:**
```bash
curl --location 'https://app.class.com.au/connect/token' \
  --header 'Authorization: Basic PGNsaWVudF9pZD46PGNsaWVudF9zZWNyZXTvu78+' \
  --header 'Content-Type: application/x-www-form-urlencoded; charset=utf-8' \
  --data-urlencode 'grant_type=refresh_token' \
  --data-urlencode 'refresh_token=9e0fccdb-ec4f-4e6a-ae60-83ad66be9547'
```
```