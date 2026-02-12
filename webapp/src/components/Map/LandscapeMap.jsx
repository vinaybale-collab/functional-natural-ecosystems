import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getScoreColor } from '../../utils/scoring';
import { Plus, Minus } from 'lucide-react';

const { BaseLayer } = LayersControl;

function CustomZoomControl() {
  const map = useMap();

  return (
    <div className="absolute bottom-8 right-8 z-[400] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="p-3 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 transition-all shadow-float"
        aria-label="Zoom In"
      >
        <Plus className="w-5 h-5" />
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="p-3 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 transition-all shadow-float"
        aria-label="Zoom Out"
      >
        <Minus className="w-5 h-5" />
      </button>
    </div>
  );
}

function MapController({ selectedId, landscapesGeoJSON }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedId && landscapesGeoJSON) {
      const feature = landscapesGeoJSON.features.find(f => f.properties.id === selectedId);
      if (feature) {
        const coords = feature.geometry.coordinates[0];
        const lat = coords.reduce((sum, p) => sum + p[1], 0) / coords.length;
        const lng = coords.reduce((sum, p) => sum + p[0], 0) / coords.length;
        
        map.flyTo([lat, lng], 10, {
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    }
  }, [selectedId, landscapesGeoJSON, map]);

  return null;
}

const LandscapeMap = ({ landscapesGeoJSON, selectedId, onSelect }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    if (landscapesGeoJSON) {
      setGeoJsonData(landscapesGeoJSON);
    }
  }, [landscapesGeoJSON]);

  const style = (feature) => {
    const isSelected = selectedId === feature.properties.id;
    const baseColor = getScoreColor(feature.properties.fne_score);
    
    return {
      fillColor: baseColor,
      weight: isSelected ? 3 : 2, 
      opacity: 1,
      color: isSelected ? '#000' : baseColor, 
      dashArray: '',
      fillOpacity: isSelected ? 0.3 : 0.1, 
      className: 'transition-all duration-300 ease-in-out cursor-pointer'
    };
  };

  const highlightFeature = (e) => {
    const layer = e.target;
    if (selectedId !== layer.feature.properties.id) {
      layer.setStyle({
        weight: 3,
        fillOpacity: 0.2,
        color: '#666'
      });
      layer.bringToFront();
    }
  };

  const resetHighlight = (e) => {
    const layer = e.target;
    if (selectedId !== layer.feature.properties.id) {
       layer.setStyle({
        weight: 2,
        fillOpacity: 0.1,
        color: getScoreColor(layer.feature.properties.fne_score)
      });
    }
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: () => {
        if (onSelect) onSelect(feature.properties.id);
      }
    });

    const { name, state, fne_score } = feature.properties;
    layer.bindTooltip(`
      <div class="font-sans text-sm font-medium text-gray-900 px-4 py-3 bg-white rounded-lg border border-gray-100 shadow-xl">
        <span class="block text-lg font-bold mb-1">${name}</span>
        <div class="flex items-center justify-between gap-4">
           <span class="text-gray-500 font-normal text-xs uppercase tracking-wider">${state}</span>
           <span class="font-mono text-lg font-bold" style="color:${getScoreColor(fne_score)}">${fne_score}</span>
        </div>
      </div>
    `, { 
      permanent: false, 
      direction: 'top',
      opacity: 1,
      className: 'custom-light-tooltip'
    });
  };

  // Center India Calculation:
  // India's approx center: [22.0, 79.0]
  // With a 500px sidebar on the left, the visible map area is pushed to the right.
  // We need to shift the initial center *Left* (West) so that India appears closer to the visual center of the *remaining* space.
  // Actually, wait. If I want India to be in the center of the *right* empty space:
  // The map renders full width. Center [22, 79] puts India in the middle of screen.
  // Sidebar covers the left 500px.
  // So India [22, 79] is covered partially or looks off-center left.
  // To move India to the *right*, we need to move the map center to the *left*.
  // Let's try centering at [22.0, 72.0]. This puts 72 at the screen center, pushing 79 (India) 7 degrees East (Right).
  // At Zoom 5, 7 degrees is a significant shift right.
  const defaultCenter = [22.0, 72.0]; 

  return (
    <div className="h-full w-full relative bg-gray-50">
      <MapContainer 
        center={defaultCenter} 
        zoom={5}
        style={{ height: '100%', width: '100%', background: '#f9fafb' }}
        zoomControl={false}
        scrollWheelZoom={true}
        className="outline-none"
      >
        <MapController selectedId={selectedId} landscapesGeoJSON={landscapesGeoJSON} />
        <CustomZoomControl />
        
        <LayersControl position="topright">
          <BaseLayer checked name="Carto Light">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; CARTO'
            />
          </BaseLayer>
          <BaseLayer name="Carto Dark">
             <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; CARTO'
            />
          </BaseLayer>
          <BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; Esri'
            />
          </BaseLayer>
        </LayersControl>

        {geoJsonData && (
          <GeoJSON 
            key="geo-data-v4"
            data={geoJsonData} 
            style={style} 
            onEachFeature={onEachFeature} 
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LandscapeMap;