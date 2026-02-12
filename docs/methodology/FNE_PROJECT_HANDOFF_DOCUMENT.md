# FNE Tool - Project Handoff Document

**Project:** Functional Natural Ecosystems (FNE) Monitoring Dashboard
**Client:** Sid Rao, Rainmatter Foundation (Conservation & Restoration Division)
**Date:** 8 February 2026
**Status:** Pre-development (data acquisition phase)

---

## 1. PROJECT OVERVIEW

### What is FNE?

Functional Natural Ecosystems (FNE) is a concept developed by Sid Rao at Rainmatter Foundation. The core idea: every ecosystem's health can be assessed by looking at how well the **relationships** within it are functioning -- relationships between humans and nature, between natural systems, and between biotic and abiotic factors. When these relationships are functional, ecosystems deliver clean air, clean water, cultural services, biodiversity, and resilience.

### What are we building?

A **web-based dashboard** that provides pre-computed ecosystem health scores for every landscape across India. Decision-makers (government officials, funders, conservation organizations, researchers) can use it to understand ecosystem functionality, compare landscapes, and make informed decisions about where and how to intervene.

### Core Philosophy (from Sid Rao directly)

- This is a **"sense-making tool"**, not a precision data platform
- Comparative accuracy matters more than decimal precision ("We need to say Agumbe is better than Bannerghatta -- we don't care if Bannerghatta is 3.6 or 4.2")
- A score of **10/10 is unachievable utopia**; **8/10 is the best real-world example**; **3/10 is the minimum viability threshold**
- The tool must bring everything back to **three core relationships**: human-nature, nature-to-nature, nature-to-abiotic
- It integrates both quantitative data and qualitative insights from research publications and field knowledge
- It should highlight **tradeoffs** -- "if you add one more dam, you're probably going to a 2.6"

---

## 2. KEY DECISIONS MADE

| Decision | Resolution |
|----------|-----------|
| Product form | Web dashboard with map, landscape list, search bar, polygon drawing, comparison view |
| AI chat interface | Not required for v1. Users select landscapes and see pre-computed scores/reports |
| Geographic scope | All of India (start data processing with full India coverage) |
| Landscape unit | Ecologically coherent units, roughly 200-540 sq km (not more than ~2000 sq km). Derived from ecoregion boundaries + land cover + elevation + protected areas + administrative boundaries |
| Number of dimensions | 7 confirmed |
| Scoring scale | 0-10, specific numbers (not bands) |
| Weighting | Equal weights across all 7 dimensions, with user-adjustable sliders |
| Score generation | AI-generated from all available data sources, with deep written justification |
| Report depth | 3-4 page report per landscape explaining scores, data sources, specific findings |
| Scores are | Indicative, not official ("we're not too held up about the numbers") |
| Build order | Phase 1: Data Pipeline -> Phase 2: Scoring Engine -> Phase 3: Frontend |
| Tech stack | Python (geopandas/rasterio) + PostgreSQL/PostGIS + FastAPI + React/Leaflet |
| Frontend ownership | Can be delegated to Gemini CLI/AI Studio |

---

## 3. THE 7 DIMENSIONS AND THEIR DRIVERS

### Dimension 1: Wild Biodiversity
**What it measures:** The richness, diversity, and functional completeness of native species.

| Driver | Data Source | Type |
|--------|-----------|------|
| Mean Species Abundance | GLOBIO4 MSA raster (1km) | Quantitative |
| Species richness (birds, mammals, herps, plants) | GBIF occurrence data | Quantitative |
| Threatened species count | GBIF + IUCN Red List | Quantitative |
| Endemic species presence | GBIF + research publications | Mixed |
| Invasive species pressure | Research publications, news | Qualitative |
| Functional diversity | AI synthesis from publications | Qualitative |

### Dimension 2: Ecological Connectivity
**What it measures:** How well habitat patches are connected, enabling wildlife movement, migration, and genetic exchange.

