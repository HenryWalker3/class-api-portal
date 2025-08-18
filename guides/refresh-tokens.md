# Managing Access and Refresh Tokens

## Overview
Properly managing access and refresh tokens is essential for maintaining secure and seamless access to our APIs. This article explains how our token system works and provides details for obtaining, using, and refreshing tokens.

Our token system is based on the **OAuth 2.0** standard, with the following key details:

- **Access Token:** Used to authenticate API requests. It's short-lived and expires after **15 minutes**.
- **Refresh Token:** Used to get a new access token without re-authenticating the user. It's long-lived, expiring after **30 days**. It's important to note that a refresh token is **single-use** and becomes invalid shortly after it's used.

## Prerequisites
Before you begin, make sure you have the following:

- Valid OAuth `client_id` and `client_secret` keys for the environment you're working in.
- An understanding of the [Authorisation Code Flow](./authorization-code-flow.md).
- The necessary [Authorisation Scopes](./authorisation-scopes.md) for the data you need to access.

---

## 1. Obtaining Tokens
The process begins with obtaining an authorisation code, which is then exchanged for an access and refresh token pair.

### Initiate the Authorisation Flow
You must first redirect the user to our authorisation endpoint. In this request, you'll need to specify the correct scopes to ensure you get the tokens you need.

- `offline_access`: This scope is **required** to get a refresh token. Without it, your application will have to prompt the user to re-authorise every time the access token expires.
- The access specifier (e.g., `fund.read`).
- `target:b/<business_code>`: This scopes the authorisation to a specific business. You must replace `<business_code>` with the correct identifier (e.g., `target:b/testbusiness`).

<div style="font-style: italic; color: #555; border-left: 3px solid #ddd; padding-left: 1em; margin: 1em 0;">
  <strong>Note:</strong> An authorisation flow is limited to a single business. If a user is associated with multiple businesses, you must initiate a separate authorisation flow for each one. This means your application will need to store and manage multiple refresh tokens.
</div>

### Exchange the Authorisation Code for Tokens
After the user approves your request, you'll receive an authorisation code. Use this code to call our token endpoint, which will return the tokens.

If you included and received authorisation for `offline_access`, the response will contain:
- An **access token** (valid for 15 minutes).
- A **refresh token** (valid for 30 days).

Store both tokens securely in your application's back end. **Never expose them on the client side.**

---

## 2. Using Tokens
Once you have the tokens, you can begin making API calls.

### Access Token Usage
The access token is what you'll use for all your protected API calls.

- Include the token in the `Authorization` header of your requests in the following format: `Authorization: Bearer <access_token>`.
- You can reuse the **same access token** for multiple API calls as long as the token is not expired and the calls are within the same authorised scope.
- Monitor the access token's expiration. You can either track the issuance time plus 15 minutes or use the `expires_in` value returned with the token.

<sl-alert open variant="warning">
  <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
  **Important:** Do not request a new access token for every API call. This is inefficient and can cause rate-limiting issues.
</sl-alert>

### Refresh Token Usage
The refresh token is **not** used for API calls. Its sole purpose is to get a new access token when the current one expires.

- The refresh token is tied to a specific business and scope.
- **Refresh tokens are single-use.** The moment you use a refresh token to get a new token pair, the old refresh token is immediately invalidated. You must discard the old token and use the new one returned in the response for any subsequent refreshes.
- The scope you are requesting when refreshing the token pair must be the same or a subset of scopes originally authorised.

---

## 3. Refreshing Tokens
To avoid disruptions, you should proactively refresh the access token before it expires.

To refresh a token:
1.  **Call the Token Endpoint:** Send a `POST` request to the token endpoint with the `grant_type` set to `refresh_token`. Include the current refresh token in the request.
2.  **Handle the Response:** The endpoint will return a new access token and a **new refresh token**.
3.  **Store the New Tokens:** Immediately discard the old refresh token and store the new one for future use.

If a refresh token expires (after 30 days) or is revoked, you will need to start a new authorisation flow to get a fresh set of tokens.

---

## Common Errors
Here are some common errors you might encounter and how to resolve them:

| Error | When | Cause | Solution |
| :--- | :--- | :--- | :--- |
| **`401 Unauthorized`** | Calling API resources | The access token is missing, expired, or invalid. The scope values may also be incorrect for the specified endpoint. | Check the token's validity. If expired, use the refresh token to get a new access token and retry. Ensure the token is correctly formatted in the `Authorization: Bearer <access_token>` header and that the scopes are valid. |
| **`400 Bad Request: "Invalid Grant"`** | Calling the token endpoint | The refresh token has already been used, has expired (after 30 days), or is invalid. | Verify that you're using the latest refresh token. Since refresh tokens are single-use, it's easy to accidentally use an invalidated token. If the token is expired or revoked, you must start a new authorisation flow. |
| **`404 Not Found`** | Calling API resources | The endpoint is invalid, or the token's scope does not match the business code in the request path. | Ensure that the business code used in the API call path matches the business code you used during the initial authorization flow. |
