# Resource Owner Passsword Flow
## Overview

The **Resource Owner Password Credentials (ROPC)** grant is an OAuth 2.0 flow for **trusted clients** to obtain an access token by sending a user’s **username** and **password** directly to the authorization server.

With the Resource Owner Password Flow, you can:
- Authenticate a user by sending their credentials to the authorization server.
- Obtain an **access token** to call protected Class API endpoints.
- To receive a **refresh token** (via the `offline_access` scope) and an **ID token** (if supported).


![Diagram](/images/resource-owner-password-flow.png)

---

## Step 1: Requesting a Token

Before calling protected resources, request an access token from the token endpoint.

### Token Endpoints

- **Production:** `https://app.class.com.au/connect/token`  
- **Test (example):** `https://app.class-test.com.au/connect/token`

### Making a Token Request

Use the following `curl` command to obtain a token:

```bash
curl -X POST "https://app.class.com.au/connect/token" \
  -H "Authorization: Basic <client_id:client_secret_base64>" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=utf-8" \
  -d "grant_type=password&username=SampleUser&password=Samplepwd&scope=target%3ab%2fbusiness fund.maintain"