| Driver | Data Source | Type |
|--------|-----------|------|
| Forest/habitat patch size | ESA WorldCover (10m land cover) | Quantitative |
| Distance between patches | ESA WorldCover (computed) | Quantitative |
| Road density / fragmentation | GRIP4 road density raster | Quantitative |
| Proximity to protected areas | WDPA India shapefiles | Quantitative |
| Forest loss rate (fragmentation trend) | Hansen Global Forest Change | Quantitative |
| Corridor quality | AI synthesis from research | Qualitative |

### Dimension 3: Ecosystem Services
**What it measures:** The provisioning, regulating, and cultural benefits the ecosystem provides.

| Driver | Data Source | Type |
|--------|-----------|------|
| Vegetation productivity (NDVI) | MODIS MOD13A2 | Quantitative |
| Ecosystem service valuations | ESVD database (310 India studies) | Quantitative |
| Water yield potential | WRI Aqueduct + NDVI + elevation | Derived |
| Pollination potential | Land cover + GBIF pollinator data | Mixed |
| Soil carbon proxy | NDVI + land cover type | Derived |
| Provisioning services (NTFP, timber) | Research publications | Qualitative |
| Cultural services | Research publications | Qualitative |

### Dimension 4: Climate Resilience
**What it measures:** The ecosystem's ability to absorb and recover from climate-related disturbances.

| Driver | Data Source | Type |
|--------|-----------|------|
| Elevation range/diversity | SRTM DEM (30m) | Quantitative |
| Vegetation type diversity | ESA WorldCover class count | Quantitative |
| Natural vs planted vegetation ratio | Research publications + land cover | Mixed |
| Drought risk | WRI Aqueduct drought indicator | Quantitative |
| Forest recovery rate | Hansen Forest Change (gain vs loss) | Quantitative |
| Fire history/regime | MODIS fire data (if added) | Quantitative |
| Response diversity | AI synthesis from publications | Qualitative |

### Dimension 5: Community-Nature Reciprocity
**What it measures:** The quality of human-nature relationships, traditional practices, stewardship, and reciprocity.

| Driver | Data Source | Type |
|--------|-----------|------|
| Traditional ecological practices documented | Research publications, anthropological studies | Qualitative |
| Sacred groves / community conserved areas | WDPA (OECM category) + research | Mixed |
| Human-wildlife conflict intensity | CWS reports, research publications, news | Qualitative |
| Community forest management presence | Research publications, government data | Qualitative |
| Indigenous people presence | Research publications | Qualitative |
| Livelihood dependence on ecosystem | ESVD + research | Mixed |
| Population density (inverse proxy) | WorldPop | Quantitative |

### Dimension 6: Abiotic Integrity
**What it measures:** The health of non-living environmental components -- water, soil, air.

| Driver | Data Source | Type |
|--------|-----------|------|
| Baseline water stress | WRI Aqueduct 4.0 | Quantitative |
| Groundwater table decline | WRI Aqueduct 4.0 | Quantitative |
| Seasonal water variability | WRI Aqueduct 4.0 | Quantitative |
| Flood risk | WRI Aqueduct 4.0 | Quantitative |
| Soil erosion risk proxy | Slope (SRTM) + land cover + rainfall | Derived |
| Air quality | AI synthesis from government data, news | Qualitative |
| Water quality | Research publications | Qualitative |

### Dimension 7: Anthropogenic Pressure
**What it measures:** The intensity and trend of human modification and encroachment on the ecosystem.

| Driver | Data Source | Type |
|--------|-----------|------|
| Global Human Modification index | gHM 2022 (300m) | Quantitative |
| Road density | GRIP4 | Quantitative |
| Population density + trend | WorldPop | Quantitative |
| Forest loss rate | Hansen Global Forest Change | Quantitative |
| Urbanization proximity | ESA WorldCover (built-up class) | Quantitative |
| Agriculture pressure | gHM agriculture layer | Quantitative |
| Infrastructure projects (dams, highways, mines) | AI synthesis from news, EIA reports | Qualitative |
| Land use change rate | ESA WorldCover + Hansen combined | Quantitative |

