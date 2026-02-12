// scoring.js
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
    DIMENSIONS.forEach(dim => {
      const w = weights[dim.key] !== undefined ? weights[dim.key] : 1.0;
      // Handle missing scores safely
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
    if (score < 1) return '#7F1D1D'; // collapsed — deep maroon
    if (score < 3) return '#B91C1C'; // critical — strong red
    if (score < 5) return '#C2410C'; // stressed — dark orange
    if (score < 7) return '#A16207'; // moderate — dark amber (WCAG AA)
    if (score < 8) return '#15803D'; // good — medium green (WCAG AA)
    if (score < 9) return '#166534'; // excellent — forest green
    return '#14532D';               // pristine — deep green
  }
