export const DIMENSIONS = [
  { key: 'wild_biodiversity', name: 'Wild Biodiversity' },
  { key: 'ecological_connectivity', name: 'Ecological Connectivity' },
  { key: 'ecosystem_services', name: 'Ecosystem Services' },
  { key: 'climate_resilience', name: 'Climate Resilience' },
  { key: 'community_nature_reciprocity', name: 'Community-Nature Reciprocity' },
  { key: 'abiotic_integrity', name: 'Abiotic Integrity' },
  { key: 'anthropogenic_pressure', name: 'Anthropogenic Pressure' },
];

export function computeWeightedScore(dimensionScores, weights) {
  let weightedSum = 0;
  let totalWeight = 0;
  DIMENSIONS.forEach((dim) => {
    const w = weights[dim.key] !== undefined ? weights[dim.key] : 1.0;
    const score = dimensionScores[dim.key] || 0;
    weightedSum += w * score;
    totalWeight += w;
  });
  return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 10) / 10 : 0;
}

export function getScoreLabel(score) {
  if (score < 1) return 'Collapsed';
  if (score < 3) return 'Critical';
  if (score < 5) return 'Stressed';
  if (score < 7) return 'Moderate';
  if (score < 8) return 'Good';
  if (score < 9) return 'Excellent';
  return 'Pristine';
}

export function getScoreColor(score) {
  if (score < 1.5) return '#991b1b';
  if (score < 3.0) return '#dc2626';
  if (score < 4.5) return '#f97316';
  if (score < 5.5) return '#eab308';
  if (score < 6.5) return '#84cc16';
  if (score < 7.5) return '#22c55e';
  if (score < 8.5) return '#14b8a6';
  return '#0f766e';
}
