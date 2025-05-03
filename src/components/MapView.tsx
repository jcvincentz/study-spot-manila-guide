
import React, { useEffect, useRef } from 'react';
import { StudySpot } from '@/types';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  spots: StudySpot[];
  selectedSpot?: string;
}

// This is a placeholder component for the map view
// In a real app, you would use a library like Mapbox or Google Maps
export const MapView = ({ spots, selectedSpot }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Here we would initialize the map with the Manila center coordinates
    console.log("Map would initialize with Manila center: 14.5995, 120.9842");
    
    // And then add markers for each spot
    spots.forEach(spot => {
      console.log(`Adding marker for ${spot.name} at ${spot.lat}, ${spot.lng}`);
    });
    
  }, [spots]);

  return (
    <div className="relative w-full h-52 bg-gray-200 rounded-xl overflow-hidden">
      <div ref={mapRef} className="w-full h-full bg-gray-100">
        {/* Placeholder map with markers */}
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="text-sm text-muted-foreground">Interactive Map Placeholder</div>
          {/* Manila pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          
          {spots.map(spot => (
            <div 
              key={spot.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`
              }}
              onClick={() => navigate(`/spot/${spot.id}`)}
            >
              <MapPin 
                className={`h-6 w-6 ${selectedSpot === spot.id ? 'text-destructive' : 'text-secondary'}`} 
              />
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white text-xs px-1 py-0.5 rounded shadow">
                {spot.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
