import React from 'react';
import SiteHeader from '../components/shared/SiteHeader';
import SiteFooter from '../components/shared/SiteFooter';
import { DATASETS } from '../constants/datasets';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const plainExplain = {
  Biodiversity: 'Tells us how healthy and diverse life is in a place.',
  Connectivity: 'Tells us if habitats are connected or fragmented.',
  'Ecosystem Services': 'Tells us how much nature is helping people and the system.',
  'Climate Resilience': 'Tells us how stable the landscape is under climate stress.',
  'Anthropogenic Pressure': 'Tells us how much human activity is stressing the ecosystem.',
  Abiotic: 'Physical environment quality (water, terrain, non-living systems).',
  Community: 'How strongly communities and ecosystems support each other.',
};

const DatasetsPage = () => {
  const dimensionCounts = Object.entries(
    DATASETS.reduce((acc, d) => {
      acc[d.dimension] = (acc[d.dimension] || 0) + 1;
      return acc;
    }, {})
  ).map(([dimension, count]) => ({ dimension, count }));

  const radarData = dimensionCounts.map((d) => ({
    dimension: d.dimension.length > 12 ? d.dimension.slice(0, 12) + '...' : d.dimension,
    support: (d.count / DATASETS.length) * 10,
    fullMark: 10,
  }));

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-8">
        <section className="reveal">
          <h1 className="text-4xl md:text-5xl font-display mb-3">Datasets In Simple Words</h1>
          <p className="text-lg text-gray-600">
            These are the core datasets behind the score. For each one, we explain what it measures and why it matters.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-4 reveal delay-1">
          <article className="card p-5 border border-gray-200 rounded-xl bg-white">
            <h2 className="text-xl font-heading font-semibold mb-2">Dataset Count by Dimension</h2>
            <p className="text-sm text-gray-600 mb-4">Shows where our evidence base is deepest.</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dimensionCounts} margin={{ top: 12, right: 8, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                  <XAxis dataKey="dimension" angle={-25} textAnchor="end" interval={0} height={70} tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [value, 'datasets']} />
                  <Bar dataKey="count" fill="#111827" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
          <article className="card p-5 border border-gray-200 rounded-xl bg-white">
            <h2 className="text-xl font-heading font-semibold mb-2">Coverage Shape (Relative)</h2>
            <p className="text-sm text-gray-600 mb-4">Balanced shapes mean dimensions are comparably represented.</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#4b5563' }} />
                  <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar dataKey="support" stroke="#059669" fill="#10b981" fillOpacity={0.25} strokeWidth={2.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-2">
          {DATASETS.map((d) => (
            <article key={d.id} className="card p-5 border border-gray-200 rounded-xl bg-white">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-heading font-semibold">{d.name}</h2>
                <span className="badge">{d.abbr}</span>
              </div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{d.source}</p>
              <p className="text-sm text-gray-700 mb-3">{d.description}</p>
              <div className="text-xs text-gray-600 bg-gray-50 rounded-md p-2">
                <strong>How it helps:</strong> {plainExplain[d.dimension] || 'Supports one or more scoring dimensions.'}
              </div>
            </article>
          ))}
        </section>

        <section className="card p-6 reveal delay-3">
          <h2 className="text-2xl font-heading mb-2">How to read this page</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>If a dataset has high coverage and direct observation, confidence is higher.</li>
            <li>If values are imputed, we still show them, but with lower confidence markers.</li>
            <li>No hidden black box: detail pages show indicator-level provenance.</li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default DatasetsPage;
