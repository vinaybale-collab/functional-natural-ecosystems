# SESSION 7 HANDOFF

## What This Document Covers
This is the complete handoff for Session 7, including done/not-done work, exact indicator coverage, SRTM gap diagnosis, OpenTopography API details, code changes, frontend/backend status, pipeline status, and disk space options.

## Session 7: Done vs Not Done

### Done in Session 7
1. Read full context: `fne_tool/SESSION_6_HANDOFF.md`, `fne_tool/config.py`, `FNE_METHODOLOGY_AND_PLAN.md` (scoring/API sections), pipeline scripts, backend API, and frontend handoff.
2. Confirmed SRTM elevation extraction had progressed to partial coverage:
   - Elevation indicators now present for `8,242 / 22,199` landscapes (`37.13%`).
3. Diagnosed SRTM coverage from existing 8 chunk files and identified geographic gaps.
4. Documented OpenTopography API approach for remaining tile downloads.
5. Applied slope safeguard in `fne_tool/scripts/s06_compute_scores.py`:
   - Detect bogus slope columns when mostly zeros.
   - Nullify invalid slope data in scoring input.
   - Fallback from `slope_mean` to `elevation_std` in abiotic terrain component.
   - Updated abiotic supporting-indicator confidence mapping to use `elevation_std`.
6. Reviewed frontend and backend implementation status.

### Not Done in Session 7
1. Did not run `fne_tool/scripts/s05b_fix_esvd_gbif_worldpop_hansen.py`.
2. Did not implement/run SRTM tile auto-download + remosaic script.
3. Did not rerun elevation zonal extraction after expanded SRTM coverage.
4. Did not run `fne_tool/scripts/s06_compute_scores.py` end-to-end on refreshed indicators.
5. Did not run `fne_tool/scripts/s07_validate_pilots.py`.
6. Did not switch frontend from mock mode to live backend mode.

## Indicator Coverage (Exact): 52 Indicators
Source file: `fne_tool/outputs/landscape_indicators.csv`
Landscape count: `22,199`

| Indicator | Count | Coverage % |
|---|---:|---:|
| annual_forest_loss_rate | 22,199 | 100.00 |
| drought_risk | 18,905 | 85.16 |
| elevation_range | 8,242 | 37.13 |
| elevation_std | 8,242 | 37.13 |
| flood_risk | 18,905 | 85.16 |
| forest_cover_2000_pct | 22,199 | 100.00 |
| forest_gain_pct | 22,199 | 100.00 |
| forest_loss_pct | 22,199 | 100.00 |
| groundwater_decline | 18,905 | 85.16 |
| interannual_variability | 18,905 | 85.16 |
| land_cover_diversity | 22,199 | 100.00 |
| largest_patch_index | 22,199 | 100.00 |
| lc_bare_pct | 22,199 | 100.00 |
| lc_builtup_pct | 22,199 | 100.00 |
| lc_class_count | 22,199 | 100.00 |
| lc_cropland_pct | 22,199 | 100.00 |
| lc_grassland_pct | 22,199 | 100.00 |
| lc_mangroves_pct | 22,199 | 100.00 |
| lc_moss_lichen_pct | 22,199 | 100.00 |
| lc_shrubland_pct | 22,199 | 100.00 |
| lc_snow_ice_pct | 22,199 | 100.00 |
| lc_tree_cover_pct | 22,199 | 100.00 |
| lc_water_pct | 22,199 | 100.00 |
| lc_wetland_pct | 22,199 | 100.00 |
| max_elevation | 8,242 | 37.13 |
| max_pop_density | 10,869 | 48.96 |
| mean_elevation | 8,242 | 37.13 |
| mean_ghm_agriculture | 22,197 | 99.99 |
| mean_ghm_builtup | 22,197 | 99.99 |
| mean_ghm_overall | 22,197 | 99.99 |
| mean_ghm_transport | 22,197 | 99.99 |
| mean_ndvi | 18,732 | 84.38 |
| mean_pop_density | 10,869 | 48.96 |
| mean_road_density | 22,199 | 100.00 |
| min_elevation | 8,242 | 37.13 |
| msa_max | 22,196 | 99.99 |
| msa_mean | 22,196 | 99.99 |
| msa_min | 22,196 | 99.99 |
| msa_std | 22,196 | 99.99 |
| natural_cover_pct | 22,199 | 100.00 |
| ndvi_seasonal_cv | 18,722 | 84.34 |
| pa_area_sqkm | 1,014 | 4.57 |
| pa_community_coverage_pct | 22,199 | 100.00 |
| pa_count | 22,199 | 100.00 |
| pa_coverage_pct | 22,199 | 100.00 |
| pa_weighted_score | 22,199 | 100.00 |
| seasonal_variability | 18,905 | 85.16 |
| slope_max | 22,199 | 100.00 |
| slope_mean | 22,199 | 100.00 |
| total_population | 10,869 | 48.96 |
| water_depletion | 18,905 | 85.16 |
| water_stress | 18,905 | 85.16 |

