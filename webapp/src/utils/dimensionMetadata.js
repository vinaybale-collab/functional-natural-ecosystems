// Dimension descriptions, datasets, and calculation info for Comparison/Detail pages
export const DIMENSION_META = {
  wild_biodiversity: {
    oneLiner: 'Species richness, abundance, and functional completeness.',
    calc: 'Combines GLOBIO Mean Species Abundance, GBIF species occurrences, and protected area coverage. Percentile-ranked across Indian landscapes.',
    datasets: ['GLOBIO4', 'GBIF', 'WDPA', 'EJAtlas'],
    components: ['Mean Species Abundance', 'Species Richness', 'Threatened Species', 'PA Coverage'],
  },
  ecological_connectivity: {
    oneLiner: 'How well habitat patches are connected for movement and genetic exchange.',
    calc: 'Uses largest patch index (WorldCover), road density (GRIP4), forest cover and loss (Hansen). Lower fragmentation = higher score.',
    datasets: ['ESA', 'GRIP4', 'Hansen'],
    components: ['Largest Patch Index', 'Road Density', 'Forest Cover', 'Forest Loss Rate'],
  },
  ecosystem_services: {
    oneLiner: 'Tangible benefits: water regulation, pollination, cultural value.',
    calc: 'NDVI vegetation productivity (MODIS), ESVD valuations, Aqueduct water stress. Combines provisioning, regulating, and cultural services.',
    datasets: ['MODIS', 'ESVD', 'WRI', 'ESA'],
    components: ['Mean NDVI', 'Ecosystem Service Value', 'Forest Cover', 'Water Stress'],
  },
  climate_resilience: {
    oneLiner: 'Ability to absorb droughts, floods, and changing rainfall patterns.',
    calc: 'Elevation diversity (SRTM), land cover diversity (WorldCover), drought risk (Aqueduct), NDVI seasonal stability. More diversity = more refugia.',
    datasets: ['SRTM', 'ESA', 'WRI', 'MODIS'],
    components: ['Elevation Range', 'Land Cover Diversity', 'Drought Risk', 'NDVI Stability'],
  },
  community_nature_reciprocity: {
    oneLiner: 'How humans relate to nature—traditional stewardship and reciprocal relationships.',
    calc: 'Population density (WorldPop), community PA coverage (WDPA), cultural ES valuations (ESVD). AI-adjusted with qualitative research on traditional knowledge.',
    datasets: ['WorldPop', 'WDPA', 'ESVD'],
    components: ['Population Density', 'Community PA Coverage', 'Cultural ES Value'],
  },
  abiotic_integrity: {
    oneLiner: 'Water systems, soil, groundwater—the physical foundation of ecosystems.',
    calc: 'Aqueduct water stress, groundwater decline, flood risk; SRTM slope. Low stress and intact hydrology = higher score.',
    datasets: ['WRI', 'SRTM'],
    components: ['Water Stress', 'Groundwater Decline', 'Flood Risk', 'Mean Slope'],
  },
  anthropogenic_pressure: {
    oneLiner: 'Inverse dimension—higher human pressure means lower score.',
    calc: 'Global Human Modification (gHM), road density, population, built-up cover. Leading indicator of ecosystem stress.',
    datasets: ['gHM', 'GRIP4', 'WorldPop', 'ESA'],
    components: ['Human Modification Index', 'Road Density', 'Population Density', 'Built-up Cover'],
  },
};
