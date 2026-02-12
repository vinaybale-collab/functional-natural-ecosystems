import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FNELogo from '../components/shared/FNELogo';
import SiteFooter from '../components/shared/SiteFooter';
import { DATASETS } from '../constants/datasets';

const scorePill = 'inline-flex items-center rounded-full border border-gray-300/90 bg-white px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase';

const LandingPage = () => {
  const navigate = useNavigate();

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
        <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-10 reveal">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            <div className="lg:col-span-6 reveal delay-1 flex flex-col justify-center">
              <p className="text-[11px] tracking-[0.24em] uppercase text-gray-500 mb-3 font-semibold">Functional Natural Ecosystems - India</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.4rem] leading-[0.92] tracking-[-0.01em] mb-5">
                How functional are
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-lime-700">our ecosystems?</span>
              </h1>
              <p className="text-[1.08rem] md:text-[1.18rem] text-gray-600 max-w-xl leading-relaxed">
                22,199 landscapes, 7 dimensions, and a deep evidence trail from global datasets to landscape-level decisions.
                This platform helps compare places, understand drivers, and prioritize action.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <span className={scorePill}>22,199 Landscapes</span>
                <span className={scorePill}>14+ Dataset Families</span>
                <span className={scorePill}>75 Indicators In Pipeline</span>
                <span className={scorePill}>India-Scale Coverage</span>
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/70 p-3.5 md:p-4">
                <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => navigate('/app')}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Press Enter to Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link to="/methodology" className="px-5 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium">Read Methodology</Link>
                <Link to="/datasets" className="px-5 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium">Understand Datasets</Link>
                <Link to="/about" className="px-5 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium">About FNE</Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 reveal delay-2">
              <div
                className="h-full min-h-[360px] md:min-h-[520px] rounded-3xl border border-gray-200 bg-cover bg-center relative overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(5,46,22,0.12), rgba(2,6,23,0.45)), url('https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1400&q=80')",
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/80 mb-2">Functional Ecosystem View</p>
                  <p className="text-sm md:text-base text-white/95 max-w-md">
                    From forests and wetlands to grasslands and mountains, the platform maps functionality at landscape scale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 reveal delay-4">
          <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 text-white p-6 md:p-10 shadow-2xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-2">Decision Intelligence</p>
            <h3 className="text-3xl md:text-4xl font-display mb-7">Three things this database helps you answer</h3>
            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              <article className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-xs text-white/70 mb-2 tracking-widest uppercase">Question 01</p>
                <p className="text-sm md:text-base text-white leading-relaxed">
                  Which landscapes are strongest or weakest right now, and exactly where are they?
                </p>
              </article>
              <article className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-xs text-white/70 mb-2 tracking-widest uppercase">Question 02</p>
                <p className="text-sm md:text-base text-white leading-relaxed">
                  What specific drivers are causing differences between two landscapes?
                </p>
              </article>
              <article className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-xs text-white/70 mb-2 tracking-widest uppercase">Question 03</p>
                <p className="text-sm md:text-base text-white leading-relaxed">
                  Where should interventions happen first, with confidence and evidence?
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-gray-50/60 reveal">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display mb-1">Global datasets powering this system</h2>
                <p className="text-gray-600">Dataset name + source, quick scan view.</p>
              </div>
              <Link to="/datasets" className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium">
                Understand Datasets
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DATASETS.slice(0, 12).map((d) => (
                <article key={d.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center text-sm font-bold tracking-wider mb-3">
                    {d.abbr}
                  </div>
                  <h3 className="font-heading font-semibold leading-tight">{d.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{d.source}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default LandingPage;
