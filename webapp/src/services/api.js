const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? 'false') === 'true';
const USE_STATIC_FILES = (import.meta.env.VITE_USE_STATIC_FILES ?? 'true') === 'true';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

import listData from '../../handoff/sample_data/landscapes_list.json';
import detailData from '../../handoff/sample_data/landscape_detail.json';
import geoData from '../../handoff/sample_data/landscapes_geojson.json';
import compareData from '../../handoff/sample_data/comparison.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DIMENSIONS = [
  { key: 'wild_biodiversity', name: 'Wild Biodiversity' },
  { key: 'ecological_connectivity', name: 'Ecological Connectivity' },
  { key: 'ecosystem_services', name: 'Ecosystem Services' },
  { key: 'climate_resilience', name: 'Climate Resilience' },
  { key: 'community_nature_reciprocity', name: 'Community-Nature Reciprocity' },
  { key: 'abiotic_integrity', name: 'Abiotic Integrity' },
  { key: 'anthropogenic_pressure', name: 'Anthropogenic Pressure' },
];

let staticScoresPromise = null;
let staticIndexPromise = null;
let staticGeoPromise = null;
let staticLandscapesPromise = null;

function buildQuery(params = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );
  return new URLSearchParams(clean).toString();
}

function toNum(value) {
  if (value === undefined || value === null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function parseCsv(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const cols = line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i] ?? '';
    });
    return obj;
  });
}

function buildDimensions(row = {}) {
  return DIMENSIONS.map((d) => {
    const score = toNum(row[d.key]) ?? 0;
    const conf = row[`${d.key}_confidence`] || row.confidence || 'MEDIUM';
    return {
      key: d.key,
      name: d.name,
      score: Number(score.toFixed(2)),
      confidence: conf,
      confidence_reason: `Static publish mode using final score table (${conf} confidence).`,
      justification: `${d.name} scored ${Number(score.toFixed(2))}/10 from the final scoring pipeline.`,
      drivers: [],
    };
  });
}

async function loadStaticScores() {
  if (staticScoresPromise) return staticScoresPromise;
  staticScoresPromise = (async () => {
    const base = import.meta.env.BASE_URL || '/';
    const scoreUrl = `${base}data/landscape_scores.csv`;
    const scoreText = await fetch(scoreUrl).then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${scoreUrl}`);
      return r.text();
    });
    const rows = parseCsv(scoreText);
    return new Map(rows.map((r) => [r.landscape_id, r]));
  })();
  return staticScoresPromise;
}

async function loadStaticIndex() {
  if (staticIndexPromise) return staticIndexPromise;
  staticIndexPromise = (async () => {
    const base = import.meta.env.BASE_URL || '/';
    const indexUrl = `${base}data/landscape_index_min.json`;
    return fetch(indexUrl).then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${indexUrl}`);
      return r.json();
    });
  })();
  return staticIndexPromise;
}

async function loadStaticLandscapes() {
  if (staticLandscapesPromise) return staticLandscapesPromise;
  staticLandscapesPromise = (async () => {
    const [scoreById, indexRows] = await Promise.all([loadStaticScores(), loadStaticIndex()]);
    return indexRows.map((idx) => {
      const id = idx.landscape_id;
      const row = scoreById.get(id) || {};
      const fneScore = toNum(row.fne_score) ?? 0;
      return {
        id,
        name: idx.name || id,
        state: idx.state || 'Unknown',
        ecoregion: idx.ecoregion || 'Unknown',
        area_sqkm: Number((toNum(idx.area_sqkm) ?? 0).toFixed(2)),
        centroid_lat: toNum(idx.centroid_lat),
        centroid_lon: toNum(idx.centroid_lon),
        source: idx.source || '',
        fne_score: Number(fneScore.toFixed(2)),
        score_label: row.score_label || 'Unknown',
        confidence: row.confidence || 'MEDIUM',
        dimension_scores: {
          wild_biodiversity: toNum(row.wild_biodiversity) ?? 0,
          ecological_connectivity: toNum(row.ecological_connectivity) ?? 0,
          ecosystem_services: toNum(row.ecosystem_services) ?? 0,
          climate_resilience: toNum(row.climate_resilience) ?? 0,
          community_nature_reciprocity: toNum(row.community_nature_reciprocity) ?? 0,
          abiotic_integrity: toNum(row.abiotic_integrity) ?? 0,
          anthropogenic_pressure: toNum(row.anthropogenic_pressure) ?? 0,
        },
        _row: row,
      };
    });
  })();
  return staticLandscapesPromise;
}

