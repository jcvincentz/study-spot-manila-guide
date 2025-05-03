
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { StudySpotCard } from '@/components/StudySpotCard';
import { FilterBar } from '@/components/FilterBar';
import { studySpots } from '@/data/studySpots';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSpots, setFilteredSpots] = useState(studySpots);
  
  const handleFilterChange = (filters: any) => {
    let results = [...studySpots];
    
    // Filter by place type
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
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        spot => spot.name.toLowerCase().includes(query) || 
                spot.address.toLowerCase().includes(query)
      );
    }
    
    setFilteredSpots(results);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    let results = [...studySpots];
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(
        spot => spot.name.toLowerCase().includes(searchTerm) || 
                spot.address.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredSpots(results);
  };
  
  const suggestedCategories = [
    { title: "Quiet cafés near you", query: "quiet cafe" },
    { title: "Best Wi-Fi in Makati", query: "wifi makati" },
    { title: "Late-night study spots in QC", query: "quezon city" },
  ];
  
  return (
    <Layout>
      <Header title="Explore" />
      
      <main className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search by name or location..."
            className="pl-9 bg-muted/50"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <FilterBar onFilterChange={handleFilterChange} />
        
        {!searchQuery && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Suggested for you</h3>
            <div className="space-y-3">
              {suggestedCategories.map((category, idx) => (
                <div 
                  key={idx}
                  className="spot-card p-4 cursor-pointer"
                  onClick={() => setSearchQuery(category.query)}
                >
                  <h4 className="font-medium">{category.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-3">
            {searchQuery ? 'Search Results' : 'Popular Study Spots'}
          </h2>
          <div className="space-y-4">
            {filteredSpots.length > 0 ? (
              filteredSpots.map(spot => (
                <StudySpotCard key={spot.id} spot={spot} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No study spots match your search
              </div>
            )}
          </div>
        </div>
      </main>
      
      <BottomNav />
    </Layout>
  );
};

export default Explore;
