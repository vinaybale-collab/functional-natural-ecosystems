import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between">
        <p className="text-xs text-gray-500">
          Functional Natural Ecosystems (FNE) India - Landscape intelligence platform.
        </p>
        <nav className="flex items-center gap-3 text-xs">
          <Link to="/methodology" className="text-gray-600 hover:text-black">Methodology</Link>
          <Link to="/datasets" className="text-gray-600 hover:text-black">Datasets</Link>
          <Link to="/app" className="text-gray-600 hover:text-black">Explore</Link>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