### Known Missing Families (Not Yet Materialized in the 52)
Expected from `s05b`, currently absent as indicators in the CSV:
1. GBIF biodiversity block (species richness, threatened species, density and class-level observation signals).
2. ESVD valuation block (`es_value_per_ha_yr`, `es_cultural_value`, `es_regulating_value`).
3. Hansen temporal block (`early_forest_loss_rate`, `recent_forest_loss_rate`, `forest_loss_acceleration`).

## SRTM Coverage Diagnosis

### Existing 8 Chunk Bounds (Current files in `fne_tool/data/interim/srtm/`)
1. Chunk 1: `80-82E`, `8-14N`
2. Chunk 2: `72-78E`, `14-20N`
3. Chunk 3: `78-84E`, `14-20N`
4. Chunk 4: `68-74E`, `20-26N`
5. Chunk 5: `74-80E`, `20-26N`
6. Chunk 6: `80-86E`, `20-26N`
7. Chunk 7: `74-80E`, `27-33N`
8. Chunk 8: `74-80E`, `8-14N`

### Gap Pattern
1. Latitude seam at `26-27N` (gap between chunk 5/6 top and chunk 7 bottom).
2. East coverage gap beyond `86E` (most Northeast India).
3. North coverage gap above `33N` (higher Himalaya/Ladakh area).
4. South edge gap below `8N` (southern tip and islands).
5. West-side undercoverage in many latitudes at `68-72E`.

## Remaining SRTM Download Plan: 22 Needed Tiles
These are 6x6-degree requests (within OpenTopography per-request area limits), after dropping three tiny-impact boxes from a 25-grid draft.

| # | West | South | East | North |
|---|---:|---:|---:|---:|
| 1 | 68 | 12 | 74 | 18 |
| 2 | 68 | 18 | 74 | 24 |
| 3 | 68 | 24 | 74 | 30 |
| 4 | 68 | 30 | 74 | 36 |
| 5 | 68 | 36 | 74 | 38 |
| 6 | 74 | 24 | 80 | 30 |
| 7 | 74 | 30 | 80 | 36 |
| 8 | 74 | 36 | 80 | 38 |
| 9 | 80 | 6 | 86 | 12 |
| 10 | 80 | 18 | 86 | 24 |
| 11 | 80 | 24 | 86 | 30 |
| 12 | 80 | 30 | 86 | 36 |
| 13 | 80 | 36 | 86 | 38 |
| 14 | 86 | 18 | 92 | 24 |
| 15 | 86 | 24 | 92 | 30 |
| 16 | 86 | 30 | 92 | 36 |
| 17 | 86 | 36 | 92 | 38 |
| 18 | 92 | 12 | 98 | 18 |
| 19 | 92 | 18 | 98 | 24 |
| 20 | 92 | 24 | 98 | 30 |
| 21 | 92 | 30 | 98 | 36 |
| 22 | 92 | 36 | 98 | 38 |

Dropped low-impact boxes from the original broader grid:
1. `68-74E, 6-12N`
2. `74-80E, 6-12N`
3. `92-98E, 6-12N`

## OpenTopography API Details
1. Endpoint: `GET https://portal.opentopography.org/API/globaldem`
2. Required query parameters:
   - `demtype=SRTMGL1`
   - `south=<lat>`
   - `north=<lat>`
   - `west=<lon>`
   - `east=<lon>`
   - `outputFormat=GTiff`
   - `API_Key=<REDACTED>`
3. API key for this project:
   - `<REDACTED>`
4. Request size guidance:
   - Max area: `450,000 km2` per request.
   - Practical chunking used: up to `6x6` degrees.
5. Quotas:
   - Academic: `500` calls/day.
   - Non-academic: `100` calls/day.

## Code Changes Applied (Session 7)
Modified file: `fne_tool/scripts/s06_compute_scores.py`

1. Added invalid-slope detection in main data prep:
   - If `slope_mean` or `slope_max` has `>95%` zeros among non-null records, column is nullified before scoring.
2. Updated abiotic terrain logic in `compute_abiotic_integrity()`:
   - Uses `slope_mean` only when enough non-zero data exists.
   - Otherwise falls back to `elevation_std` as terrain complexity proxy.
3. Updated confidence support mapping:
   - `SUPPORTING_INDICATORS['abiotic_integrity']` now references `elevation_std` instead of `slope_mean`.
