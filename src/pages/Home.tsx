
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { StudySpotCard } from '@/components/StudySpotCard';
import { MapView } from '@/components/MapView';
import { FilterBar } from '@/components/FilterBar';
import { studySpots } from '@/data/studySpots';
import { StudySpot } from '@/types';

// Helper function to sort spots by distance
const sortSpotsByDistance = (spots: StudySpot[]): StudySpot[] => {
  return [...spots].sort((a, b) => {
    // Extract the numeric values from the distance strings
    const distanceA = parseFloat(a.distance.replace(/[^\d.]/g, ''));
    const distanceB = parseFloat(b.distance.replace(/[^\d.]/g, ''));
    return distanceA - distanceB; // Sort from nearest to farthest
  });
};

const Home = () => {
  const [filteredSpots, setFilteredSpots] = useState<StudySpot[]>(studySpots);
  const [filterOptions, setFilterOptions] = useState({
    type: 'all',
    filters: [] as string[]
  });

  const applyFilters = () => {
    let filtered = [...studySpots];
    
    // Filter by place type
    if (filterOptions.type !== 'all') {
      filtered = filtered.filter(spot => spot.type === filterOptions.type);
    }
    
    // Apply additional filters
    if (filterOptions.filters.includes('wifi')) {
      filtered = filtered.filter(spot => spot.wifiSpeed > 50);
    }
    
    if (filterOptions.filters.includes('quiet')) {
      filtered = filtered.filter(spot => spot.noiseLevel === 'quiet');
    }
    
    if (filterOptions.filters.includes('outlets')) {
      filtered = filtered.filter(spot => spot.powerOutlets > 10);
    }
    
    if (filterOptions.filters.includes('ac')) {
      filtered = filtered.filter(spot => spot.acStatus === 'working');
    }
    
    if (filterOptions.filters.includes('seats')) {
      filtered = filtered.filter(spot => spot.seatStatus === 'available');
    }
    
    // Sort spots from nearest to farthest
    filtered = sortSpotsByDistance(filtered);
    
    setFilteredSpots(filtered);
  };
  
  useEffect(() => {
    applyFilters();
  }, [filterOptions]);

  const handleFilterChange = (filters: any) => {
    setFilterOptions(filters);
  };

  return (
    <Layout>
      <Header title="StudySpot" />
      
      <main className="px-4 py-3">
        <div className="h-60 mb-4 rounded-xl overflow-hidden">
          <MapView spots={filteredSpots} isHomeScreen={true} />
        </div>
        
        <FilterBar onFilterChange={handleFilterChange} />
        
        <div className="my-4">
          <h2 className="text-xl font-semibold mb-3">Nearby Study Spots</h2>
          <div className="space-y-4">
            {filteredSpots.length > 0 ? (
              filteredSpots.map(spot => (
                <StudySpotCard key={spot.id} spot={spot} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No study spots match your filters
              </div>
            )}
          </div>
        </div>
      </main>
      
      <BottomNav />
    </Layout>
  );
};

export default Home;
