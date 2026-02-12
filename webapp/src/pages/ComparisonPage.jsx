import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { compareLandscapes, getLandscapesGeoJSON } from '../services/api';
import { ArrowLeft, Activity, Info } from 'lucide-react';
import ComparisonRadar from '../components/Comparison/ComparisonRadar';
import ComparisonMap from '../components/Comparison/ComparisonMap';
import ComparisonBar from '../components/shared/ComparisonBar';
import ScoreDisplay from '../components/shared/ScoreDisplay';
import { getScoreColor } from '../utils/scoring';
import { getDimensionExplanation } from '../utils/dimensionExplanations';
import { DIMENSION_META } from '../utils/dimensionMetadata';

const DatasetBadge = ({ abbr }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-[10px] font-mono font-medium text-gray-500 border border-gray-200">
    {abbr}
  </span>
);

const ComparisonPage = () => {
  const { id1, id2 } = useParams();
  const [comparisonData, setComparisonData] = useState(null);
  const [geoJSON, setGeoJSON] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id1 || !id2) {
        setError("Both landscape IDs are required");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const [result, geo] = await Promise.all([
          compareLandscapes(id1, id2),
          getLandscapesGeoJSON()
        ]);
        if (!result) setError("Comparison data not found");
        else {
          setComparisonData(result);
          setGeoJSON(geo);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id1, id2]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
        <p className="text-sm font-heading font-medium tracking-widest text-gray-400 uppercase">Loading Comparison...</p>
      </div>
    </div>
  );

  if (error || !comparisonData) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-xl font-heading font-bold text-gray-900">Comparison Unavailable</h2>
        <Link to="/app" className="mt-4 inline-block text-black border-b-2 border-black font-heading font-semibold">Return to Dashboard</Link>
      </div>
    </div>
  );

  const ls1 = comparisonData.landscape_1;
  const ls2 = comparisonData.landscape_2;
  const comparison = comparisonData.comparison;
  const scoreColor1 = getScoreColor(ls1.fne_score);
  const scoreColor2 = getScoreColor(ls2.fne_score);

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
            <h1 className="text-lg md:text-xl font-heading font-bold tracking-tight leading-none text-gray-900">Landscape Comparison</h1>
            <p className="text-[11px] font-sans font-medium tracking-widest uppercase text-gray-400 mt-1">{ls1.name} vs {ls2.name}</p>
          </div>
        </div>
      </div>

      <main className="w-full px-4 md:px-8 py-6 md:py-10">
        <div className="max-w-7xl mx-auto space-y-10">
        
          {/* Top: Score cards + Dimension table LEFT | Map + Radar RIGHT */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 reveal">
            
            {/* Left column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Score cards — color-accented */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  <div className="h-1 w-full" style={{ backgroundColor: scoreColor1 }}></div>
                  <div className="p-5">
                    <Link to={`/landscape/${ls1.id}`} className="font-heading font-semibold text-gray-900 hover:underline block text-sm mb-0.5">{ls1.name}</Link>
                    <p className="text-[10px] font-sans font-medium text-gray-400 uppercase mb-3">{ls1.id}</p>
                    <ScoreDisplay score={ls1.fne_score} label={ls1.score_label} color={scoreColor1} size="compact" />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  <div className="h-1 w-full" style={{ backgroundColor: scoreColor2 }}></div>
                  <div className="p-5">
                    <Link to={`/landscape/${ls2.id}`} className="font-heading font-semibold text-gray-900 hover:underline block text-sm mb-0.5">{ls2.name}</Link>
                    <p className="text-[10px] font-sans font-medium text-gray-400 uppercase mb-3">{ls2.id}</p>
                    <ScoreDisplay score={ls2.fne_score} label={ls2.score_label} color={scoreColor2} size="compact" />
                  </div>
                </div>
              </div>

              {/* Dimension table — compact, scannable */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-black text-white rounded-lg"><Activity className="w-4 h-4" /></div>
                  <h2 className="text-sm font-heading font-bold text-gray-900 uppercase tracking-wider">Dimensions</h2>
                </div>
                <div>
                  {comparison.dimension_comparison.map((dim, idx) => {
                    const color1 = getScoreColor(dim.ls1_score);
                    const color2 = getScoreColor(dim.ls2_score);
                    return (
                      <div key={idx} className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100 last:border-0">
                        <h3 className="font-heading font-medium text-gray-900 text-xs flex-1 min-w-0">{dim.dimension}</h3>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="font-mono text-base font-semibold w-8 text-right" style={{ color: color1 }}>{dim.ls1_score}</span>
                          <span className="font-mono text-base font-semibold w-8 text-right" style={{ color: color2 }}>{dim.ls2_score}</span>
                          <span className="text-[10px] font-mono text-gray-300 w-10 text-right">{dim.difference > 0 ? '+' : ''}{dim.difference.toFixed(1)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Column headers */}
                <div className="flex items-center justify-end gap-4 mt-1 text-[9px] font-medium text-gray-400 uppercase tracking-wider">
                  <span className="w-8 text-right">{ls1.name.split(' ')[0]}</span>
                  <span className="w-8 text-right">{ls2.name.split(' ')[0]}</span>
                  <span className="w-10 text-right">Delta</span>
                </div>
              </div>
            </div>

            {/* Right column — Map + Radar */}
            <div className="lg:col-span-7 space-y-4">
              <div className="min-h-[260px] md:min-h-[360px] rounded-2xl overflow-hidden border border-gray-200">
                <ComparisonMap geoJSON={geoJSON} id1={ls1.id} id2={ls2.id} />
              </div>
              <p className="text-[10px] font-sans font-medium text-gray-400 uppercase tracking-wider">Geographical context — spatial disconnect between assessed landscapes</p>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <ComparisonRadar data1={ls1.dimension_scores} data2={ls2.dimension_scores} name1={ls1.name} name2={ls2.name} />
              </div>
            </div>
          </section>

          {/* Detailed Breakdown — streamlined cards with ComparisonBar */}
          <section className="reveal delay-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-black text-white rounded-lg"><Info className="w-5 h-5" /></div>
              <h2 className="font-heading font-bold text-gray-900">Detailed Breakdown</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {comparison.dimension_comparison.map((dim, idx) => {
                const meta = DIMENSION_META[dim.key] || {};
                const { exp1, exp2 } = getDimensionExplanation(dim.key, ls1.name, ls2.name, dim.ls1_score, dim.ls2_score);
                const color1 = getScoreColor(dim.ls1_score);
                const color2 = getScoreColor(dim.ls2_score);
                return (
                  <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
                    <div className="h-0.5 w-full" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color2})` }}></div>
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="font-heading font-bold text-gray-900 text-sm mb-1">{dim.dimension}</h3>
                        <p className="text-xs text-gray-500">{meta.oneLiner}</p>
                      </div>
                      
                      {/* Datasets */}
                      <div className="flex flex-wrap gap-1">
                        {(meta.datasets || []).map(ds => (
                          <DatasetBadge key={ds} abbr={ds} />
                        ))}
                      </div>

                      {/* Side-by-side scores using ComparisonBar */}
                      <ComparisonBar
                        value1={dim.ls1_score}
                        value2={dim.ls2_score}
                        label1={ls1.name.split(' ')[0]}
                        label2={ls2.name.split(' ')[0]}
                        color1={color1}
                        color2={color2}
                      >
                        {exp1}
                      </ComparisonBar>

                      {/* Explanations */}
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-xs text-gray-500 leading-relaxed">{exp1}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{exp2}</p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-400">Gap: {Math.abs(dim.difference).toFixed(1)} pts</span>
                        <span className="text-[10px] font-mono text-gray-300">{dim.key}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Summary */}
          <section className="bg-gray-50 border border-gray-100 rounded-2xl p-5 md:p-8 reveal delay-2">
            <h2 className="font-heading font-bold text-gray-900 mb-3">Comparison Summary</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{comparison.summary}</p>
          </section>

        </div>
      </main>
    </div>
  );
};

export default ComparisonPage;
