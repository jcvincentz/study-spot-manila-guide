
import React, { useEffect, useRef, useState } from 'react';
import { StudySpot } from '@/types';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  spots: StudySpot[];
  selectedSpot?: string;
}

// Default Mapbox token
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoiamN2eG5jZW50IiwiYSI6ImNtYTd4NGRmYTE3Zmwya285ZjU1cWd5azQifQ.RQ66YeooZdGAHTbxLocVtw';

// UST area coordinates
const UST_AREA = {
  center: [120.9866, 14.6042], // UST Main Building
  radius: 0.8, // km
  bounds: {
    north: 14.6092, // ~500m north of UST
    south: 14.5992, // ~500m south of UST
    east: 120.9916, // ~500m east of UST
    west: 120.9816, // ~500m west of UST
  }
};

// Generated heatmap data around UST
const generateHeatmapData = () => {
  const points = [];
  const baseIntensity = 0.8;
  
  // Generate cluster of points around UST with varying intensity
  for (let i = 0; i < 200; i++) {
    // Random coordinates within bounds, weighted toward center
    const latOffset = (Math.random() - 0.5) * 0.01;
    const lngOffset = (Math.random() - 0.5) * 0.01;
    
    // Distribution weighted to create clusters
    const lat = UST_AREA.center[1] + latOffset;
    const lng = UST_AREA.center[0] + lngOffset;
    
    // Intensity decreases with distance from center
    const distanceFromCenter = Math.sqrt(
      Math.pow(lat - UST_AREA.center[1], 2) + 
      Math.pow(lng - UST_AREA.center[0], 2)
    );
    
    // Create weights - higher near center, lower away from center
    const intensity = baseIntensity * (1 - Math.min(1, distanceFromCenter * 200));
    
    points.push({
      "type": "Feature",
      "properties": {
        "intensity": intensity
      },
      "geometry": {
        "type": "Point",
        "coordinates": [lng, lat]
      }
    });
  }
  
  // Add additional clusters around popular spots
  const popularSpots = [
    { name: "UST Main Building", coords: [120.9866, 14.6042], weight: 1.0 },
    { name: "España Boulevard", coords: [120.9876, 14.6020], weight: 0.9 },
    { name: "P. Noval Street", coords: [120.9890, 14.6050], weight: 0.8 },
    { name: "Dapitan Street", coords: [120.9850, 14.6070], weight: 0.7 },
    { name: "Lacson Avenue", coords: [120.9820, 14.6040], weight: 0.75 }
  ];
  
  popularSpots.forEach(spot => {
    // Add 20 points around each popular spot
    for (let i = 0; i < 20; i++) {
      const latOffset = (Math.random() - 0.5) * 0.003;
      const lngOffset = (Math.random() - 0.5) * 0.003;
      
      points.push({
        "type": "Feature",
        "properties": {
          "intensity": spot.weight * (0.7 + Math.random() * 0.3)
        },
        "geometry": {
          "type": "Point",
          "coordinates": [spot.coords[0] + lngOffset, spot.coords[1] + latOffset]
        }
      });
    }
  });
  
  return {
    "type": "FeatureCollection",
    "features": points
  };
};

