import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getScoreColor } from '../../utils/scoring';

function FitBounds({ features }) {
  const map = useMap();
  useEffect(() => {
    if (!features || features.length === 0) return;
    const bounds = features.flatMap(f => {
      const coords = f.geometry?.coordinates?.[0] || [];
      return coords.map(c => [c[1], c[0]]);
    });
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
    }
  }, [map, features]);
  return null;
}

const ComparisonMap = ({ geoJSON, id1, id2 }) => {
  const filtered = useMemo(() => {
    if (!geoJSON?.features) return null;
    const f1 = geoJSON.features.find(f => f.properties.id === id1);
    const f2 = geoJSON.features.find(f => f.properties.id === id2);
    return [f1, f2].filter(Boolean);
  }, [geoJSON, id1, id2]);

  const filteredGeoJSON = useMemo(() => {
    if (!filtered?.length) return null;
    return { type: 'FeatureCollection', features: filtered };
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
        center={[13.5, 77.2]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <FitBounds features={filtered} />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="© CARTO" />
        <GeoJSON data={filteredGeoJSON} style={style} />
      </MapContainer>
    </div>
  );
};

export default ComparisonMap;
