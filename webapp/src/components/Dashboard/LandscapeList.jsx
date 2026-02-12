import React, { useState } from 'react';
import { Search, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getScoreColor, getScoreLabel } from '../../utils/scoring';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const LandscapeList = ({ landscapes, onSelect, selectedId, compareMode = false, compareIds = [], onToggleCompare }) => {
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('All');
  const [filterScore, setFilterScore] = useState('All');
  const [sortBy, setSortBy] = useState('score_desc'); 

  const states = ['All', ...new Set(landscapes.map(l => l.state))].sort();
  const scoreCategories = ['All', 'Excellent', 'Good', 'Moderate', 'Stressed', 'Critical'];

  const filtered = landscapes.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                          l.state.toLowerCase().includes(search.toLowerCase());
    const matchesState = filterState === 'All' || l.state === filterState;
    const matchesScore = filterScore === 'All' || l.score_label === filterScore;
    return matchesSearch && matchesState && matchesScore;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'score_desc') return b.fne_score - a.fne_score;
    if (sortBy === 'score_asc') return a.fne_score - b.fne_score;
    if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
    if (sortBy === 'area_desc') return b.area_sqkm - a.area_sqkm;
    return 0;
  });

  const bins = [
    { label: '0-2', min: 0, max: 2 },
    { label: '2-4', min: 2, max: 4 },
    { label: '4-6', min: 4, max: 6 },
    { label: '6-8', min: 6, max: 8 },
    { label: '8-10', min: 8, max: 10.1 },
  ];

  const scoreDistribution = bins.map((bin) => ({
    range: bin.label,
    count: landscapes.filter((l) => l.fne_score >= bin.min && l.fne_score < bin.max).length,
  }));

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-gray-200 font-sans text-gray-900">
      {/* Header Area */}
      <div className="px-6 py-5 border-b border-gray-100 bg-white/50 backdrop-blur sticky top-0 z-20 space-y-4">
        
        <div className="flex items-center justify-between">
           <h2 className="text-lg font-heading font-bold tracking-tight text-gray-900">Landscapes</h2>
           <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
             {sorted.length}
           </span>
        </div>
        
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
          <input 
            type="text" 
            placeholder="Search landscape or state..." 
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all placeholder-gray-400 font-medium text-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2">
           <div className="relative">
              <select 
                className="w-full pl-3 pr-8 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
              >
                {states.map(s => <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>)}
              </select>
              <div className="absolute right-3 top-2.5 pointer-events-none">
                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
           </div>
           <div className="relative">
              <select 
                className="w-full pl-3 pr-8 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                value={filterScore}
                onChange={(e) => setFilterScore(e.target.value)}
              >
                 {scoreCategories.map(s => <option key={s} value={s}>{s === 'All' ? 'All Scores' : s}</option>)}
              </select>
              <div className="absolute right-3 top-2.5 pointer-events-none">
                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
           </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white px-2 pt-2 pb-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Score distribution</p>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution} margin={{ top: 6, right: 2, left: -12, bottom: 0 }}>
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                  formatter={(value) => [value, 'landscapes']}
                />
                <Bar dataKey="count" fill="#111827" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50 p-3 space-y-2">
        {sorted.map(landscape => {
          const isSelected = selectedId === landscape.id;
          const isCompareSelected = compareIds.includes(landscape.id);
          const scoreColor = getScoreColor(landscape.fne_score);
          const scoreLabel = getScoreLabel(landscape.fne_score);
          
          return (
            <div 
              key={landscape.id}
              onClick={() => compareMode ? onToggleCompare?.(landscape.id) : onSelect?.(landscape.id)}
              className={`
                group relative px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200
                ${isCompareSelected 
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : isSelected 
                    ? 'bg-white border-gray-300 shadow-md' 
                    : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'}
              `}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  
                  {/* Compare checkbox */}
                  {compareMode && (
                    <div className={`
                      mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors
                      ${isCompareSelected 
                        ? 'bg-white border-white' 
                        : 'border-gray-300 bg-white'}
                    `}>
                      {isCompareSelected && <Check className="w-3 h-3 text-gray-900" />}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className={`text-sm font-heading font-semibold leading-tight mb-1 ${isCompareSelected ? 'text-white' : 'text-gray-900'}`}>
                      {landscape.name}
                    </h3>
                    <div className={`flex flex-wrap items-center gap-1.5 text-xs font-normal ${isCompareSelected ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>{landscape.state}</span>
                      <span className={`w-1 h-1 rounded-full ${isCompareSelected ? 'bg-gray-600' : 'bg-gray-300'}`}></span>
                      <span>{landscape.area_sqkm.toLocaleString()} km²</span>
                    </div>
                  </div>
                </div>
                
                {/* Score */}
                <div className="flex flex-col items-end shrink-0 ml-3">
                  <span className="font-mono text-xl font-semibold" style={{ color: isCompareSelected ? '#fff' : scoreColor }}>
                    {landscape.fne_score.toFixed(1)}
                  </span>
                  <span className={`text-[10px] font-medium uppercase tracking-wider mt-0.5 ${isCompareSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                    {scoreLabel}
                  </span>
                </div>
              </div>
              
              {!compareMode && (
                <div className="mt-2 flex items-center justify-end">
                   <Link 
                      to={`/landscape/${landscape.id}`}
                      onClick={(e) => e.stopPropagation()} 
                      className={`
                        flex items-center text-xs font-medium uppercase tracking-wide px-2 py-1 rounded-lg transition-all
                        ${isSelected 
                          ? 'text-gray-900 bg-gray-50' 
                          : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}
                      `}
                   >
                      View <ChevronRight className="ml-1 h-3.5 w-3.5" />
                   </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandscapeList;
