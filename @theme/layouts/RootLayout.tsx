import React from 'react';

import type { JSX } from 'react';

import { Navbar } from '@redocly/theme/components/Navbar/Navbar';
import { Footer } from '@redocly/theme/components/Footer/Footer';
import { SkipContent } from '@redocly/theme/components/SkipContent/SkipContent';

export type LayoutConfig = {
  children: React.ReactNode;
};

export function RootLayout({ children }: LayoutConfig): JSX.Element {
  return (
    <div data-component-name="layouts/RootLayout">
      <SkipContent />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