async function loadStaticGeoJSON() {
  if (staticGeoPromise) return staticGeoPromise;
  staticGeoPromise = (async () => {
    const base = import.meta.env.BASE_URL || '/';
    const boundsUrl = `${base}data/landscape_boundaries_v3.geojson`;
    const boundaries = await fetch(boundsUrl).then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${boundsUrl}`);
      return r.json();
    });
    const scoreById = await loadStaticScores();
    const features = (boundaries.features || []).map((f) => {
      const props = f.properties || {};
      const id = props.landscape_id || props.id;
      const row = scoreById.get(id) || {};
      return {
        ...f,
        properties: {
          ...props,
          id,
          fne_score: Number((toNum(row.fne_score) ?? 0).toFixed(2)),
          score_label: row.score_label || 'Unknown',
        },
      };
    });
    return { ...boundaries, features };
  })();
  return staticGeoPromise;
}

async function fetchJson(path, params = {}) {
  const q = buildQuery(params);
  const url = `${BASE_URL}${path}${q ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${body || res.statusText}`);
  }
  return res.json();
}

async function getAllLandscapePages(params = {}) {
  const perPage = 500;
  const first = await fetchJson('/landscapes', { ...params, page: 1, per_page: perPage });
  const total = first.total || 0;
  const pages = Math.max(1, Math.ceil(total / perPage));
  if (pages === 1) return first;

  const requests = [];
  for (let page = 2; page <= pages; page += 1) {
    requests.push(fetchJson('/landscapes', { ...params, page, per_page: perPage }));
  }
  const rest = await Promise.all(requests);
  const landscapes = [first, ...rest].flatMap((r) => r.landscapes || []);
  return { ...first, landscapes, page: 1, per_page: landscapes.length };
}

export async function getLandscapes(params) {
  if (USE_MOCK) {
    await delay(250);
    let filtered = listData.landscapes;
    if (params?.state) filtered = filtered.filter((l) => l.state === params.state);
    return { ...listData, landscapes: filtered };
  }

  if (USE_STATIC_FILES) {
    let landscapes = await loadStaticLandscapes();
    if (params?.state) landscapes = landscapes.filter((l) => l.state === params.state);
    return { landscapes, total: landscapes.length, page: 1, per_page: landscapes.length };
  }

  return getAllLandscapePages(params);
}

export async function getLandscapeDetail(id) {
  if (USE_MOCK) {
    await delay(250);
    return detailData;
  }

  if (USE_STATIC_FILES) {
    const landscapes = await loadStaticLandscapes();
    const ls = landscapes.find((l) => l.id === id);
    if (!ls) throw new Error(`Landscape ${id} not found`);

    const row = ls._row || {};
    return {
      id: ls.id,
      name: ls.name,
      state: ls.state,
      ecoregion: ls.ecoregion,
      area_sqkm: ls.area_sqkm,
      fne_score: ls.fne_score,
      score_label: ls.score_label,
      confidence: row.confidence || 'MEDIUM',
      dimension_scores: ls.dimension_scores,
      dimensions: buildDimensions(row),
      indicator_provenance: [],
      report:
        `## Summary\n${ls.name} has an overall FNE score of ${ls.fne_score} (${ls.score_label}).\n\n` +
        `## Data Mode\nThis page is rendered from published final score tables on GitHub Pages.`,
    };
  }

  return fetchJson(`/landscapes/${id}`);
}

export async function getLandscapesGeoJSON(params) {
  if (USE_MOCK) {
    await delay(350);
    return geoData;
  }

  if (USE_STATIC_FILES) {
    return loadStaticGeoJSON();
  }

  return fetchJson('/landscapes/geojson', params);
}

export async function compareLandscapes(id1, id2) {
  if (USE_MOCK) {
    await delay(250);
    return compareData;
  }

  if (USE_STATIC_FILES) {
    const landscapes = await loadStaticLandscapes();
    const ls1 = landscapes.find((l) => l.id === id1);
    const ls2 = landscapes.find((l) => l.id === id2);
    if (!ls1 || !ls2) throw new Error('Comparison data not found');

    const dimension_comparison = DIMENSIONS.map((d) => {
      const ls1Score = toNum(ls1.dimension_scores[d.key]) ?? 0;
      const ls2Score = toNum(ls2.dimension_scores[d.key]) ?? 0;
      const difference = Number((ls1Score - ls2Score).toFixed(2));
      return {
        key: d.key,
        dimension: d.name,
        ls1_score: Number(ls1Score.toFixed(2)),
        ls2_score: Number(ls2Score.toFixed(2)),
        difference,
      };
    });

    const leader =
      ls1.fne_score === ls2.fne_score ? 'Both landscapes are tied' : ls1.fne_score > ls2.fne_score ? ls1.name : ls2.name;

    return {
      landscape_1: ls1,
      landscape_2: ls2,
      comparison: {
        dimension_comparison,
        summary: `${leader} leads on overall score in the published final scoring table.`,
      },
    };
  }

  return fetchJson(`/landscapes/${id1}/compare/${id2}`);
}
