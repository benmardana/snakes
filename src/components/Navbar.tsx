import { Alignment, Navbar as LibNavbar } from '@blueprintjs/core';
import React from 'react';

const Navbar = ({ children }: { children: React.ReactNode }) => (
  <LibNavbar>
    <LibNavbar.Group align={Alignment.LEFT}>
      <LibNavbar.Heading>
        <strong>Snakes</strong>
      </LibNavbar.Heading>
      <LibNavbar.Divider />
      {children}
    </LibNavbar.Group>
  </LibNavbar>
);

export default Navbar;
