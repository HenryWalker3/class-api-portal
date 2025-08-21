---
title: Class API Guides
---

# Class API Guides

Welcome! This hub collects all the essential guides for building against the **Class API**. Start with the quickstart, then dive into authentication flows (Authorisation Code, Resource Owner Password), refresh tokens, scopes, error handling, and our API structure.

## Quickstart

Get set up and make your first successful request in minutes.

- **[Using the API](./class-api-structure.md)** — environment setup, base URL, headers, a first “hello” call, and troubleshooting tips.

## Authentication & Authorisation
Learn how users and apps obtain tokens to call the Class API securely.

- **[Auth Overview](./authorising-partner-application-api-access.md)** — Identifying which flow to implement (Partner vs. Client)
- **[Authorisation Code Flow](./authorization-code-flow.md)** — recommended OAuth 2.0 flow for web/native apps.
- **[Resource Owner Password Flow](./resource-owner-password-flow.md)** — legacy/edge case flow.
- **[Refresh Tokens](./refresh-tokens.md)** — how to obtain/rotate refresh tokens.
- **[Authorisation Scopes](./authorisation-scopes.md)** — available scopes and least-privilege examples.
- **[UserInfo Endpoint](./userinfo-endpoint.md)** — retrieving the authenticated user’s profile.
- **[SSO using Class API](./sso-using-class-api.md)** — high-level SSO patterns.

## API Structure & Discovery

- **[Class API Structure](./class-api-structure.md)** — service domains, resource naming, versioning strategy.
- **[Discovery Document](./discovery-document.md)** — where to find the OpenAPI document(s).

## Reliability & Best Practices

- **[Rate Limiting](./rate-limiting.md)** — limits, headers, and retry/backoff guidance.
- **[Error Codes](./error-codes.md)** — error taxonomy and actionable remediation.

## Reference

- **[API Reference](../apis/accounting-reports-final.yaml)** — full OpenAPI reference.

## Tools

- **[Tools Index](../tools/)** — SDKs, Postman collections, CLI snippets, and sample apps.