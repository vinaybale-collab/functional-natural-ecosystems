# FNE Dashboard — Frontend Build Specification

## What This Is

Build a React dashboard for the **Functional Natural Ecosystems (FNE)** tool — a landscape-level ecosystem health assessment covering all of India. The tool scores ~12,000+ landscapes across 7 dimensions on a 0-10 scale, synthesizing 14 global-standard datasets.

This is a decision-support tool for government officials, conservation organizations, and funders. It must feel authoritative, data-rich, and trustworthy.

## Stack

- **React 18** with React Router
- **Leaflet** or **MapLibre GL** for the interactive map
- **Recharts** or **Chart.js** for radar charts and bar charts
- **Tailwind CSS** for styling
- **react-markdown** for rendering methodology and reports
- Plain fetch for API calls (no Redux — data is read-only)

---

## Pages to Build (5 total)

### Page 1: Landing Page (`/`)

**Map + sidebar layout:**

- **Left sidebar (30% width):**
  - Search bar (search by landscape name, state, or ecoregion)
  - Filter dropdowns: state, ecoregion, score range (0-10 slider)
  - Sortable list of landscapes showing: name, state, FNE score with colored badge, area sq km
  - Clicking a list item highlights on map and navigates to detail

- **Main area (70% width):**
  - Full India map with landscape polygons
  - Color coding by FNE score:
    - 0-1: `#8B0000` (dark red) — Collapsed
    - 1-3: `#DC143C` (red) — Critical
    - 3-5: `#FF8C00` (orange) — Stressed
    - 5-7: `#FFD700` (yellow) — Moderate
    - 7-8: `#90EE90` (light green) — Good
    - 8-9: `#228B22` (green) — Excellent
    - 9-10: `#006400` (dark green) — Pristine
  - Click polygon: popup with name + score + "View Details" link
  - Map center: `[78.9, 22.5]`, zoom: 5

**Data:** `GET /api/landscapes` + `GET /api/landscapes/geojson`

### Page 2: Landscape Detail Page (`/landscape/:id`)

- **Header:** Large FNE score with color + label (e.g., "8.3 / 10 — Excellent")
- **Info bar:** Name, State, Ecoregion, Biome, Area (sq km)
- **Radar chart:** 7 dimensions, each axis 0-10
- **Weight adjustment sliders:** 7 sliders, default 1.0, range 0-3. Recalculates overall score client-side in real time.
- **7 dimension cards:** Each shows score, confidence badge, top drivers table, justification text
- **Full report section:** Expandable markdown rendered to HTML
- **Mini map:** Small map showing this landscape polygon with neighbors
- **"Compare" button:** Opens picker for second landscape

**Data:** `GET /api/landscapes/:id`

### Page 3: Comparison Page (`/compare/:id1/:id2`)

- Side-by-side overlaid radar charts (landscape 1 = blue, landscape 2 = red)
- Dimension-by-dimension comparison table with color-coded differences
- Summary narrative text
- Two info panels (name, state, score, area)

**Data:** `GET /api/landscapes/:id1/compare/:id2`

### Page 4: Data & Methodology Page (`/methodology`)

**This is a critical page. It must establish trust and scientific credibility.**

The page has two sections: **Methodology (full text)** and **FAQ (Q&A format)**.

Use a clean, readable layout with a table of contents sidebar. The content is provided in full below (see METHODOLOGY CONTENT section).

### Page 5: Data Sources Page (`/data-sources`)

A visual summary of every dataset used, organized as cards in a grid:

**For each dataset, show a card with:**
- Dataset name
- Provider/organization logo or badge
- Resolution and coverage
- What dimension(s) it feeds
- Why it matters (one line)
- Link to official source

The datasets (14 total) are listed in the DATA SOURCES CONTENT section below.

---

## METHODOLOGY CONTENT (for Page 4)

Render this as a structured document with a sticky table-of-contents sidebar.

### Section 1: What is the FNE Framework?

