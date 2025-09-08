# Welcome to Class API Documentation Portal

Welcome! This guide will help you connect with our Class API  
If you’re new here, start with **Step 1** and proceed in order.

---


## Step 1. Create a developer account & app

**Prerequisites**
- A company email address
- Permission to create apps for your organization

**Steps**
1. Sign up / sign in at **Developer Portal**: `[sign in URL]`.
2. Go to **My Apps → Create App**.
3. Fill in:
   - **App name** and **description**
   - **Contact email**
4. Click **Create**.

> **Tip:** Use a separate app per environment (e.g., *MyApp-PIE*, *MyApp-Prod*) for distinction between testing and use cases.

---

## Step 2. Get your Client ID, Secret then Choose your API for your use case.

After creation, your app will display a combination of 32-character hexadecimal string, often formatted as five groups of numbers and letters separated by hyphens
- **Client ID**: Public identifier for your developer app  
- **Client Secret** *(keep confidential)*

**Select API Products**
1. Open your app page → **Selected API**.
2. Explore our API Catalogue Page and select the APIs you'd like to call (e.g., *Class Partner API*, *DMS*).
3. Save changes.

> 

**Environments**
- **Partner Integration Environment (PIE)**: Sandbox for testing and building your integration
- **Production**: Real data that currently sits within Production environment within Class

---

## Step 3. Understand your OAuth 2.0 implementation (Partner vs Client)

Most integrations use **OAuth 2.0** to obtain access tokens. Choose the grant type that matches your use case:

### A. Client (single-tenant)
Your organization accesses your own data that sits within Class.
- **Common grant types:** Resource Owner Password Flow.
- **Tokens:** Scoped to your organization/resources


### B. Partner (multi-tenant)
You are a Partner application where users on Class have to authorise Partner application to have access to their scoped data. (Authorization Code Flow Implemetation)
- **Consent per customer/tenant** (Prompt user to authorise)
- **Token storage per tenant** (Securely map and store tokens on your application customer)
- **Callback/Redirect URL** (Please email us your Redirect URL at Partners@class.com.au)