---

## 4. DATA INVENTORY

### Datasets Already Available (in project folder)

| Dataset | File | Size | Format | Coverage |
|---------|------|------|--------|----------|
| GLOBIO4 MSA | Globio4_TerrestrialMSA_10sec_2015.zip | 7 GB | GeoTIFF (1km) | Global |
| WRI Aqueduct 4.0 | aqueduct-4-0-water-risk-data.zip | 249 MB | CSV + GDB | Global |
| WDPA India | WDPA_WDOECM_Jan2026_Public_IND_shp.zip | 12 MB | Shapefile | India |
| GRIP4 Road Density | GRIP4_density_total.zip | 3.5 MB | ASCII raster (~10km) | Global |
| GRIP4 Vector Roads | GRIP4_global_vector_fgdb.zip | 2.2 GB | File Geodatabase | Global |
| EXIOBASE 3 | IOT_2022_ixi.zip | 720 MB | Text matrices | Global (economic) |
| ESVD Ecosystem Services | Esvd_Full_Data_8th-Feb-2026...csv | ~12 MB | CSV | Global (310 India records) |
| HTML Prototype | index.html | - | HTML/JS/CSS | 3 demo landscapes |
| PDF Explainer | Explainer - FNE.pdf | - | PDF | Conceptual |
| Meeting Transcript | Verbatim meeting.md | - | Markdown | - |

### Datasets Downloaded / In Progress

| Dataset | Source | Size | Format | Status |
|---------|--------|------|--------|--------|
| WWF Ecoregions 2017 | ecoregions.appspot.com | 150 MB | Shapefile | Downloaded |
| ESA WorldCover 2021 | Zenodo / ESA | ~10 GB | GeoTIFF (10m) | Downloaded |
| Hansen Forest Change 2024 | Google Cloud Storage | ~5-10 GB | GeoTIFF (30m) | Downloaded |
| WorldPop Population India | hub.worldpop.org | 17 MB | GeoTIFF (1km) | Downloaded |
| Global Human Modification 2022 | Zenodo | 9.3 GB | GeoTIFF (300m) | Downloading |
| SRTM Elevation | OpenTopography | ~2 GB | GeoTIFF (30m) | Submitted (8 chunks) |
| GBIF Species India | gbif.org | Several GB | CSV | Queued |
| MODIS NDVI | NASA AppEEARS | ~3-4 GB | GeoTIFF (1km) | Pending |

### Datasets Not Needed for v1

| Dataset | Reason |
|---------|--------|
| EXIOBASE 3 | Economic input-output model for supply chain analysis, not relevant for landscape scoring |
| GRIP4 Vector Roads | The raster density version is sufficient; vector is redundant for scoring |

### Optional / Future Datasets

| Dataset | Source | Use Case |
|---------|--------|----------|
| GLOBIL Contextual Intactness | WWF GLOBIL Hub | Biodiversity persistence priority areas |
| GLOBIL Restoration Potential | WWF GLOBIL Hub (Bastin et al.) | Climate Resilience / Ecosystem Services |
| GLOBIL Deforestation Fronts | WWF GLOBIL Hub | Anthropogenic Pressure |
| GLOBIL Freshwater Ecoregions | WWF GLOBIL Hub | Abiotic Integrity |
| Key Biodiversity Areas | keybiodiversityareas.org | Wild Biodiversity |
| India State of Forest Report | fsi.nic.in | Cross-reference (PDF only) |

---

