import React from 'react';
import SiteHeader from '../components/shared/SiteHeader';
import SiteFooter from '../components/shared/SiteFooter';
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

const DIMENSIONS = [
  { name: 'Wild Biodiversity', summary: 'How intact and diverse species and habitats are.' },
  { name: 'Ecological Connectivity', summary: 'How connected or fragmented habitat structure is.' },
  { name: 'Ecosystem Services', summary: 'How strongly ecosystems support useful ecological functions.' },
  { name: 'Climate Resilience', summary: 'How stable ecological function is under climate variability and stress.' },
  { name: 'Community-Nature Reciprocity', summary: 'How people and ecosystems support each other in a balanced way.' },
  { name: 'Abiotic Integrity', summary: 'Condition of non-living systems: water, terrain, and physical baselines.' },
  { name: 'Anthropogenic Pressure', summary: 'Cumulative intensity of human pressure and modification.' },
];

const DATA_FAMILIES = [
  ['Biodiversity', 'GLOBIO4, GBIF, WDPA, WWF ecoregions'],
  ['Land cover and structure', 'ESA WorldCover, Hansen GFC, GRIP4 roads'],
  ['Ecosystem productivity and services', 'MODIS NDVI, ESVD'],
  ['Hydrology and climate stress', 'WRI Aqueduct, SRTM terrain'],
  ['Human pressure and settlement', 'gHM, WorldPop / GHSL'],
  ['Socio-ecological conflict context', 'EJAtlas'],
];

const PIPELINE_STEPS = [
  'Build landscape boundaries (22,199 landscapes) and geometry metadata.',
  'Extract indicators from raster/vector datasets for each landscape.',
  'Standardize indicators to a comparable 0-10 signal direction.',
  'Fill missing values using rule-based fallback levels (L1/L2/L3).',
  'Aggregate indicators into 7 dimension scores using weighted formulas.',
  'Average dimensions into final FNE score (0-10).',
  'Generate confidence labels from observed vs fallback composition.',
  'Publish detail-level provenance so every score is auditable.',
];

const MethodologyPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">
        <section className="reveal">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-2">Methodology</p>
          <h1 className="text-4xl md:text-5xl font-display mb-4">How the FNE score is computed</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            This page is intentionally detailed. It explains what the score means, how it is built, where uncertainty comes from,
            and how to interpret results responsibly. The objective is transparency and repeatability, not a black-box score.
          </p>
        </section>

        <section className="card p-6 border border-gray-200 rounded-2xl reveal delay-1">
          <h2 className="text-2xl font-heading mb-3">What this score is and is not</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
              <p className="font-semibold mb-1">What it is</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A consistent landscape-level index from 0 to 10.</li>
                <li>A comparable framework across all landscapes in India.</li>
                <li>A transparent synthesis of multiple datasets and dimensions.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
              <p className="font-semibold mb-1">What it is not</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Not a replacement for local field surveys or ground truthing.</li>
                <li>Not a legal or policy verdict by itself.</li>
                <li>Not equally certain everywhere; confidence is explicitly shown.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card p-6 border border-gray-200 rounded-2xl reveal delay-2">
          <h2 className="text-2xl font-heading mb-3">Data foundation</h2>
          <p className="text-sm text-gray-700 mb-4">
            The system combines independent global and regional data families, each contributing a different ecological signal.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold">Signal family</th>
                  <th className="text-left px-3 py-2 font-semibold">Primary datasets used</th>
                </tr>
              </thead>
              <tbody>
                {DATA_FAMILIES.map((row) => (
                  <tr key={row[0]} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-medium">{row[0]}</td>
                    <td className="px-3 py-2 text-gray-700">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card p-6 border border-gray-200 rounded-2xl reveal delay-3">
          <h2 className="text-2xl font-heading mb-3">Pipeline: step-by-step</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            {PIPELINE_STEPS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>

        <section className="card p-6 border border-gray-200 rounded-2xl reveal delay-4">
          <h2 className="text-2xl font-heading mb-3">Dimension construction</h2>
          <p className="text-sm text-gray-700 mb-3">
            Indicators are normalized so they are directionally consistent: higher means better ecological function for that dimension.
          </p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {DIMENSIONS.map((d) => (
              <article key={d.name} className="rounded-xl border border-gray-200 p-3 bg-white">
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-gray-600">{d.summary}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700">
            <p className="font-semibold mb-1">High-level formula</p>
            <p className="font-mono text-xs">Dimension Score = weighted mean(normalized indicators in that dimension)</p>
            <p className="font-mono text-xs mt-2">FNE Score = mean(7 dimension scores), clipped to 0-10</p>
          </div>
        </section>

        <section className="card p-6 border border-gray-200 rounded-2xl reveal">
          <h2 className="text-2xl font-heading mb-3">Missing data, imputation, and confidence</h2>
          <p className="text-sm text-gray-700 mb-3">
            When an indicator is missing, fallback rules are applied in explicit levels. Confidence is penalized as fallback depth increases.
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-sm mb-4">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="font-semibold">L1 fallback</p>
              <p className="text-gray-600">Nearest reliable ecological grouping (for example ecoregion-level).</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="font-semibold">L2 fallback</p>
              <p className="text-gray-600">Wider grouping (for example biome or state level).</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="font-semibold">L3 fallback</p>
              <p className="text-gray-600">Coarse fallback (for example national reference), largest confidence penalty.</p>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Example confidence mix from one production run:</p>
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

        <section className="card p-6 border border-gray-200 rounded-2xl reveal delay-1">
          <h2 className="text-2xl font-heading mb-3">Worked example: from indicators to score</h2>
          <p className="text-sm text-gray-700 mb-4">
            Example landscape with strong biodiversity and moderate climate stress:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Dimension</th>
                  <th className="text-left px-3 py-2">Score</th>
                  <th className="text-left px-3 py-2">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100"><td className="px-3 py-2">Wild Biodiversity</td><td className="px-3 py-2">7.8</td><td className="px-3 py-2">High species intactness and protection signals</td></tr>
                <tr className="border-t border-gray-100"><td className="px-3 py-2">Ecological Connectivity</td><td className="px-3 py-2">7.1</td><td className="px-3 py-2">Habitat patches still connected</td></tr>
                <tr className="border-t border-gray-100"><td className="px-3 py-2">Ecosystem Services</td><td className="px-3 py-2">6.6</td><td className="px-3 py-2">Good productivity/service baseline</td></tr>
                <tr className="border-t border-gray-100"><td className="px-3 py-2">Climate Resilience</td><td className="px-3 py-2">6.4</td><td className="px-3 py-2">Moderate resilience with stress exposure</td></tr>
                <tr className="border-t border-gray-100"><td className="px-3 py-2">Community-Nature Reciprocity</td><td className="px-3 py-2">6.0</td><td className="px-3 py-2">Balanced but improvable human-nature relation</td></tr>
                <tr className="border-t border-gray-100"><td className="px-3 py-2">Abiotic Integrity</td><td className="px-3 py-2">6.2</td><td className="px-3 py-2">Physical baseline moderate</td></tr>
                <tr className="border-t border-gray-100"><td className="px-3 py-2">Anthropogenic Pressure</td><td className="px-3 py-2">7.4</td><td className="px-3 py-2">Human pressure relatively controlled</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-700">Final FNE = average of 7 dimensions = 6.8 (moderate-to-good profile).</p>
          <div className="mt-4 bg-gray-50 rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-2">Radar profile for this example:</p>
            <LandscapeRadar data={EXAMPLE_DIMENSIONS} overallScore={6.8} />
          </div>
        </section>

        <section className="card p-6 border border-gray-200 rounded-2xl reveal delay-2">
          <h2 className="text-2xl font-heading mb-3">How to interpret results responsibly</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
            <li>Use rank + confidence together. A high score with low confidence needs caution.</li>
            <li>Compare dimensions, not just final score. Different drivers imply different interventions.</li>
            <li>Check provenance in detail pages before making a high-stakes decision.</li>
            <li>For project-level action, pair this with local field validation and stakeholder inputs.</li>
          </ul>
        </section>

        <section className="card p-6 border border-gray-200 rounded-2xl reveal delay-3">
          <h2 className="text-2xl font-heading mb-3">Current limitations and planned upgrades</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="font-semibold mb-1">Known limitations</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Some indicators rely on fallback values in sparse-data regions.</li>
                <li>Boundary geometry quality varies by source and legacy constraints.</li>
                <li>Temporal mismatch exists across global datasets.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="font-semibold mb-1">Planned upgrades</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Higher fidelity boundary improvements in square-like areas.</li>
                <li>More indicator coverage and source harmonization.</li>
                <li>Calibration against additional pilot and field evidence.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default MethodologyPage;