The Functional Natural Ecosystems (FNE) framework assesses ecosystem health at the landscape level across India. Unlike conventional approaches that count assets (hectares of forest, number of species), FNE measures **functionality** — how well the relationships within an ecosystem are working.

Every ecosystem is defined by three sets of relationships:
- **Human-Nature:** Are communities engaged in reciprocal stewardship or extractive exploitation?
- **Nature-to-Nature:** Are species interactions (pollination, seed dispersal, predator-prey) intact?
- **Nature-to-Abiotic:** Are water cycles, soil systems, and nutrient flows healthy?

The FNE score (0-10) captures how well these relationships function. It is a sense-making tool — not a precision instrument. The difference between 6.2 and 6.4 is not meaningful. The difference between 6.2 and 3.8 is.

### Section 2: How Landscapes Are Defined

Landscapes are the fundamental unit of analysis — ecologically coherent areas of 50-540 sq km.

**Process:**
1. India is divided into a 0.15-degree grid (~250 sq km cells)
2. Each cell is classified by its dominant land cover using ESA WorldCover 2021 at 10-meter resolution — the highest resolution global land cover dataset available
3. Adjacent cells with the same dominant land cover class AND the same WWF ecoregion are merged into contiguous landscape polygons
4. Landscapes exceeding 540 sq km are split along secondary land cover transitions
5. All 601 protected areas (national parks, wildlife sanctuaries, Ramsar sites) are integrated as landscape units
6. Fragments below 50 sq km are merged into ecologically similar neighbors

This produces **~12,000-15,000 landscapes** covering all of India, each representing an ecologically homogeneous unit where a single FNE score is meaningful.

**Why this matters:** Previous approaches used arbitrary grid lines or administrative boundaries that have no ecological meaning. A district boundary runs through the middle of a forest — that's not an ecological boundary. WorldCover-derived boundaries follow actual land cover transitions (forest-to-cropland, natural-to-urban) which are real ecological edges.

### Section 3: The Seven Dimensions

Each dimension captures a critical aspect of ecosystem functionality:

**1. Wild Biodiversity (What lives there)**
Measures species richness, abundance, and functional completeness. A forest with 764 bird species is not necessarily healthier than one with 500 — what matters is whether the ecological roles (pollinators, seed dispersers, apex predators) are filled.

Data: GLOBIO4 Mean Species Abundance, GBIF species occurrences (500M+ records), WDPA protected area coverage.

**2. Ecological Connectivity (Can things move)**
Measures how well habitat patches are connected. Even a perfectly healthy forest will degrade if isolated — animals need corridors for movement, genetic exchange, and seasonal migration.

Data: ESA WorldCover largest patch index, GRIP4 road density, Hansen forest cover continuity.

**3. Ecosystem Services (What it provides)**
The tangible benefits ecosystems deliver: water regulation, pollination, flood control, cultural value. When an ecosystem is functional, it provides clean water downstream, pollinates surrounding crops, and regulates local climate.

Data: MODIS NDVI vegetation productivity, ESVD ecosystem service valuations (12,390 studies globally, 310 for India), Aqueduct water stress.

**4. Climate Resilience (Can it absorb shocks)**
The ability to absorb droughts, floods, and changing rainfall patterns. Resilience comes from diversity — of species, habitats, and elevation zones — and from the naturalness of the ecosystem.

Data: SRTM elevation diversity (30m), WorldCover land cover diversity (Shannon index), Aqueduct drought risk, MODIS NDVI seasonal stability.

**5. Community-Nature Reciprocity (How humans relate to it)**
The most distinctive FNE dimension. Ecosystems function best where humans are in reciprocal relationship with nature. The Malnad communities of Karnataka's Western Ghats, who worship king cobras and sustain traditional agroforestry, have maintained a more functional landscape than the urban fringes of Bangalore where the same ecoregion has collapsed.

Data: WorldPop population density, WDPA community-conserved areas, ESVD cultural service valuations. AI-enhanced with qualitative research on traditional ecological knowledge.

