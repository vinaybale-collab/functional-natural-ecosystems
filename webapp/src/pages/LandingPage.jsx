import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Globe2, Layers3, ShieldCheck } from 'lucide-react';
import FNELogo from '../components/shared/FNELogo';
import SiteFooter from '../components/shared/SiteFooter';
import { DATASETS } from '../constants/datasets';

const scorePill = 'inline-flex items-center rounded-full border border-gray-300 px-3 py-1 text-xs tracking-wider uppercase';

const LandingPage = () => {
  const navigate = useNavigate();

  const datasetByDimension = useMemo(() => {
    const map = new Map();
    for (const d of DATASETS) {
      const key = d.dimension;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(d.name);
    }
    return Array.from(map.entries());
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') {
        navigate('/app');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <FNELogo showIcon compact={false} />
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/about" className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">About</Link>
            <Link to="/methodology" className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">Methodology</Link>
            <Link to="/datasets" className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">Datasets</Link>
            <Link to="/app" className="px-3 py-2 rounded-md text-sm bg-black text-white">Explore</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-10 reveal">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 reveal delay-1">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">Functional Natural Ecosystems - India</p>
              <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
                A national map of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-lime-700">ecosystem health</span>
              </h1>
              <p className="mt-5 text-lg text-gray-600 max-w-2xl">
                22,199 landscapes, 7 dimensions, and a deep evidence trail from global datasets to landscape-level decisions.
                This platform helps compare places, understand drivers, and prioritize action.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className={scorePill}>22,199 Landscapes</span>
                <span className={scorePill}>14+ Dataset Families</span>
                <span className={scorePill}>75 Indicators In Pipeline</span>
                <span className={scorePill}>India-Scale Coverage</span>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-gradient-to-r from-emerald-50 to-lime-50 p-4">
                <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Ecological signal profile</p>
                <svg viewBox="0 0 600 120" className="w-full h-20">
                  <defs>
                    <linearGradient id="signalLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#4d7c0f" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#signalLine)"
                    strokeWidth="5"
                    points="0,88 70,76 140,60 210,66 280,45 350,38 420,49 490,35 560,28 600,32"
                  />
                  <circle cx="560" cy="28" r="5" fill="#065f46" />
                </svg>
                <p className="text-xs text-gray-600 mt-1">A fast visual cue of multi-dimension ecosystem performance gradients.</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/app')}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  Press Enter to Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link to="/methodology" className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50">Read Methodology</Link>
                <Link to="/datasets" className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50">Understand Datasets</Link>
                <Link to="/about" className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50">About FNE</Link>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3 reveal delay-2">
              <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center gap-2 text-sm font-medium mb-1"><Globe2 className="w-4 h-4" /> Scale</div>
                <p className="text-sm text-gray-600">National landscape inventory with comparable scores from mountains to coasts.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center gap-2 text-sm font-medium mb-1"><Layers3 className="w-4 h-4" /> Depth</div>
                <p className="text-sm text-gray-600">Each score can be traced to dimension drivers and indicator-level provenance.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center gap-2 text-sm font-medium mb-1"><ShieldCheck className="w-4 h-4" /> Trust</div>
                <p className="text-sm text-gray-600">Confidence and imputation transparency are shown per landscape, not hidden.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-gray-50/60 reveal delay-3">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <h2 className="text-2xl md:text-3xl font-display mb-2">Global datasets powering this system</h2>
            <p className="text-gray-600 mb-6">What each family contributes, in plain language.</p>

            <div className="grid md:grid-cols-2 gap-4">
              {datasetByDimension.map(([dim, names]) => (
                <article key={dim} className="rounded-xl border border-gray-200 bg-white p-4">
                  <h3 className="font-heading font-semibold mb-2">{dim}</h3>
                  <p className="text-sm text-gray-600">{names.join(', ')}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 reveal delay-4">
          <div className="rounded-2xl border border-gray-900 bg-gray-900 text-white p-6 md:p-8">
            <h3 className="text-2xl font-display">What this helps you do</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm text-gray-200">
              <p>Find high-risk landscapes quickly and see what is driving the risk.</p>
              <p>Compare two landscapes side-by-side before deciding where to intervene.</p>
              <p>Explain decisions with evidence, provenance, and confidence reasoning.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default LandingPage;
