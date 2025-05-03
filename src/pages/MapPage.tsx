
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { studySpots } from '@/data/studySpots';
import { MapView } from '@/components/MapView';
import { FilterBar } from '@/components/FilterBar';
import { StudySpot } from '@/types';
import { Button } from '@/components/ui/button';
import { StudySpotCard } from '@/components/StudySpotCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MapPage = () => {
  const [filteredSpots, setFilteredSpots] = useState<StudySpot[]>(studySpots);
  const [showList, setShowList] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<string | undefined>(undefined);
  
  // Filter UST area spots by default
  useEffect(() => {
    // Focus on UST area spots by default
    const ustAreaSpots = studySpots.filter(spot => 
      spot.id === '7' || 
      spot.id === '8' || 
      spot.id === '9' || 
      spot.id === '10' || 
      spot.id === '11'
    );
    
    setFilteredSpots(ustAreaSpots);
  }, []);
  
  const handleFilterChange = (filters: any) => {
    let results = [...studySpots];
    
    if (filters.type !== 'all') {
      results = results.filter(spot => spot.type === filters.type);
    }
    
    // Apply additional filters
    if (filters.filters.includes('wifi')) {
      results = results.filter(spot => spot.wifiSpeed > 50);
    }
    
    if (filters.filters.includes('quiet')) {
      results = results.filter(spot => spot.noiseLevel === 'quiet');
    }
    
    if (filters.filters.includes('outlets')) {
      results = results.filter(spot => spot.powerOutlets > 10);
    }
    
    if (filters.filters.includes('ac')) {
      results = results.filter(spot => spot.acStatus === 'working');
    }
    
    if (filters.filters.includes('seats')) {
      results = results.filter(spot => spot.seatStatus === 'available');
    }
    
    setFilteredSpots(results);
  };
  
  return (
    <Layout includeContainer={false}>
      <div className="h-screen flex flex-col">
        <Header title="Study Spots Map" />
        
        <div className="px-4 py-2">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
        
        <div className="flex-grow relative overflow-hidden">
          {/* Full screen map */}
          <div className="absolute inset-0">
            <div className="h-full">
              <MapView spots={filteredSpots} selectedSpot={selectedSpot} />
            </div>
          </div>
          
          {/* Bottom sheet */}
          <div className={`absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl shadow-lg transition-transform duration-300 ease-in-out transform ${showList ? 'translate-y-0' : 'translate-y-[calc(100%-46px)]'}`}>
            <div 
              className="py-3 px-5 flex justify-between items-center cursor-pointer"
              onClick={() => setShowList(!showList)}
            >
              <h3 className="font-medium">
                {filteredSpots.length} Study Spots Found
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                {showList ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto p-4">
              <div className="space-y-3 mb-20">
                {filteredSpots.map(spot => (
                  <div 
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot.id)}
                  >
                    <StudySpotCard spot={spot} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <BottomNav />
      </div>
    </Layout>
  );
};

export default MapPage;
