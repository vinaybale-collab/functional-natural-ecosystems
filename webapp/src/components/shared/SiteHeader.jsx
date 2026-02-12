import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import FNELogo from './FNELogo';

const navCls = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-emerald-700 text-white' : 'text-gray-700 hover:bg-emerald-50'
  }`;

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="shrink-0">
          <FNELogo showIcon compact={false} />
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/app" className={navCls}>Explore</NavLink>
          <NavLink to="/methodology" className={navCls}>Methodology</NavLink>
          <NavLink to="/datasets" className={navCls}>Datasets</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
