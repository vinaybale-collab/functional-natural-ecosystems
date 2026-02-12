# NEXT SESSION PROMPT

Copy everything below this line into the next coding session.

---

I am building the FNE (Functional Natural Ecosystems) tool for India for Sidharth Rao / Rainmatter Foundation.

Project summary:
- Goal: Score `22,199` India landscapes across `7` dimensions on a `0-10` scale.
- Input stack: 14 dataset families across raster + vector indicators.
- Current stage: pipeline mostly built; final scoring run is blocked by missing indicator backfill and SRTM coverage expansion.

Read these first (in order):
1. `fne_tool/SESSION_7_HANDOFF.md`
2. `fne_tool/config.py`
3. `FNE_METHODOLOGY_AND_PLAN.md` (scoring formulas + API sections)

History across sessions 1 to 7:
1. Sessions 1 to 3:
   - Built end-to-end scripts `s01` to `s08`.
   - Extracted and processed multi-source datasets.
2. Session 4:
   - Added `s03b_worldcover_landscapes.py`.
   - Produced v3 landscape boundaries: `22,199` units.
3. Session 5:
   - Ran zonal + WorldCover stats pipelines.
   - Built FastAPI backend.
4. Session 6:
   - Ran vector processing (WDPA/Aqueduct).
   - Fixed multiple script issues (ESVD code mapping, GBIF geometry handling, WorldPop nodata path).
   - Rebuilt SRTM mosaic from 8 archives, but national coverage remained partial.
   - Slope derivative output remained invalid.
5. Session 7:
   - Confirmed elevation indicators improved to `8,242/22,199` (`37.13%`) but still incomplete.
   - Diagnosed exact SRTM chunk coverage gaps.
   - Finalized OpenTopography API strategy and 22-tile coordinate plan.
   - Patched `s06_compute_scores.py` to detect invalid slope and fallback to `elevation_std`.
   - Reviewed frontend and backend readiness.

Current state when resuming:
- Data pipeline: about `80%` complete.
- Backend API: implemented (`7` endpoints), but needs real `fne_tool/outputs/landscape_scores.csv`.
- Frontend dashboard: `4/5` pages implemented, currently mock mode (`USE_MOCK=true`).

Priority tasks (execute in this exact order):
1. Expand SRTM coverage using OpenTopography and rebuild elevation coverage.
2. Run `s05b` to backfill missing indicator families.
3. Run `s06` to generate final dimension/FNE scores.
4. Run `s07` pilot validation.
5. Switch frontend to live API mode once real scores are available.

Detailed Task 1: OpenTopography SRTM downloads
- Endpoint:
  `GET https://portal.opentopography.org/API/globaldem`
- Params:
  `demtype=SRTMGL1`
  `south=<lat>`
  `north=<lat>`
  `west=<lon>`
  `east=<lon>`
  `outputFormat=GTiff`
  `API_Key=<REDACTED>`
- Limits:
  - Max request area: `450,000 km2`
  - Practical box: `6x6` degrees
  - Daily calls: academic `500`, non-academic `100`
- Existing 8 chunks only cover central/north-central belts.
- Remaining 22 boxes to request:
  1) 68,12,74,18
  2) 68,18,74,24
  3) 68,24,74,30
  4) 68,30,74,36
  5) 68,36,74,38
  6) 74,24,80,30
  7) 74,30,80,36
  8) 74,36,80,38
  9) 80,6,86,12
  10) 80,18,86,24
  11) 80,24,86,30
  12) 80,30,86,36
  13) 80,36,86,38
  14) 86,18,92,24
  15) 86,24,92,30
  16) 86,30,92,36
  17) 86,36,92,38
  18) 92,12,98,18
  19) 92,18,98,24
  20) 92,24,98,30
  21) 92,30,98,36
  22) 92,36,98,38
- After download:
  - Mosaic old + new SRTM tiles.
  - Update `fne_tool/data/processed/srtm_india.tif`.
  - Recompute elevation zonal indicators for all landscapes.

Detailed Task 2: Run missing-indicator backfill
Run:
`python fne_tool/scripts/s05b_fix_esvd_gbif_worldpop_hansen.py`

Expected adds/fixes include:
- GBIF-derived metrics
- ESVD value metrics
- Hansen temporal split metrics
- WorldPop/Hansen consistency fixes

Gotcha:
- GBIF source is large (`~31.56 GB` local interim); runtime can be long (often tens of minutes).

Detailed Task 3: Scoring
Run:
`python fne_tool/scripts/s06_compute_scores.py`

Gotcha:
- Slope columns are numerically present but invalid (`96.39%` zeros).
- `s06` already handles this by nullifying bad slope and using `elevation_std` terrain fallback for abiotic integrity.

Detailed Task 4: Pilot validation
Run:
`python fne_tool/scripts/s07_validate_pilots.py`

Detailed Task 5: Frontend live switch
1. Ensure backend is up:
   `uvicorn fne_tool.api.main:app --reload --host 0.0.0.0 --port 8000`
2. Set `USE_MOCK=false` in:
   `fne-dashboard/src/services/api.js`
3. Verify list/map/detail/compare endpoints against real scored data.

Backend API summary (already implemented):
1. `GET /api/landscapes`
2. `GET /api/landscapes/geojson`
3. `GET /api/landscapes/{landscape_id}`
4. `GET /api/landscapes/{id1}/compare/{id2}`
5. `POST /api/landscapes/within-polygon`
6. `POST /api/reload`
7. `GET /api/stats`

Parked items (do not implement now):
1. Edge/adjacency connectivity indicators.
2. GBIF sampling bias correction.
3. Any broad redesign/refactor in `fne-dashboard/` beyond real API hookup.

Disk-space notes:
- Current free on `C:`: about `43.37 GB`.
- Safe immediate cleanup:
  - `fne_tool/data/interim/globio` (`~7.04 GB`)
  - `fne_tool/data/interim/worldcover` (`~0.54 GB`)
  - `fne_tool/data/interim/srtm` (`~1.88 GB`) after new mosaic is confirmed
- Large retained folders:
  - `fne_tool/data/interim/gbif` (`~31.56 GB`) keep until `s05b` completes
  - `Datasets` (`~12.75 GB`) archive/move later

Success criteria for next session:
1. Elevation coverage moves from `37.13%` toward near-national coverage after SRTM expansion.
2. Missing indicator families are materialized in indicators CSV.
3. `fne_tool/outputs/landscape_scores.csv` is generated and sanity-checked.
4. Pilot validation outputs are generated.
5. Frontend can run with `USE_MOCK=false` against live backend.

Working directory:
`<PROJECT_ROOT_ON_YOUR_MACHINE>`

---

