# Practice Management API Guide

Integrate your practice management system with **Class** to automate client onboarding, keep data in sync, and streamline workflows. This guide walks you through how the integration works, how to get started, and the most common API tasks—with copy-paste request examples.

---

## Overview

**What you’ll build**

- **Secure authentication** using OAuth 2.0 (Authorization Code) to obtain access tokens.
- **Entity linking** to create or update clients and related entities (e.g., SMSFs).
- **Data sync** to fetch fund and client details and push updates back to Class.

**High-level flow**

1. **Authenticate** → Get an access token with the required scopes.  
2. **Link entities** → Create or update clients / funds / relationships.  
3. **Sync data** → Pull details from Class, map fields, and update as needed.

---

## Prerequisites

- **Client ID & Secret** thats generated once your developer app has been created.
- **Redirect URL** registered within your app.
- **Scopes** aligned to the endpoints you’ll call.
- Your environment’s **Base URL** (e.g., `https://api.class.com.au`).

### Get Started
Explore the full [API documentation](/guides/specs/practice-management-guide.yaml) for commonly used endpoints.

You can also import these endpoints into Postman
[![Run in Postman](/images/postman.svg)](https://app.getpostman.com/run-collection/31317481-ced2ed1d-f59b-429e-b276-1f69fc6b2c51?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D31317481-ced2ed1d-f59b-429e-b276-1f69fc6b2c51%26entityType%3Dcollection%26workspaceId%3D78b42111-b0cd-4d64-8f5d-10d32cf32a0c)

