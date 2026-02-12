const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

import listData from '../../handoff/sample_data/landscapes_list.json';
import detailData from '../../handoff/sample_data/landscape_detail.json';
import geoData from '../../handoff/sample_data/landscapes_geojson.json';
import compareData from '../../handoff/sample_data/comparison.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function buildQuery(params = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );
  return new URLSearchParams(clean).toString();
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
  const landscapes = [first, ...rest].flatMap(r => r.landscapes || []);
  return { ...first, landscapes, page: 1, per_page: landscapes.length };
}

export async function getLandscapes(params) {
  if (USE_MOCK) {
    await delay(300);
    // Basic filtering logic for mock
    let filtered = listData.landscapes;
    if (params?.state) {
      filtered = filtered.filter(l => l.state === params.state);
    }
    // Return structure matching API
    return { ...listData, landscapes: filtered };
  }
  return getAllLandscapePages(params);
}

export async function getLandscapeDetail(id) {
  if (USE_MOCK) {
    await delay(300);
    // In a real mock we might look up by ID, but we only have one detail sample
    return detailData;
  }
  return fetchJson(`/landscapes/${id}`);
}

export async function getLandscapesGeoJSON(params) {
  if (USE_MOCK) {
    await delay(500); // GeoJSON can be large
    return geoData;
  }
  return fetchJson('/landscapes/geojson', params);
}

export async function compareLandscapes(id1, id2) {
  if (USE_MOCK) {
    await delay(300);
    return compareData;
  }
  return fetchJson(`/landscapes/${id1}/compare/${id2}`);
}
