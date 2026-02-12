import React, { useEffect, useState } from 'react';
import { getLandscapes, getLandscapesGeoJSON } from '../services/api';
import LandscapeList from '../components/Dashboard/LandscapeList';
import LandscapeMap from '../components/Map/LandscapeMap';
import FNELogo from '../components/shared/FNELogo';
import { X, Menu, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [landscapes, setLandscapes] = useState([]);
  const [geoJSON, setGeoJSON] = useState(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingMap, setLoadingMap] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Compare mode state
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingList(true);
      setLoadingMap(true);
      try {
        // Load list first for fast interaction.
        const listRes = await getLandscapes();
        setLandscapes(listRes.landscapes || []);
        setLoadingList(false);

        // Load heavy boundary geometry in background.
        getLandscapesGeoJSON()
          .then((geoRes) => setGeoJSON(geoRes))
          .catch((err) => console.error("Failed to load map boundaries", err))
          .finally(() => setLoadingMap(false));
      } catch (err) {
        console.error("Failed to load landscape list", err);
        setLoadingList(false);
        setLoadingMap(false);
      }
    };
    fetchData();
  }, []);

  const handleLandscapeSelect = (id) => {
    setSelectedId(id);
  };

  const handleToggleCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const handleExitCompare = () => {
    setCompareMode(false);
    setCompareIds([]);
  };

  return (
    <div className="relative h-screen w-full bg-white overflow-hidden font-sans text-gray-900">
      
      {/* Map Layer */}
      <div className="absolute inset-0 z-0">
        <LandscapeMap 
          landscapesGeoJSON={geoJSON} 
          selectedId={selectedId} 
          onSelect={handleLandscapeSelect}
        />
        {loadingMap && (
          <div className="absolute top-4 right-4 z-[500] px-3 py-2 rounded-lg bg-white/90 border border-gray-200 text-xs text-gray-600">
            Loading map boundaries...
          </div>
        )}
      </div>

      {/* Floating Sidebar — 420px */}
      <div 
        className={`
          absolute top-2 md:top-4 bottom-2 md:bottom-4 left-2 md:left-4 z-30 w-[calc(100%-1rem)] md:w-[420px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200 overflow-hidden transform transition-transform duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'}
        `}
      >
          {/* Brand Header */}
          <div className="flex-shrink-0 px-6 py-4 bg-white/50 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between z-30">
            <Link to="/" className="group">
              <FNELogo compact showIcon />
            </Link>
            <div className="flex items-center gap-2">
              {/* Compare Mode Toggle */}
              <button
                onClick={() => compareMode ? handleExitCompare() : setCompareMode(true)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-all ${
                  compareMode 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                {compareMode ? 'Exit' : 'Compare'}
              </button>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Compare mode instruction banner */}
          {compareMode && (
            <div className="px-6 py-3 bg-gray-900 text-white text-xs font-medium flex items-center justify-between">
              <span>Select {2 - compareIds.length} landscape{compareIds.length === 1 ? '' : 's'} to compare</span>
              {compareIds.length === 2 && (
                <Link
                  to={`/compare/${compareIds[0]}/${compareIds[1]}`}
                  className="px-3 py-1.5 bg-white text-gray-900 rounded-lg font-heading font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  Compare Now
                </Link>
              )}
            </div>
          )}
          
          {/* List Component */}
          <div className="flex-1 overflow-hidden relative">
            {loadingList ? (
              <div className="p-10 text-center text-sm text-gray-500">Loading data...</div>
            ) : (
              <LandscapeList 
                landscapes={landscapes} 
                onSelect={handleLandscapeSelect}
                selectedId={selectedId}
                compareMode={compareMode}
                compareIds={compareIds}
                onToggleCompare={handleToggleCompare}
              />
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center z-30">
            <span className="font-mono tracking-wider font-medium uppercase">
              {landscapes.length.toLocaleString()} landscapes indexed
            </span>
            <span className="font-mono tracking-wider font-medium uppercase">FNE India</span>
          </div>
      </div>

      {/* Toggle Sidebar Button (When closed) */}
      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="absolute top-6 left-6 z-30 p-4 bg-black text-white shadow-2xl rounded-full hover:scale-110 transition-transform"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default DashboardPage;
