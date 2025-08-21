import React from 'react';
import { Helmet } from 'react-helmet';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* THIS IS A TEST TO SEE IF THE COMPONENT LOADS */}
      <h1 style={{ backgroundColor: 'yellow', color: 'black', padding: '10px', textAlign: 'center' }}>
        ROOT COMPONENT IS WORKING
      </h1>
      <Helmet>
        {/* Hub Design System - Stylesheets */}
        <link rel="stylesheet" href="https://cdn.hub24.ai/dist/themes/common.css" />
        <link rel="stylesheet" href="https://cdn.hub24.ai/dist/themes/class.css" />
        <link rel="stylesheet" href="https://cdn.hub24.ai/dist/themes/ni.css" />

        {/* Hub Design System - Autoloader Script */}
        <script type="module" src="https://cdn.hub24.ai/dist/shoelace-autoloader.js" async></script>
      </Helmet>
      {children}
    </>
  );
}