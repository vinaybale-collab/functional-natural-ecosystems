import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLandscapeDetail } from '../services/api';
import { ArrowLeft, Activity, Info, AlertTriangle, CheckCircle2, TrendingUp, ChevronDown, ShieldCheck, Database } from 'lucide-react';
import LandscapeRadar from '../components/Dashboard/LandscapeRadar';
import ScoreDisplay from '../components/shared/ScoreDisplay';
import { getScoreColor } from '../utils/scoring';

function parseReport(markdown) {
  if (!markdown || typeof markdown !== 'string') return [];
  const sections = [];
  const lines = String(markdown).split('\n');
  let currentSection = { title: 'Executive Summary', content: '' };
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      if (currentSection.content.trim()) sections.push({ ...currentSection });
      currentSection = { title: line.replace('## ', ''), content: '' };
    } else {
      currentSection.content += (line ?? '') + '\n';
    }
  });
  if (currentSection.content.trim()) sections.push(currentSection);
  return sections;
}

const LandscapeDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedReport, setExpandedReport] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getLandscapeDetail(id);
        if (!result) setError("Landscape data not found");
        else setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleReport = (idx) => {
    setExpandedReport(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
        <p className="text-sm font-heading font-medium tracking-widest text-gray-400 uppercase">Loading Analysis...</p>
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-xl font-heading font-bold text-gray-900">Data Unavailable</h2>
        <Link to="/app" className="mt-4 inline-block text-black border-b-2 border-black font-heading font-semibold">Return to Dashboard</Link>
      </div>
    </div>
  );

  const scoreColor = getScoreColor(data.fne_score);
  const reportSections = parseReport(data.report);
  let dimensionScores = data.dimension_scores || {};
  const provenance = Array.isArray(data.indicator_provenance) ? data.indicator_provenance : [];
  if (Object.keys(dimensionScores).length === 0 && data.dimensions) {
    data.dimensions.forEach(d => dimensionScores[d.key] = d.score);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/app" className="group flex items-center gap-3 text-gray-500 hover:text-black transition-colors">
            <div className="p-2 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="text-sm font-heading font-medium tracking-widest uppercase hidden md:block">Back to Map</span>
          </Link>
          <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
          <div>
            <h1 className="text-lg md:text-xl font-heading font-bold tracking-tight leading-none text-gray-900">{data.name}</h1>
            <p className="text-[11px] font-sans font-medium tracking-widest uppercase text-gray-400 mt-1">{data.id} • {data.state}</p>
          </div>
        </div>
      </div>

      <main className="w-full px-4 md:px-8 py-6 md:py-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Top Row: Score + Radar LEFT | Dimensional Analysis RIGHT */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 reveal">
            
            {/* Score + Radar */}
            <div className="xl:col-span-5">
              <div className="bg-gray-50 rounded-2xl p-5 md:p-8 border border-gray-100">
                <span className="inline-block text-xs font-heading font-medium uppercase tracking-wider text-gray-400 mb-4">Overall FNE Score</span>
                <ScoreDisplay score={data.fne_score} label={data.score_label} color={scoreColor} size="hero" className="mb-6" />
                <LandscapeRadar data={dimensionScores} overallScore={data.fne_score} />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-xs font-sans font-medium text-gray-400 uppercase tracking-wider mb-2">Area</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-2xl font-semibold text-gray-900">{data.area_sqkm?.toLocaleString?.() ?? data.area_sqkm}</span>
                    <span className="text-sm font-sans text-gray-400">km²</span>
                  </div>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-xs font-sans font-medium text-gray-400 uppercase tracking-wider mb-2">Ecoregion</div>
                  <div className="text-sm font-heading font-semibold text-gray-900 leading-tight">{data.ecoregion ?? '\u2014'}</div>
                </div>
              </div>
            </div>

            {/* Dimensional Analysis — data first */}
            <div className="xl:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-black text-white rounded-lg"><Activity className="w-5 h-5" /></div>
                <h2 className="text-xl font-heading font-bold text-gray-900">Dimensional Analysis</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.dimensions && data.dimensions.map((dim) => {
                  const dimColor = getScoreColor(dim.score);
                  return (
                    <div key={dim.key} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
                      <div className="h-1 w-full" style={{ backgroundColor: dimColor }}></div>
                      <div className="p-5">
                        <h3 className="font-heading font-semibold text-gray-900 text-sm mb-3">{dim.name}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-3xl font-semibold" style={{ color: dimColor }}>{dim.score}</span>
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${(dim.score ?? 0) * 10}%`, backgroundColor: dimColor }}></div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{dim.justification ?? ''}</p>
                      </div>
                      {dim.drivers && dim.drivers.length > 0 && (
                        <div className="px-5 pb-4 pt-0">
                          <div className="grid grid-cols-2 gap-2">
                            {dim.drivers.slice(0, 4).map((d, i) => (
                              <div key={i} className="p-2 bg-gray-50 rounded-lg">
                                <span className="text-[10px] font-sans font-medium text-gray-400 uppercase tracking-wider">{d.name}</span>
                                <div className="font-mono text-sm font-semibold text-gray-900">{d.value ?? '\u2014'} <span className="text-xs font-normal text-gray-400">{d.unit ?? ''}</span></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Intelligence Report — collapsible sections (progressive disclosure) */}
          <section className="reveal delay-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-black text-white rounded-lg"><ShieldCheck className="w-5 h-5" /></div>
              <h2 className="text-xl font-heading font-bold text-gray-900">Data Confidence</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.dimensions && data.dimensions.map((dim) => {
                const conf = dim.confidence || 'LOW';
                const confColor = conf === 'HIGH' ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : conf === 'MEDIUM' ? 'text-amber-700 bg-amber-50 border-amber-200'
                    : 'text-rose-700 bg-rose-50 border-rose-200';
                const observed = (dim.drivers || []).filter(d => d.value !== null && d.value !== undefined && !d.is_imputed).length;
                const imputed = (dim.drivers || []).filter(d => d.value !== null && d.value !== undefined && d.is_imputed).length;
                return (
                  <div key={dim.key} className="border border-gray-200 rounded-2xl p-5 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading font-semibold text-sm">{dim.name}</h3>
                      <span className={`text-[11px] px-2 py-1 rounded-md border font-semibold tracking-wide ${confColor}`}>{conf}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{dim.confidence_reason || 'Confidence based on driver data availability.'}</p>
                    <p className="text-xs text-gray-500">Observed drivers: <strong>{observed}</strong> | Imputed drivers: <strong>{imputed}</strong></p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="reveal delay-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-black text-white rounded-lg"><Database className="w-5 h-5" /></div>
              <h2 className="text-xl font-heading font-bold text-gray-900">Indicator Provenance</h2>
            </div>
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-heading text-xs uppercase tracking-wider text-gray-500">Indicator</th>
                      <th className="text-left px-4 py-3 font-heading text-xs uppercase tracking-wider text-gray-500">Value</th>
                      <th className="text-left px-4 py-3 font-heading text-xs uppercase tracking-wider text-gray-500">Source</th>
                      <th className="text-left px-4 py-3 font-heading text-xs uppercase tracking-wider text-gray-500">Data Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {provenance.slice(0, 120).map((p, idx) => (
                      <tr key={`${p.indicator}-${idx}`} className="border-b border-gray-100 last:border-0">
                        <td className="px-4 py-3 font-mono text-xs text-gray-700">{p.indicator}</td>
                        <td className="px-4 py-3 text-gray-900">{p.value ?? '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{p.source || 'Unknown'}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[11px] px-2 py-1 rounded-md border font-semibold tracking-wide ${p.is_imputed ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200'}`}>
                            {p.is_imputed ? 'Imputed' : 'Observed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                Showing first {Math.min(120, provenance.length)} of {provenance.length} indicators for readability.
              </div>
            </div>
          </section>

          <section className="reveal delay-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-black text-white rounded-lg"><Info className="w-5 h-5" /></div>
              <h2 className="text-xl font-heading font-bold text-gray-900">Intelligence Report</h2>
            </div>
            <div className="space-y-3">
              {reportSections.slice(0, 6).map((section, idx) => {
                const isExpanded = expandedReport[idx] ?? (idx === 0);
                return (
                  <div key={idx} className="bg-gray-50/70 border border-gray-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleReport(idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-sm font-heading font-semibold text-gray-900 flex items-center gap-2">
                        {section.title.includes('Strength') && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {section.title.includes('Concern') && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                        {section.title.includes('Action') && <TrendingUp className="w-4 h-4 text-blue-600" />}
                        {section.title}
                      </h3>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {(section.content || '').slice(0, 800)}{(section.content || '').length > 800 ? '\u2026' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default LandscapeDetailPage;