**6. Abiotic Integrity (Is the physical foundation healthy)**
Water systems, soil, groundwater — the stage on which ecological drama plays out. When groundwater tables collapse, forests die. When soil erodes, nothing grows.

Data: WRI Aqueduct 4.0 (water stress, groundwater decline, flood risk, seasonal variability — 5 indicators), SRTM slope analysis.

**7. Anthropogenic Pressure (How much are humans pushing)**
An inverse dimension — higher human pressure means a lower score. Measured separately from its consequences (captured in other dimensions) because pressure is a leading indicator: if pressure is rising, decline is imminent.

Data: Global Human Modification 2022 (4 components: overall, agriculture, built-up, transport), GRIP4 road density, WorldPop population, Hansen forest loss rate, WorldCover built-up percentage.

### Section 4: The Scoring Scale

| Score | Label | Meaning |
|-------|-------|---------|
| 0-1 | Collapsed | Ecosystem has lost fundamental structure. Cannot recover without massive intervention. |
| 1-3 | Critical | Severely degraded. Key functions failing. Urgent intervention needed. |
| 3-5 | Stressed | Functioning under significant pressure. Declining trajectory. The 3.0 threshold is where core functions begin failing irreversibly. |
| 5-7 | Moderate | Functioning with pressures. Could improve or decline. Most Indian landscapes fall here. |
| 7-8 | Good | Largely functional. Minor pressures. Realistic aspirational target. |
| 8-9 | Excellent | The best real-world examples. Strong biodiversity, intact services, healthy human-nature relationships. |
| 9-10 | Pristine | Near-perfect. Practically unachievable today. 10/10 is a theoretical ideal. |

Three reference points anchor every score:
- **10/10 — Ecological Potential:** What this ecosystem type could theoretically be at its best. A thought experiment, not a target.
- **8/10 — Best Current Example:** The best real-world instance today (e.g., core Silent Valley for tropical moist forest).
- **3/10 — Minimum Viable Threshold:** Below this, the ecosystem cannot sustain core functions. Recovery requires rebuilding from scratch.

### Section 5: How Scores Are Computed

**Stage 1: Quantitative Base Score (0-10)**
Each dimension uses 3-5 quantitative indicators. Indicators are percentile-ranked across all Indian landscapes and combined with fixed weights. This means scores are **relative** — they reflect how a landscape compares to all others in India.

**Stage 2: AI Qualitative Adjustment (-2 to +2)**
An AI model reviews research papers, news, cultural records, and government reports about each landscape and adjusts the base score by up to 2 points (3 for Community-Nature Reciprocity), with written justification citing specific evidence.

**Stage 3: Weighted Combination**
The 7 dimension scores combine into an overall FNE score. By default, all dimensions are equally weighted. Users can adjust weights using sliders to reflect their priorities (a water-focused funder might weight Abiotic Integrity higher).

### Section 6: What This Is NOT

- **Not a regulatory instrument.** Scores are indicative, not legally binding.
- **Not a precision measurement.** The difference between 6.2 and 6.4 is noise. The difference between 6.2 and 3.8 is signal.
- **Not a biodiversity census.** This is about functional relationships, not species counts.
- **Not a replacement for fieldwork.** The tool synthesizes available data and helps prioritize where field surveys are most needed.

---

## METHODOLOGY FAQ CONTENT (Q&A section on Page 4)

Render these as expandable accordion items.

**Q: Can I trust these scores?**
A: The scores synthesize 14 peer-reviewed, globally standardized datasets from organizations including ESA, NASA, World Resources Institute, IUCN, and GBIF. Each dataset undergoes validation by its provider. The FNE framework adds value by combining these into a holistic assessment — no single dataset tells the whole story, but together they reveal patterns that any individual metric would miss. The scoring methodology is transparent and reproducible.

