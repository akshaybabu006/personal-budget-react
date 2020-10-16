import React from 'react';

import {
    Link
  } from "react-router-dom";

function Menu() {
  return (
    <nav className="menu" role="navigation">
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about" aria-label="About the site">About</Link></li>
        <li><Link to="/login" aria-label="Login the site">Login</Link></li>
    </ul>
</nav>
  );
}

export default Menu;