## 5. TECH STACK

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Data Processing | Python 3.11+ (geopandas, rasterio, rasterstats, shapely, fiona, pyproj) | Extract, transform, compute zonal statistics from rasters and vectors |
| Database | PostgreSQL 16 + PostGIS 3.4 | Store landscape boundaries, raw indicators, scores, reports. Spatial queries for polygon intersection |
| Backend API | Python FastAPI | REST API serving landscape data, scores, reports, comparison endpoints |
| AI Scoring | Claude API (Anthropic) | Generate dimension scores (0-10) + 3-4 page landscape reports |
| Frontend | React + Leaflet/MapLibre GL + Chart.js/Recharts | Interactive map, polygon drawing, radar charts, score cards, comparison view |
| Deployment | TBD (cloud or local) | - |

---

## 6. ARCHITECTURE

### Data Pipeline (Phase 1)

```
Raw Datasets (GeoTIFF, Shapefile, CSV)
    |
    v
[1] Define Landscape Boundaries
    - WWF Ecoregions as base layer
    - Subdivide using land cover (WorldCover), elevation (SRTM),
      protected areas (WDPA), administrative boundaries
    - Target: ecologically coherent units, 200-540 sq km
    - Output: landscape_boundaries.geojson (polygons with IDs, names, metadata)
    |
    v
[2] Extract Zonal Statistics per Landscape
    For each landscape polygon, extract from each raster:
    - Mean MSA (GLOBIO)
    - Mean water stress, groundwater decline, drought risk (Aqueduct)
    - Mean road density (GRIP4)
    - Forest cover % (WorldCover)
    - Forest loss area & rate (Hansen)
    - Mean population density (WorldPop)
    - Mean human modification index (gHM)
    - Mean NDVI (MODIS)
    - Elevation range, mean, std dev (SRTM)
    - Land cover class distribution (WorldCover)
    |
    v
[3] Extract Vector/Tabular Metrics per Landscape
    - Count protected areas intersecting landscape (WDPA)
    - Total PA area within landscape
    - IUCN category breakdown
    - Species count from GBIF occurrences
    - Threatened species count
    - Ecosystem service valuations from ESVD (matched by biome + location)
    |
    v
[4] Store in Database
    - Table: landscapes (id, name, geometry, ecoregion, state, area_sqkm)
    - Table: landscape_indicators (landscape_id, indicator_name, value, source)
    - Table: landscape_scores (landscape_id, dimension, score, justification)
    - Table: landscape_reports (landscape_id, full_report_text, generated_date)
```

### Scoring Engine (Phase 2)

```
For each landscape:
    |
    v
[1] Compile Landscape Profile
    - All quantitative indicators from Phase 1
    - Matching ESVD valuation studies
    - Geographic context (ecoregion, state, nearby landmarks)
    |
    v
[2] AI Qualitative Research
    - Search for research papers about this landscape/region
    - Search for news about recent developments (infrastructure, conservation)
    - Search for anthropological/cultural studies
    - Compile relevant qualitative findings
    |
    v
[3] AI Score Generation (Claude API)
    - Input: quantitative profile + qualitative findings + scoring rubric
    - Output per dimension:
      - Score (0-10)
      - Confidence level (high/medium/low based on data availability)
      - Key drivers (what's pushing the score up or down)
      - 1-paragraph justification
    - Output overall:
      - Weighted FNE score (equal weights default)
      - 3-4 page landscape report with:
        - Executive summary
        - Dimension-by-dimension analysis
        - Key strengths and concerns
        - Priority actions
        - Data sources and methodology note
    |
    v
[4] Store scores and reports in database
```

### Frontend Dashboard (Phase 3)

