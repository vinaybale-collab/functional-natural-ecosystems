import React from 'react';
import SiteHeader from '../components/shared/SiteHeader';
import SiteFooter from '../components/shared/SiteFooter';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-8">
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">About The Project</p>
          <h1 className="text-4xl md:text-5xl font-display mb-3">Functional Natural Ecosystems (FNE) India</h1>
          <p className="text-lg text-gray-600">
            FNE is a landscape-scale decision intelligence system that helps compare ecological health across India using a transparent evidence base.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-4 reveal delay-1">
          <article className="rounded-xl border border-gray-200 p-5 bg-gray-50">
            <h2 className="text-xl font-heading font-semibold mb-2">Scale</h2>
            <p className="text-sm text-gray-700">22,199 landscapes assessed across India with consistent scoring.</p>
          </article>
          <article className="rounded-xl border border-gray-200 p-5 bg-gray-50">
            <h2 className="text-xl font-heading font-semibold mb-2">Depth</h2>
            <p className="text-sm text-gray-700">Scores are built from multiple global dataset families and indicator-level evidence.</p>
          </article>
        </section>

        <section className="rounded-xl border border-gray-200 p-6 bg-white reveal delay-2">
          <h2 className="text-2xl font-heading font-semibold mb-3">What Makes This Trustworthy</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Transparent dimension-wise scoring (0-10).</li>
            <li>Indicator provenance shown at landscape level.</li>
            <li>Confidence labels and fallback disclosure (observed vs imputed).</li>
            <li>Documented methodology and validation outputs available in the repository.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-900 bg-gray-900 text-white p-6 reveal delay-3">
          <h2 className="text-2xl font-display mb-2">Intended Use</h2>
          <p className="text-sm text-gray-200">
            Planning, prioritization, and communication for conservation, restoration, and landscape governance. This platform is designed to support evidence-backed decisions, not replace local field knowledge.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AboutPage;