**Q: How granular is the data?**
A: The finest resolution input is ESA WorldCover at 10 meters — that means every 10m x 10m patch of India is classified by land cover type. Elevation data (SRTM) is at 30m. Human modification is at 300m. Biodiversity baselines (GLOBIO) are at ~1km. The landscape boundaries themselves are derived from the 10m WorldCover data, making them as detailed as any global land cover product available today.

**Q: How are landscapes different from districts or states?**
A: Districts and states are administrative boundaries — they have no ecological meaning. A district boundary might run through the middle of a contiguous forest. FNE landscapes follow ecological boundaries: where forest transitions to cropland, where one ecoregion meets another, where a protected area begins. This makes each landscape score ecologically coherent — it describes a real ecological unit, not an arbitrary administrative one.

**Q: Why 7 dimensions instead of one number?**
A: A single biodiversity index hides critical information. Two landscapes might both score 5.0 overall, but one has excellent biodiversity and terrible connectivity (isolated forest), while the other has poor biodiversity but good connectivity (degraded but recoverable). The 7 dimensions reveal WHERE the problems are, which determines WHAT interventions would help.

**Q: How is Community-Nature Reciprocity measured if it's qualitative?**
A: This dimension starts with quantitative proxies (population density patterns, community-conserved area coverage, cultural ecosystem service valuations from ESVD). An AI model then reviews published research, anthropological studies, and documented traditional ecological practices to adjust the score. This is the dimension where qualitative knowledge matters most — the presence of sacred groves, traditional resource management, or indigenous stewardship practices cannot be captured by satellite imagery alone.

**Q: How often are scores updated?**
A: The underlying datasets are updated on different cycles: WorldCover annually, Hansen forest change annually, Aqueduct periodically. When key datasets update, landscape scores can be recomputed. The framework is designed for annual refreshes.

**Q: What if I disagree with a score?**
A: Scores are starting points for conversation, not endpoints. If local knowledge suggests a score is wrong, that's valuable feedback — it may indicate a data gap or a qualitative factor the model hasn't captured. The weight sliders let you adjust which dimensions matter most for your analysis.

**Q: Why can't any landscape score 10/10?**
A: 10/10 represents the theoretical ecological potential of an ecosystem type — what it could be if every relationship were at its optimum. In the current era, no landscape achieves this. The 8/10 mark represents the best real-world examples (e.g., core Silent Valley). Scores above 9 would require conditions that essentially no longer exist anywhere on Earth.