export const MapView = ({ spots, selectedSpot }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();
  
  // UST area coordinates as LngLatLike type
  const ustCenter: mapboxgl.LngLatLike = UST_AREA.center;
  
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    // Initialize map with the token
    mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/dark-v11', // Changed to dark theme
      center: ustCenter,
      zoom: 15, // Increased zoom to focus on UST area
      pitch: 30, // Add a slight angle for 3D effect
      bearing: -15 // Slight rotation for better perspective
    });
    
    // Add navigation control
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: true }),
      'top-right'
    );
    
    // Wait for map to load before adding markers and heatmap
    map.current.on('load', () => {
      // Add heatmap layer
      addHeatmapLayer();
      
      // Add markers for study spots
      addMarkersToMap();
      
      // Add a 3D building layer for better visuals
      map.current!.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 14,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            14, 0,
            16, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            14, 0,
            16, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      });
    });
    
  }, [mapContainer]);
  
  // Effect to handle markers when spots or selected spot changes
  useEffect(() => {
    if (!map.current) return;
    
    // Clear existing markers when spots change
    if (map.current.loaded()) {
      addMarkersToMap();
    }
    
    return () => {
      // Cleanup markers on component unmount
      clearMarkers();
    };
  }, [spots, selectedSpot]);
  
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };
  
  const addHeatmapLayer = () => {
    if (!map.current) return;
    
    // Generate heatmap data
    const heatmapData = generateHeatmapData();
    
    // Add a new source for heatmap
    map.current.addSource('study-density', {
      type: 'geojson',
      data: heatmapData as any
    });
    
    // Add a heatmap layer
    map.current.addLayer({
      id: 'study-heatmap',
      type: 'heatmap',
      source: 'study-density',
      maxzoom: 18,
      paint: {
        // Increase intensity based on zoom level
        'heatmap-intensity': [
          'interpolate', ['linear'], ['zoom'],
          12, 0.5,
          16, 1.5
        ],
        // Adjust radius by zoom level
        'heatmap-radius': [
          'interpolate', ['linear'], ['zoom'],
          10, 10,
          16, 25
        ],
        // Color gradient from blue to purple to red
        'heatmap-color': [
          'interpolate', ['linear'], ['heatmap-density'],
          0, 'rgba(0, 0, 255, 0)',
          0.2, 'rgba(65, 105, 225, 0.6)',
          0.4, 'rgba(102, 50, 168, 0.7)',
          0.6, 'rgba(153, 50, 204, 0.8)',
          0.8, 'rgba(199, 0, 57, 0.9)',
          1, 'rgba(255, 0, 0, 1)'
        ],
        // Adjust opacity based on zoom level
        'heatmap-opacity': [
          'interpolate', ['linear'], ['zoom'],
          14, 0.8,
          16, 0.5,
          18, 0.2
        ],
        // Use 'intensity' property to weight points
        'heatmap-weight': [
          'interpolate', ['linear'], ['get', 'intensity'],
          0, 0,
          1, 1
        ]
      }
    }, 'waterway-label'); // Add below labels
  };
  
  const addMarkersToMap = () => {
    if (!map.current) return;
    
    // Clear existing markers first
    clearMarkers();
    
    // Add a marker for each spot
    spots.forEach(spot => {
      const el = document.createElement('div');
      el.className = 'marker-container';
      el.innerHTML = `
        <div class="${selectedSpot === spot.id ? 'marker-selected' : 'marker'}">
          <div class="marker-pin"></div>
          <div class="marker-label">${spot.name}</div>
        </div>
      `;
      
      el.addEventListener('click', () => {
        navigate(`/spot/${spot.id}`);
      });
      
      // Create and add the marker with properly typed coordinates
      const lngLat: mapboxgl.LngLatLike = [spot.lng, spot.lat];
      const marker = new mapboxgl.Marker(el)
        .setLngLat(lngLat)
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full relative">
        <div ref={mapContainer} className="w-full h-full rounded-xl overflow-hidden">
          {/* Map renders here */}
        </div>
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-md text-xs">
          <div className="font-medium mb-1">Study Spot Density</div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
            <span className="mr-2">Low</span>
            <span className="w-3 h-3 rounded-full bg-purple-600"></span>
            <span className="mr-2">Medium</span>
            <span className="w-3 h-3 rounded-full bg-red-600"></span>
            <span>High</span>
          </div>
        </div>
      </div>
      
      <style>{`
        .marker-container {
          cursor: pointer;
        }
        .marker, .marker-selected {
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translate(-50%, -100%);
        }
        .marker-pin {
          width: 20px;
          height: 20px;
          border-radius: 50% 50% 50% 0;
          background: #6366f1;
          position: relative;
          transform: rotate(-45deg);
        }
        .marker-selected .marker-pin {
          background: #ef4444;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
        }
        .marker-label {
          font-size: 12px;
          font-weight: 500;
          margin-top: 8px;
          padding: 4px 8px;
          border-radius: 4px;
          background: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          transform: rotate(0);
          white-space: nowrap;
        }
        .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right {
          display: none !important;
        }
      `}</style>
    </div>
  );
};
