import React, { useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip as LeafletTooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getScoreColor } from '../../utils/scoring';

const ComparisonMap = ({ geoJSON, id1, id2 }) => {
  const filtered = useMemo(() => {
    if (!geoJSON?.features) return null;
    const f1 = geoJSON.features.find((f) => f.properties.id === id1);
    const f2 = geoJSON.features.find((f) => f.properties.id === id2);
    return [f1, f2].filter(Boolean);
  }, [geoJSON, id1, id2]);

  const filteredGeoJSON = useMemo(() => {
    if (!filtered?.length) return null;
    return { type: 'FeatureCollection', features: filtered };
  }, [filtered]);

  const points = useMemo(() => {
    if (!filtered?.length) return [];
    return filtered
      .map((f) => {
        const p = f.properties || {};
        if (p.centroid_lat && p.centroid_lon) {
          return {
            id: p.id,
            name: p.name || p.id,
            lat: Number(p.centroid_lat),
            lon: Number(p.centroid_lon),
            score: Number(p.fne_score || 0),
          };
        }
        const coords = f.geometry?.coordinates?.[0] || [];
        if (!coords.length) return null;
        const lat = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
        const lon = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
        return { id: p.id, name: p.name || p.id, lat, lon, score: Number(p.fne_score || 0) };
      })
      .filter(Boolean);
  }, [filtered]);

  const style = (feature) => {
    const c = getScoreColor(feature.properties.fne_score);
    return { fillColor: c, weight: 2, opacity: 1, color: c, fillOpacity: 0.35 };
  };

  if (!filteredGeoJSON) {
    return (
      <div className="h-full min-h-[280px] rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
        Map data unavailable
      </div>
    );
  }

  return (
    <div className="h-full min-h-[400px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
      <MapContainer
        center={[22.8, 79.0]}
        zoom={4.8}
        minZoom={4}
        maxZoom={9}
        style={{ height: '100%', width: '100%' }}
        zoomControl
        scrollWheelZoom
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="&copy; CARTO" />
        <GeoJSON data={filteredGeoJSON} style={style} />
        {points.map((p) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lon]}
            radius={7}
            pathOptions={{ color: '#111827', fillColor: getScoreColor(p.score), fillOpacity: 0.95, weight: 1.5 }}
          >
            <LeafletTooltip direction="top" offset={[0, -6]} opacity={1}>
              <div className="text-xs font-semibold">{p.name}</div>
            </LeafletTooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ComparisonMap;
