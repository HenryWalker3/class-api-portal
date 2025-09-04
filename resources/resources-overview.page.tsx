import * as React from 'react';
import { Button } from '@redocly/theme/components/Button/Button';
import { Link } from '@redocly/theme/components/Link/Link';
import './styles.css';

export const frontmatter = {
  seo: {
    title: 'Resources Overview',
  },
};

type Item = { text: string; link: string; desc?: string };
type Section = {
  title: string;
  items: Item[];
  codeExample?: { language: string; code: string };
};

const sections: Section[] = [
  {
    title: 'Installation',
    items: [
      {
        text: 'Creating an app',
        link: '/auth?section=CreatingApp',
        desc: 'Register your integration, set redirect URIs, and obtain client credentials.'      
      },
    ],
  },
  {
    title: 'OAuth2.0 Flow Guides',
    items: [
      {
        text: 'Access Token',
        link: '/auth?section=AccessTokens',
        desc: 'Understand lifetimes, usage, and obtaining access tokens to call the API.',
      },
      {
        text: 'Authorization Code Flow',
        link: '/auth?section=Scopes',
        desc: 'Step-by-step guide for the standard OAuth 2.0 code flow with PKCE.',
      },
      {
        text: 'Resource Owner Password Flow',
        link: '/auth?section=Scopes',
        desc: 'Legacy flow overview, constraints, and when to avoid using it.',
      },
    ],
  },
  {
    title: 'Security',
    items: [
      {
        text: 'Managing Access Token and Refresh Token',
        link: '/auth?section=TokenRotation',
        desc: 'Store, rotate, and revoke tokens securely with best-practice patterns.',
      },
      {
        text: 'Best practices for Rate Limiting',
        link: '/auth?section=BestPractices',
        desc: 'Avoid throttling using retries, backoff, idempotency, and concurrency control.',
      },
      {
        text: 'Scopes',
        link: '/auth?section=Scopes',
        desc: 'Scope catalog and least-privilege recommendations for each use case.',
      },
    ],
  },
  {
    title: 'Advanced guides',
    items: [
      {
        text: 'Migration guide for classic apps',
        link: '/auth?section=MigrationGuide',
        desc: 'Move from classic apps to modern OAuth apps with minimal downtime.',
      },
    ],
  },
];

export default function ResourcesOverviewPage() {
  return (
    <div className="landing-wrapper">
      <div>
        <h1 className="landing-header">Resources Overview</h1>
        <div className="landing-subheader">
          This page centralizes guidance and links for authenticating with Class using OAuth&nbsp;2.0—
          covering flow guides, implementation best practices, scopes, and token handling.
        </div>
      </div>

      {sections.map((sec) => (
        <div className="box" style={{ marginBottom: '48px' }} key={sec.title}>
          <h2 className="section-header">{sec.title}</h2>

          <div className="tiles">
            {sec.items.map((it) => (
              <Tile
                key={it.text}
                to={it.link}
                header={it.text}
              >
                {it.desc}
              </Tile>
              
            ))}
          </div>

          {sec.codeExample && (
            <pre className="code-block" style={{ marginTop: 16 }}>
              <code>{sec.codeExample.code}</code>
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}

function Tile({
  icon,
  header,
  children,
  to,
  textAlign = 'center',
}: {
  icon?: React.ReactNode;
  header: string;
  children?: React.ReactNode;
  to: string;
  textAlign?: 'left' | 'center' | 'right';
}) {
  return (
    <Link to={to} className={`tile-wrapper ${textAlign}`}>
      {icon && <div className="icon-wrapper">{icon}</div>}
      <h3 className="tile-header">{header}</h3>
      {children && <p className="tile-description">{children}</p>}
    </Link>
  );
}