```
React App
    |
    +-- Landing Page
    |   +-- Hero section
    |   +-- Interactive Map (Leaflet/MapLibre)
    |   |   +-- All landscape polygons color-coded by FNE score
    |   |   +-- Polygon drawing tool (Leaflet.draw)
    |   |   +-- Click landscape -> navigate to detail
    |   +-- Search bar (landscape name, state, ecoregion)
    |   +-- Landscape list (sortable by score, state, dimension)
    |
    +-- Landscape Detail Page
    |   +-- Overall FNE score (large display)
    |   +-- Radar chart (7 dimensions)
    |   +-- Dimension score cards (7 cards with score + key drivers)
    |   +-- Weight adjustment sliders (7 sliders, recalculates overall score live)
    |   +-- Full 3-4 page report (expandable)
    |   +-- Map showing this landscape highlighted
    |   +-- Confidence indicators per dimension
    |
    +-- Comparison Page
    |   +-- Side-by-side layout (2 landscapes)
    |   +-- Overlaid radar charts
    |   +-- Dimension-by-dimension comparison table
    |   +-- Relative strengths/weaknesses highlighted
    |
    +-- API Integration
        +-- GET /api/landscapes (list all, with filters)
        +-- GET /api/landscapes/{id} (full detail + scores + report)
        +-- GET /api/landscapes/within-polygon (POST polygon, get intersecting landscapes)
        +-- GET /api/landscapes/{id}/compare/{id2} (comparison data)
        +-- GET /api/landscapes/{id}/report (full text report)
```

---

## 7. LANDSCAPE BOUNDARY DEFINITION METHODOLOGY

This is one of the most critical and nuanced parts of the project.

### Approach

1. **Start with WWF Ecoregions 2017** as the base layer (846 ecoregions globally, ~51 in India though "should be 200" per Sid)
2. **Subdivide large ecoregions** using:
   - **Elevation zones** from SRTM (e.g., separate lowland from montane within same ecoregion)
   - **Land cover transitions** from WorldCover (e.g., separate forest-dominated from agriculture-dominated)
   - **Protected area boundaries** from WDPA (national parks and wildlife sanctuaries as natural landscape cores)
   - **Major infrastructure breaks** from GRIP4 (highways and railways as natural landscape dividers)
   - **Administrative boundaries** (district/taluk) as tiebreakers when ecological signals are ambiguous
3. **Target size**: 200-540 sq km per landscape unit. BRT Hills (~540 sq km) is a good upper bound. Anything over ~2000 sq km is too large to be ecologically coherent.
4. **Naming convention**: Use the most recognizable name (e.g., "Agumbe Rainforest", "Kodagu Coffee Region", "Bandipur-Nagarhole Complex") with the ecoregion and state as metadata.

### Estimated Landscape Count
- Karnataka: ~50-80 landscapes
- All India: ~500-1500 landscapes (depends on subdivision granularity)

---

## 8. THE ESVD DATASET

The Ecosystem Services Valuation Database (ESVD) is a major asset for this project.

- **Total records**: 12,390 valuation studies globally
- **India records**: 310 studies
- **Coverage**: Tropical/subtropical forests, inland wetlands, coastal systems, rivers/lakes, marine, intensive land use, rangelands
- **Key columns**: Biome, Ecosystem type, Ecosystem service category (TEEB classification), Country, Lat/Long, Valuation methods, Value in Int$/hectare/year, Study authors and references
- **Use case**: Directly feeds the Ecosystem Services dimension. For each landscape, find matching ESVD studies (by biome, ecozone, proximity) and use their valuations as quantitative inputs. Where direct matches exist, use those values. Where they don't, use biome-level averages as proxies.

---

## 9. WHAT EXISTS SO FAR

### Built
- **HTML prototype** (index.html): A single-page dashboard with 3 demo landscapes (Agumbe 8.3, Kodagu 6.2, Bannerghatta 3.8), 7 marker scores, radar charts, modals with detail. Uses hardcoded data. Good for design reference.
- **PDF explainer**: Visual guide with 5 FNE characteristics, radar charts, scoring methodology. Good for stakeholder communication.

### Not Yet Built
- Data pipeline
- Landscape boundary definitions
- Database
- Scoring engine
- Backend API
- Production frontend

---

## 10. GEMINI HANDOFF (FRONTEND)

### What Gemini Should Build
Gemini CLI / AI Studio should own Phase 3 (Frontend). Specifically:

