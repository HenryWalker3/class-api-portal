import React from 'react';
import '@theme/styles.css';

interface Section {
  title: string;
  items: { text: string; link: string }[];
  codeExample?: { language: string; code: string };
}

const sections: Section[] = [
  {
    title: 'Installation',
    items: [
      { text: 'Creating an app', link: '/auth?section=CreatingApp' },
    ],
    
  },
  {
    title: 'OAuth2.0 Flow Guides',
    items: [
      { text: 'Access Token', link: '/auth?section=AccessTokens' },
      { text: 'Authorization Code Flow', link: '/auth?section=Scopes' },
      { text: 'Resource Owner Password Flow', link: '/auth?section=Scopes' },
    ]
  },
  {
    title: 'Security',
    items: [
      { text: 'Managing Access Token and Refresh Token', link: '/auth?section=TokenRotation' },
      { text: 'Best practices for Rate Limiting', link: '/auth?section=BestPractices' },
      { text: 'Scopes', link: '/auth?section=Scopes' },
    ]
  },
  {
    title: 'Advanced guides',
    items: [
      { text: 'Migration guide for classic apps', link: '/auth?section=MigrationGuide' },
    ]
  }
];

const AuthenticationPage: React.FC = () => (
  <div className="auth-page">
    <h1 className="auth-title">Resources Overview</h1>
    <p className="auth-subtitle">
      This page centralizes guidance and links for authenticating with Class using OAuth 2.0—covering flow guides, implementation best practices, scopes, and token handling.
    </p>

    <div className="cards-container">
      {sections.map((sec) => (
        <div className="card" key={sec.title}>
          <h2 className="card-title">{sec.title}</h2>
          <ul className="card-list">
            {sec.items.map((it) => (
              <li key={it.text}>
                <a className="card-link" href={it.link}>
                  {it.text}
                </a>
              </li>
            ))}
          </ul>
          {sec.codeExample && (
            <pre className="code-block">
              <code>{sec.codeExample.code}</code>
            </pre>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default AuthenticationPage;
