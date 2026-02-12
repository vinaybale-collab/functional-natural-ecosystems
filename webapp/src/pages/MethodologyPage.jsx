import React from 'react';
import SiteHeader from '../components/shared/SiteHeader';
import LandscapeRadar from '../components/Dashboard/LandscapeRadar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const EXAMPLE_DIMENSIONS = {
  wild_biodiversity: 7.8,
  ecological_connectivity: 7.1,
  ecosystem_services: 6.6,
  climate_resilience: 6.4,
  community_nature_reciprocity: 6.0,
  abiotic_integrity: 6.2,
  anthropogenic_pressure: 7.4,
};

const CONFIDENCE_EXAMPLE = [
  { tier: 'High', share: 86 },
  { tier: 'Medium', share: 10 },
  { tier: 'Low', share: 4 },
];

const MethodologyPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-10">
        <section className="reveal">
          <h1 className="text-4xl md:text-5xl font-display mb-3">How The FNE Score Is Built</h1>
          <p className="text-lg text-gray-600">
            We combine multiple datasets into one landscape-level health score (0-10). The goal is not a single "perfect truth",
            but a consistent and transparent way to compare landscapes and explain why they differ.
          </p>
        </section>

        <section className="card p-6 reveal delay-1">
          <h2 className="text-2xl font-heading mb-3">Step-by-Step Pipeline</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Build landscape boundaries (22,199 landscapes).</li>
            <li>Extract indicators from raster and vector datasets for each landscape.</li>
            <li>Fill missing values using transparent fallback rules where needed.</li>
            <li>Compute 7 dimension scores (0-10) using weighted formulas.</li>
            <li>Average dimensions into one final FNE score.</li>
            <li>Compute confidence labels based on data completeness and imputation.</li>
          </ol>
        </section>

        <section className="card p-6 reveal delay-2">
          <h2 className="text-2xl font-heading mb-3">The 7 Dimensions</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><strong>Wild Biodiversity</strong><br/>How intact and diverse species are.</div>
            <div><strong>Ecological Connectivity</strong><br/>How connected habitats are across the landscape.</div>
            <div><strong>Ecosystem Services</strong><br/>How much the landscape supports useful ecological functions.</div>
            <div><strong>Climate Resilience</strong><br/>How resilient the landscape is to climate stress and variability.</div>
            <div><strong>Community-Nature Reciprocity</strong><br/>How well people and ecosystems support each other.</div>
            <div><strong>Abiotic Integrity</strong><br/>Water, terrain, and physical system health.</div>
            <div><strong>Anthropogenic Pressure</strong><br/>Level of human pressure and modification.</div>
          </div>
        </section>

        <section className="card p-6 reveal delay-3">
          <h2 className="text-2xl font-heading mb-3">Worked Example (Simple)</h2>
          <p className="text-gray-700 mb-3">
            Suppose Landscape A has strong biodiversity and forest cover, moderate water stress, and low built-up area.
            It might score high on biodiversity and connectivity, medium on abiotic integrity, and low pressure.
          </p>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead>
                <tr><th>Dimension</th><th>Score</th><th>Why</th></tr>
              </thead>
              <tbody>
                <tr><td>Wild Biodiversity</td><td>7.8</td><td>High species richness + protected area coverage</td></tr>
                <tr><td>Ecological Connectivity</td><td>7.1</td><td>Large patches + low road fragmentation</td></tr>
                <tr><td>Ecosystem Services</td><td>6.6</td><td>Good NDVI + service valuation</td></tr>
                <tr><td>Anthropogenic Pressure</td><td>7.4</td><td>Low built-up and lower human modification</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-gray-700">Final FNE is the mean of all 7 dimensions (0-10 scale).</p>
          <div className="mt-4 bg-gray-50 rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-2">Visual profile of the same example landscape:</p>
            <LandscapeRadar data={EXAMPLE_DIMENSIONS} overallScore={6.8} />
          </div>
        </section>

        <section className="card p-6 reveal delay-4">
          <h2 className="text-2xl font-heading mb-3">Confidence and Provenance</h2>
          <p className="text-gray-700 mb-2">
            Every indicator shown in detail pages includes provenance (source and whether it is observed or imputed).
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><strong>Observed</strong>: directly extracted from source dataset.</li>
            <li><strong>Imputed L1/L2/L3</strong>: fallback value from nearest reliable group (ecoregion, biome, state, national).</li>
            <li><strong>Confidence</strong>: reduced when more fallback is used.</li>
          </ul>
          <div className="mt-4 border border-gray-200 rounded-xl p-4 bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Example confidence mix for one production run:</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CONFIDENCE_EXAMPLE} margin={{ top: 8, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="tier" tick={{ fontSize: 12 }} />
                  <YAxis unit="%" />
                  <Tooltip formatter={(v) => [`${v}%`, 'landscapes']} />
                  <Bar dataKey="share" fill="#111827" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MethodologyPage;
