---
title: Class API Guides
---

# Class API Guides

Welcome! This hub collects all the essential guides for building against the **Class API**. Start with the quickstart, then dive into authentication flows (Authorisation Code, Resource Owner Password), refresh tokens, scopes, error handling, and our API structure.

## Quickstart

Get set up and make your first successful request in minutes.

- **[Using the API](/guides/class-api-structure)** — environment setup, base URL, headers, a first “hello” call, and troubleshooting tips.

## Authentication & Authorisation
[legal](../legal)
Learn how users and apps obtain tokens to call the Class API securely.

- **[Auth Overview](/guides/auth-overview)** — Identifying which flow to implement (Partner vs. Client)
- **[Authorisation Code Flow](/guides/authorization-code-flow)** — recommended OAuth 2.0 flow for web/native apps. Includes redirect URIs, PKCE, and exchanging the code for tokens.
- **[Resource Owner Password Flow](/guides/resource-owner-password-flow)** — legacy/edge case flow (direct username/password) with risks, when *not* to use it, and migration notes.
- **[Refresh Tokens](/guides/refresh-tokens)** — how to obtain/rotate refresh tokens, refresh access tokens, expiration and revocation.
- **[Authorisation Scopes](/guides/authorisation-scopes)** — available scopes, least-privilege examples, and mapping scopes to endpoints.
- **[UserInfo Endpoint](/guides/userinfo-endpoint)** — retrieving the authenticated user’s profile and claims.
- **[SSO using Class API](/guides/sso-using-class-api)** — high-level SSO patterns, IdP considerations, and session/token boundaries.

## API Structure & Discovery

Understand how the Class API is organised and discover capabilities programmatically.

- **[Class API Structure](/guides/class-api-structure)** — service domains, resource naming, versioning strategy, pagination, filtering, and common response envelopes.
- **[Discovery Document](/guides/discovery-document)** — where to find the OpenAPI document(s), multi-version strategy, and machine-readable metadata.

## Reliability & Best Practices

Build resilient, well-behaved clients.

- **[Rate Limiting](/guides/rate-limiting)** — limits, headers, retry/backoff guidance, and client-side throttling patterns.
- **[Error Codes](/guides/error-codes)** — error taxonomy, HTTP status mapping, problem+json payloads, and actionable remediation.

## Reference

- **[API Reference](/apis/openAPI.yaml)** — full OpenAPI reference (endpoints, schemas, examples).
- **[DMS API](/apis/DMS-API.yaml)** — DMS-specific OpenAPI reference if you’re integrating document workflows.

## Tools

- **[Tools Index](/tools/)** — SDKs, Postman collections, CLI snippets, and sample apps.

## Changelog & About

- **[Changelog](/changelog.md)** — version history, breaking changes, deprecations.
- **[About this template](/about.md)** — project structure, theming, and contribution guidelines.