1. **React app scaffolding** with React Router
2. **Map component** using Leaflet or MapLibre GL JS
   - Render landscape polygons from GeoJSON (served by API)
   - Color-code by FNE score (red-yellow-green gradient)
   - Polygon drawing tool (Leaflet.draw plugin) for "find landscapes in this area"
   - Click to navigate to landscape detail
3. **Landscape detail page**
   - Large FNE score display with color indicator
   - Radar chart (Chart.js or Recharts) showing 7 dimensions
   - 7 dimension score cards with expandable driver details
   - Weight adjustment sliders (7 range inputs, default 1.0 each, recalculates weighted average in real-time)
   - Full report section (markdown rendered to HTML)
   - Mini-map showing landscape highlighted in context
4. **Comparison page**
   - Select 2 landscapes
   - Side-by-side radar charts (overlaid)
   - Dimension comparison table
5. **Search and filter**
   - Search by name
   - Filter by state, ecoregion, score range
   - Sort by score (overall or any dimension)
6. **Design direction**: Use the existing HTML prototype (index.html) as the design reference -- forest/nature color palette, clean cards, radar charts

### What Gemini Needs from Us
- API specification (endpoints, request/response schemas) -- produced at end of Phase 2
- Sample GeoJSON for landscape boundaries
- Sample JSON for landscape scores and reports
- The existing index.html as design reference

---

## 11. REFERENCE MATERIALS

| Document | Location | Purpose |
|----------|----------|---------|
| Meeting transcript | Verbatim meeting.md | Sid Rao's vision, philosophy, and design intent in his own words |
| HTML prototype | index.html | Design reference for dashboard UI |
| PDF explainer | Explainer - Functional Natural Ecosystems (FNE).pdf | Conceptual framework, radar charts, scoring approach |
| Bar chart image | WhatsApp Image 2026-01-12... | Current vs 10-year target visualization |
| This handoff document | FNE_PROJECT_HANDOFF_DOCUMENT.md | Complete project context |
| Methodology document | FNE_METHODOLOGY_AND_PLAN.md | Technical methodology and build plan |

---

## 12. KEY CONTACTS AND CONTEXT

- **Sid Rao**: Rainmatter Foundation, Conservation & Restoration. The visionary behind FNE. Key philosophy: relationships are the core metric, precision is less important than comparative accuracy, the tool should be a "sense-making" instrument.
- **Speaker 2 in transcript** (collaborator): Brought up existing frameworks (TGPS from Auroville, State of Nature metrics from Nature Positive Initiative), available databases (WRI Aqueduct, WDPA, GLOBIO), and practical data integration questions.
- **Rainmatter Foundation**: A philanthropic initiative by Zerodha focused on climate and ecology. Works with conservation organizations across India.

---

## 13. RISKS AND OPEN QUESTIONS

| Risk/Question | Impact | Mitigation |
|---------------|--------|------------|
| Landscape boundary definition is subjective | Different subdivisions produce different scores | Document methodology clearly, allow future refinement |
| AI-generated scores may be inconsistent across landscapes | Credibility issue if users compare scores | Use consistent prompt templates, validate against expert knowledge for pilot landscapes |
| GLOBIO MSA data is from 2015 | May not reflect recent changes | Supplement with Hansen forest loss (up to 2024) and news/publication search |
| Qualitative data availability varies hugely by landscape | Well-studied landscapes (Agumbe, Western Ghats) will have rich reports; remote areas will be sparse | Flag confidence level per dimension, be transparent about data gaps |
| ESVD has 310 India studies but not evenly distributed | Some biomes/regions will have no valuation data | Use biome-level averages as fallback |
| Scale: hundreds of AI-generated reports for all India | Cost (API calls) and quality control | Batch processing with review of sample outputs before full run |
| Users may treat indicative scores as official | Political/credibility risk | Clear disclaimers, "indicative" labeling, show confidence levels |