**Q: How does this compare to other frameworks?**
A: Existing frameworks either require pristine reference ecosystems (TGPS from Auroville — these references often don't exist), focus on global-level indicators too coarse for landscape decisions (Nature Positive Initiative), or treat ecosystems as carbon warehouses rather than living systems (carbon accounting). FNE is unique in centering relationships and functionality, integrating qualitative community-nature dynamics, and operating at the landscape scale where decisions are actually made.

**Q: Are the scores comparable across different ecosystem types?**
A: Yes. Scores are percentile-ranked across all Indian landscapes, so a 6.0 in the Thar Desert means "functioning at the 60th percentile relative to all Indian landscapes" — just as a 6.0 in the Western Ghats does. The dimension breakdown shows how different ecosystem types achieve their scores differently.

---

## DATA SOURCES CONTENT (for Page 5)

Display as a grid of cards, grouped by category.

### Biodiversity & Species

**1. GLOBIO4 Mean Species Abundance**
- Provider: PBL Netherlands Environmental Assessment Agency
- Resolution: ~1 km (10 arc-seconds)
- Year: 2015
- Coverage: Global
- What it measures: The mean abundance of original species relative to their abundance in undisturbed ecosystems (0 = no original species, 1 = pristine)
- Feeds: Wild Biodiversity
- Why it matters: The only global dataset that estimates how much of the original species community remains — not just species counts, but population intactness

**2. GBIF Species Occurrences**
- Provider: Global Biodiversity Information Facility
- Records: 500M+ globally, filtered to India
- Year: Ongoing (latest download Feb 2026)
- Coverage: India (point observations)
- What it measures: Observed species occurrences with taxonomic classification, coordinates, and IUCN threat status
- Feeds: Wild Biodiversity
- Why it matters: The largest open biodiversity database in the world — provides species richness and threatened species counts per landscape

### Land Cover & Vegetation

**3. ESA WorldCover 2021**
- Provider: European Space Agency (Copernicus programme)
- Resolution: 10 meters
- Year: 2021
- Coverage: Global (102 tiles for India)
- What it measures: 11 land cover classes (tree cover, shrubland, grassland, cropland, built-up, bare, snow, water, wetland, mangroves, moss/lichen)
- Feeds: Ecological Connectivity, Ecosystem Services, Climate Resilience, Anthropogenic Pressure, AND landscape boundary generation
- Why it matters: The highest-resolution global land cover product. At 10m, it can distinguish individual fields, small forest patches, and urban edges. Used both for indicator extraction AND for defining landscape boundaries.

**4. Hansen Global Forest Change 2000-2024**
- Provider: University of Maryland / Google Earth Engine
- Resolution: 30 meters
- Year: 2000-2024 (annual updates)
- Coverage: Global
- What it measures: Tree cover in 2000, annual forest loss (by year), forest gain
- Feeds: Ecological Connectivity, Anthropogenic Pressure, Climate Resilience
- Why it matters: 24 years of annual forest change data at 30m — shows not just current state but trajectory. Is this landscape losing forest? Gaining? Accelerating or decelerating?

**5. MODIS NDVI**
- Provider: NASA
- Resolution: 250 meters
- Year: 2015-2020 (16-day composites)
- Coverage: India
- What it measures: Normalized Difference Vegetation Index — a measure of vegetation greenness, density, and health
- Feeds: Ecosystem Services, Climate Resilience
- Why it matters: Annual mean NDVI indicates vegetation productivity (proxy for ecosystem service delivery). NDVI coefficient of variation indicates seasonal stability (proxy for climate resilience).

### Water & Abiotic Systems

**6. WRI Aqueduct 4.0**
- Provider: World Resources Institute
- Resolution: Sub-basin level
- Year: Baseline (latest available)
- Coverage: Global
- What it measures: 7 water risk indicators — water stress, water depletion, interannual variability, seasonal variability, groundwater decline, drought risk, flood risk (each on 0-5 scale)
- Feeds: Abiotic Integrity, Ecosystem Services
- Why it matters: The gold standard for water risk assessment. Used by governments and corporations worldwide. Captures both quantity (stress, depletion) and variability (drought, flood) risks.

### Terrain & Topography

**7. SRTM Elevation**
- Provider: NASA Shuttle Radar Topography Mission
- Resolution: 30 meters (1 arc-second)
- Year: 2000 (terrain is stable)
- Coverage: Global (60N-60S)
- What it measures: Elevation in meters, from which slope and topographic complexity are derived
- Feeds: Climate Resilience, Abiotic Integrity
- Why it matters: Elevation range within a landscape determines microclimatic diversity — more elevation zones mean more refugia for species during climate change. Slope indicates erosion potential and accessibility.

### Human Impact

**8. Global Human Modification (gHM) 2022**
- Provider: NASA / Conservation Science Partners
- Resolution: 300 meters (~1 km)
- Year: 2022
- Coverage: Global
- What it measures: Cumulative human modification of terrestrial lands (0-1 scale), decomposed into 4 threat layers: agriculture, built-up, transport infrastructure, energy/mining
- Feeds: Anthropogenic Pressure
- Why it matters: The most comprehensive measure of human footprint. Combines 13 individual stressors into a single index. The 4-component breakdown reveals WHAT type of pressure dominates each landscape.

**9. GRIP4 Road Density**
- Provider: GRIP (Global Roads Inventory Project)
- Resolution: ~10 km
- Year: 2018
- Coverage: Global
- What it measures: Total road density in meters of road per square kilometer
- Feeds: Ecological Connectivity, Anthropogenic Pressure
- Why it matters: Roads are the single most impactful linear infrastructure for habitat fragmentation. Road density is a direct proxy for connectivity loss and barrier effects on wildlife movement.

**10. WorldPop Population Density**
- Provider: WorldPop / University of Southampton
- Resolution: 1 km
- Year: 2020
- Coverage: India
- What it measures: Estimated population count per 1 km grid cell
- Feeds: Anthropogenic Pressure, Community-Nature Reciprocity
- Why it matters: Population density drives pressure on ecosystems. But the relationship is not simple — moderate density with traditional communities can indicate reciprocity, while high density with urban disconnection indicates pressure.

### Protected Areas

**11. WDPA (World Database on Protected Areas)**
- Provider: IUCN / UNEP-WCMC
- Records: 63 sites for India (internationally designated: Ramsar, World Heritage, Biosphere Reserves)
- Year: January 2026 (latest)
- Coverage: India
- What it measures: Boundaries and IUCN categories of internationally designated protected areas
- Feeds: Wild Biodiversity, Ecological Connectivity, landscape cores

**12. EJAtlas India Protected Areas**
- Provider: Environmental Justice Atlas
- Records: 550 sites (all National Parks + Wildlife Sanctuaries in India)
- Year: 2025
- Coverage: India
- What it measures: Boundaries of domestically designated protected areas with more detailed polygons than WDPA for Indian sites
- Feeds: Wild Biodiversity, Ecological Connectivity, landscape cores

### Ecosystem Valuation

**13. ESVD (Ecosystem Services Valuation Database)**
- Provider: Foundation for Sustainable Development
- Records: 12,390 globally, 310 for India
- Year: Database version Sep 2025
- Coverage: Global with India subset
- What it measures: Monetary valuations of ecosystem services (provisioning, regulating, cultural) in Int$/ha/year, linked to specific biomes and locations
- Feeds: Ecosystem Services, Community-Nature Reciprocity
- Why it matters: Translates ecological functionality into economic language. Shows that intact ecosystems provide quantifiable services — water purification, flood control, pollination — that are expensive to replace artificially.

### Ecological Regions

**14. WWF Ecoregions 2017**
- Provider: World Wildlife Fund
- Resolution: Vector polygons
- Year: 2017
- Coverage: Global (846 ecoregions, ~51 in India)
- What it measures: Biogeographic regions with distinct natural communities and species
- Feeds: Landscape boundary constraints, metadata
- Why it matters: Landscapes never cross ecoregion boundaries, ensuring each landscape represents a single ecological context. This makes scores ecologically comparable.

---

## Weight Slider Logic (Client-Side)

```javascript
const DIMENSIONS = [
  { key: 'wild_biodiversity', name: 'Wild Biodiversity' },
  { key: 'ecological_connectivity', name: 'Ecological Connectivity' },
  { key: 'ecosystem_services', name: 'Ecosystem Services' },
  { key: 'climate_resilience', name: 'Climate Resilience' },
  { key: 'community_nature_reciprocity', name: 'Community-Nature Reciprocity' },
  { key: 'abiotic_integrity', name: 'Abiotic Integrity' },
  { key: 'anthropogenic_pressure', name: 'Anthropogenic Pressure' },
];

function computeWeightedScore(dimensionScores, weights) {
  let weightedSum = 0;
  let totalWeight = 0;
  DIMENSIONS.forEach(dim => {
    const w = weights[dim.key] || 1.0;
    weightedSum += w * dimensionScores[dim.key];
    totalWeight += w;
  });
  return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 10) / 10 : 0;
}

function getScoreLabel(score) {
  if (score < 1) return 'Collapsed';
  if (score < 3) return 'Critical';
  if (score < 5) return 'Stressed';
  if (score < 7) return 'Moderate';
  if (score < 8) return 'Good';
  if (score < 9) return 'Excellent';
  return 'Pristine';
}

function getScoreColor(score) {
  if (score < 1) return '#8B0000';
  if (score < 3) return '#DC143C';
  if (score < 5) return '#FF8C00';
  if (score < 7) return '#FFD700';
  if (score < 8) return '#90EE90';
  if (score < 9) return '#228B22';
  return '#006400';
}
```

## Mock Data Strategy

All sample data is in `handoff/sample_data/`:
- `landscapes_list.json` — 10 landscapes for list + search
- `landscape_detail.json` — Full Agumbe detail with all 7 dimensions
- `landscapes_geojson.json` — 10 polygons for map rendering
- `comparison.json` — Agumbe vs Bannerghatta comparison

Build against mocks. Wrap API calls in a single `api.js` service file:

```javascript
// api.js — toggle between mock and real
const USE_MOCK = true;
const BASE_URL = 'http://localhost:8000/api';

import listData from '../handoff/sample_data/landscapes_list.json';
import detailData from '../handoff/sample_data/landscape_detail.json';
import geoData from '../handoff/sample_data/landscapes_geojson.json';
import compareData from '../handoff/sample_data/comparison.json';

export async function getLandscapes(params) {
  if (USE_MOCK) return listData;
  return fetch(`${BASE_URL}/landscapes?${new URLSearchParams(params)}`).then(r => r.json());
}
export async function getLandscapeDetail(id) {
  if (USE_MOCK) return detailData;
  return fetch(`${BASE_URL}/landscapes/${id}`).then(r => r.json());
}
export async function getLandscapesGeoJSON(params) {
  if (USE_MOCK) return geoData;
  return fetch(`${BASE_URL}/landscapes/geojson?${new URLSearchParams(params)}`).then(r => r.json());
}
export async function compareLandscapes(id1, id2) {
  if (USE_MOCK) return compareData;
  return fetch(`${BASE_URL}/landscapes/${id1}/compare/${id2}`).then(r => r.json());
}
```

## API Specification

**Base URL:** `http://localhost:8000/api`

| Endpoint | Method | Response sample |
|----------|--------|----------------|
| /api/landscapes?state=X&min_score=Y&sort=score_desc&page=1&per_page=50 | GET | landscapes_list.json |
| /api/landscapes/geojson?state=X | GET | landscapes_geojson.json |
| /api/landscapes/:id | GET | landscape_detail.json |
| /api/landscapes/:id1/compare/:id2 | GET | comparison.json |
| /api/landscapes/within-polygon | POST | { landscapes: [{id, name, overlap_pct, fne_score}] } |

## Design Principles

- Clean, professional, data-dense. Think Bloomberg terminal meets National Geographic.
- Desktop-first, mobile-responsive.
- No unnecessary animation. This is a decision-support tool.
- The map is the centerpiece.
- Scores should be visually scannable — color IS information.
- The methodology page must feel like reading a well-structured research document.

## File Structure

```
src/
  components/
    Map/
      LandscapeMap.jsx
      MapPopup.jsx
    Dashboard/
      LandscapeList.jsx
      ScoreCard.jsx
      RadarChart.jsx
      WeightSliders.jsx
      ScoreBadge.jsx
    Comparison/
      CompareView.jsx
      OverlayRadar.jsx
    Report/
      ReportView.jsx
    Methodology/
      MethodologyPage.jsx
      FAQAccordion.jsx
      DataSourceCard.jsx
  pages/
    HomePage.jsx
    LandscapeDetailPage.jsx
    ComparePage.jsx
    MethodologyPage.jsx
    DataSourcesPage.jsx
  services/
    api.js
  utils/
    scoring.js
  App.jsx
  index.jsx
```

## What Will Be Validated

When the frontend is ready, we will check:
1. Map renders polygons with correct score-based colors
2. Clicking polygon opens detail page
3. Radar chart shows 7 axes
4. Weight sliders recalculate score in real-time
5. Comparison shows overlaid radar charts
6. Search and filters work
7. Report markdown renders cleanly
8. Methodology page is fully readable with TOC navigation
9. FAQ accordion items expand/collapse
10. Data sources page shows all 14 datasets with details
11. Responsive at 1920px, 1440px, 768px
