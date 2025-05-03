
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

export const MapView = ({ spots, selectedSpot }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();
  
  // Manila center coordinates as LngLatLike type
  const manilaCenter: mapboxgl.LngLatLike = [120.9842, 14.5995];
  
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    // Initialize map with the default token
    mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/light-v11',
      center: manilaCenter,
      zoom: 12
    });
    
    // Add navigation control
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    );
    
    // Wait for map to load before adding markers
    map.current.on('load', () => {
      addMarkersToMap();
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
      
      console.log(`Added marker for ${spot.name} at ${spot.lat}, ${spot.lng}`);
    });
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full relative">
        <div ref={mapContainer} className="w-full h-full rounded-xl overflow-hidden">
          {/* Map renders here */}
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
      `}</style>
    </div>
  );
};