4. Current slope quality check from indicators CSV:
   - `slope_mean`: `22,199` non-null, `802` non-zero (`96.39%` zeros).
   - `slope_max`: `22,199` non-null, `802` non-zero (`96.39%` zeros).

## Frontend Dashboard Status
Location: `fne-dashboard/`

### Build Status
1. Implemented pages: `4/5`
   - `/` Landing
   - `/app` Dashboard
   - `/landscape/:id` Landscape detail
   - `/compare/:id1/:id2` Comparison
2. Not yet implemented in app routes:
   - Methodology/Data Sources route set noted in handoff docs.

### Tech Stack
1. React 19 + React Router 7
2. Vite build setup
3. Tailwind CSS
4. React Leaflet + Leaflet
5. Recharts
6. Lucide React

### Data Mode
1. Runs on mock mode now (`USE_MOCK=true` in `fne-dashboard/src/services/api.js`).
2. Switch to real mode with `USE_MOCK=false` only after backend has real `landscape_scores.csv`.

## Backend API Status
Location: `fne_tool/api/main.py`

### Endpoints Implemented (7)
1. `GET /api/landscapes`
2. `GET /api/landscapes/geojson`
3. `GET /api/landscapes/{landscape_id}`
4. `GET /api/landscapes/{id1}/compare/{id2}`
5. `POST /api/landscapes/within-polygon`
6. `POST /api/reload`
7. `GET /api/stats`

### Backend Readiness Note
API is implemented, but real serving depends on `fne_tool/outputs/landscape_scores.csv` being produced by `s06`.

## Pipeline Architecture and Script Status

| Script | Purpose | Status |
|---|---|---|
| `fne_tool/scripts/s01_extract_datasets.py` | Dataset extraction | Done |
| `fne_tool/scripts/s02_clip_rasters.py` | India clipping | Done |
| `fne_tool/scripts/s02b_mosaic_large_rasters.py` | Large raster mosaics | Done |
| `fne_tool/scripts/s03_generate_landscapes.py` | Early landscape gen | Done (superseded) |
| `fne_tool/scripts/s03b_worldcover_landscapes.py` | v3 boundaries (22,199) | Done |
| `fne_tool/scripts/s04_zonal_stats.py` | Raster zonal indicators | Done |
| `fne_tool/scripts/s04b_worldcover_stats.py` | WorldCover metrics | Done |
| `fne_tool/scripts/s04c_fix_srtm_worldpop_hansen.py` | SRTM/WorldPop/Hansen fix pass | Partially done (slope artifact invalid) |
| `fne_tool/scripts/s05_process_vector_data.py` | WDPA/Aqueduct/vector pass | Done |
| `fne_tool/scripts/s05b_fix_esvd_gbif_worldpop_hansen.py` | Missing indicators/fixes | Not run |
| `fne_tool/scripts/s06_compute_scores.py` | Dimension + FNE scoring | Code ready (not rerun this session) |
| `fne_tool/scripts/s07_validate_pilots.py` | Pilot validation | Ready, pending |
| `fne_tool/scripts/s08_ai_scoring.py` | AI scoring/report layer | Exists, pending |

## Disk Space Situation

### Current Drive Space
1. `C:` free: `43.37 GB` / total `374.72 GB`

### Key File Sizes (Current)
1. `fne_tool/data/processed/srtm_india.tif`: `2127.51 MB`
2. `fne_tool/data/processed/landscape_boundaries_v3.geojson`: `20.34 MB`
3. `fne_tool/outputs/landscape_indicators.csv`: `43.87 MB`
4. `fne_tool/data/processed/globio_msa_india.tif`: `226.18 MB`
5. `fne_tool/data/processed/hansen_treecover2000_india.tif`: `1067.23 MB`
6. `fne_tool/data/processed/hansen_lossyear_india.tif`: `115.95 MB`
7. `fne_tool/data/processed/slope_india.tif`: missing
8. `fne_tool/outputs/landscape_scores.csv`: missing

### Cleanup Options
1. `fne_tool/data/interim/globio`: `7.04 GB` (safe to delete; processed output exists)
2. `fne_tool/data/interim/worldcover`: `0.54 GB` (safe to delete; processed output exists)
3. `fne_tool/data/interim/srtm`: `1.88 GB` (delete after new mosaic finalized)
4. Immediate safe reclaim: about `9.46 GB`
5. Large move candidates (not immediate delete):
   - `fne_tool/data/interim/gbif`: `31.56 GB` (needed until `s05b` completes)
   - `Datasets`: `12.75 GB` (archive/move when no longer needed)

## Resume State Snapshot
1. Data pipeline: about `80%` complete.
2. Remaining core work: SRTM expansion + `s05b` + `s06` + `s07`.
3. Backend API: implemented and waiting for real scores file.
4. Frontend: `4/5` pages implemented, currently mock-data mode.

