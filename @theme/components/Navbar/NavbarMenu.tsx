import React from 'react';
import styled from 'styled-components';

import type { JSX } from 'react';
import type { ResolvedConfigLinks, ResolvedNavItem } from '@redocly/config';

import { breakpoints, isPrimitive } from '@redocly/theme/core/utils';
import { NavbarItem } from '@redocly/theme/components/Navbar/NavbarItem';

export type NavbarMenuProps = {
  menuItems: ResolvedConfigLinks;
  className?: string;
};

export function NavbarMenu({ menuItems, className }: NavbarMenuProps): JSX.Element | null {
  if (isPrimitive(menuItems)) {
    return null;
  }

  return (
    <NavItemsContainer data-component-name="Navbar/NavbarMenu" className={className}>
      {(menuItems as ResolvedNavItem[]).map((navItem, index) => {
        return (
          <NavbarItem
            key={`${navItem.label}_${index}`}
            data-testid={navItem.label}
            navItem={navItem}
          />
        );
      })}
    </NavItemsContainer>
  );
}

const NavItemsContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: none;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: var(--navbar-menu-justify-content);
  flex: 1;
  gap: var(--navbar-menu-items-gap);

  @media screen and (min-width: ${breakpoints.medium}) {
    display: flex;
  }
`;
