import * as React from 'react';
import { Button } from '@redocly/theme/components/Button/Button';
import { Link } from '@redocly/theme/components/Link/Link';
import './styles.css';

export const frontmatter = {
  seo: {
    title: 'Demo React Page',
  },
};

export default function () {
  return (
    <div className="landing-wrapper">
      <div className="jumbotron" style={{ padding: '30px 18x 130px 180px' }}>
        <h1 className="landing-header">Class Developer Portal</h1>
        <div className="landing-subheader">Get connected with Class APIs</div>
      </div>
      <div className="box" style={{ marginBottom: '70px' }}>
        <h2 className="section-header">
          Explore our comprehensive API documentation
        </h2>
        <div className="tiles">
          <Tile to="/getting-started" icon={<img src={require('src/icons/svgs/light/rocket-launch.svg')} />} header="Getting Started">
            Get started by creating an app,<br />
            and follow our guides to get connected.
          </Tile>
          <Tile to="/apis/accounting-reports-final" icon={<img src={require('src/icons/svgs/light/gear-complex-code.svg')} />} header="API Reference">
            Explore Class API specifications<br />
            and start building.<br />
          </Tile>
          <Tile to="/guides/resources-overview" icon={<img src={require('src/icons/svgs/light/books.svg')} />} header="Resources">
            Learn about authentication, authorisation<br />
            and explore our technical documentation.<br />
          </Tile>
          <Tile to="/guides" icon={<img src={require('src/icons/svgs/light/book.svg')} />} header="Guides">
            View our developer guides<br />
            to utilise our API endpoints for your specific use case.
          </Tile>
          <Tile to="/changelog" icon={<img src={require('src/icons/svgs/light/arrows-rotate.svg')} />} header="Change Log">
            View the release notes<br />
            for the latest API changes.
          </Tile>
          <Tile to="/announcements" icon={<img src={require('src/icons/svgs/light/bell.svg')} />} header="Announcements">
            View the latest news<br />
            and find out about upcoming changes.
          </Tile>  
        </div>
      </div>
    </div>
  );
}

function Tile({ icon, header, children, to, textAlign = 'center' }) {
  return (
    <Link to={to} className={`tile-wrapper ${textAlign}`}>
      {icon && <div className="icon-wrapper">{icon}</div>}
      <h3 className="tile-header">{header}</h3>
      <p className="tile-description">{children}</p>
    </Link>
  );
}
