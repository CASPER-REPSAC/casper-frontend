import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="navbar">
    <div className="navbar__logo">
      <Link to="/">CASPER</Link>
    </div>

    <ul className="navbar__menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/board">Board</Link>
      </li>
      <li>
        <Link to="/community">Community</Link>
      </li>
      <li>
        <Link to="/library">Library</Link>
      </li>
    </ul>

    <div className="navbar__account"></div>
  </nav>
);
export default Navigation;
