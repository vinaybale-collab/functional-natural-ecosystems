/**
 * Generate explanatory text for each dimension in comparison view.
 * Uses dimension key, scores, and landscape names to produce "why" narratives.
 */
export function getDimensionExplanation(dimKey, ls1Name, ls2Name, ls1Score, ls2Score) {
  const templates = {
    wild_biodiversity: {
      higher: (name, score) => `${name} scores ${score}/10 due to intact species communities, high protected area coverage, and strong habitat quality.`,
      lower: (name, score) => `${name} scores ${score}/10—degraded surrounding matrix and habitat fragmentation have reduced species richness and abundance outside core protected areas.`,
    },
    ecological_connectivity: {
      higher: (name, score) => `${name} maintains ${score}/10 connectivity through contiguous forest cover, low road density, and intact corridors.`,
      lower: (name, score) => `${name} scores ${score}/10—urban sprawl and infrastructure have severed habitat connectivity; corridors are fragmented or lost.`,
    },
    ecosystem_services: {
      higher: (name, score) => `${name} delivers ${score}/10 ecosystem services through dense vegetation, intact hydrological regulation, and high provisioning value.`,
      lower: (name, score) => `${name} scores ${score}/10—reduced vegetation cover and water stress limit regulating and provisioning services.`,
    },
    climate_resilience: {
      higher: (name, score) => `${name} shows ${score}/10 resilience via topographic diversity, microclimatic refugia, and stable seasonal vegetation.`,
      lower: (name, score) => `${name} scores ${score}/10—limited elevation range and higher drought/flood risk reduce adaptive capacity.`,
    },
    community_nature_reciprocity: {
      higher: (name, score) => `${name} achieves ${score}/10 reciprocity through traditional ecological knowledge, community stewardship, and sustainable land use.`,
      lower: (name, score) => `${name} scores ${score}/10—urban disconnection, migration, and loss of traditional practices have weakened community-nature relationships.`,
    },
    abiotic_integrity: {
      higher: (name, score) => `${name} maintains ${score}/10 abiotic integrity with low water stress, minimal groundwater decline, and intact physical systems.`,
      lower: (name, score) => `${name} scores ${score}/10—groundwater extraction, pollution, and altered hydrological regimes have degraded abiotic conditions.`,
    },
    anthropogenic_pressure: {
      higher: (name, score) => `${name} has low pressure (${score}/10)—minimal human modification, road density, and built-up cover.`,
      lower: (name, score) => `${name} faces high pressure (${score}/10)—proximity to urban areas, high human modification, and infrastructure fragment the landscape.`,
    },
  };

  const t = templates[dimKey] || {
    higher: (name, score) => `${name} scores ${score}/10.`,
    lower: (name, score) => `${name} scores ${score}/10.`,
  };

  const exp1 = ls1Score >= ls2Score ? t.higher(ls1Name, ls1Score) : t.lower(ls1Name, ls1Score);
  const exp2 = ls2Score >= ls1Score ? t.higher(ls2Name, ls2Score) : t.lower(ls2Name, ls2Score);

  return { exp1, exp2 };
}
