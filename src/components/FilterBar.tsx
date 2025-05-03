import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wifi, VolumeOff, Plug, AirVent, Armchair } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

export const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [placeType, setPlaceType] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const handlePlaceTypeChange = (value: string) => {
    setPlaceType(value);
    onFilterChange({ type: value, filters: activeFilters });
  };

  const handleFilterToggle = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    
    setActiveFilters(newFilters);
    onFilterChange({ type: placeType, filters: newFilters });
  };

  return (
    <div className="py-3">
      <div className="mb-3">
        <Tabs defaultValue="all" onValueChange={handlePlaceTypeChange} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cafe">Cafés</TabsTrigger>
            <TabsTrigger value="coworking">Co-working</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <FilterButton 
          icon={<Wifi />}
          label="Wi-Fi"
          active={activeFilters.includes('wifi')}
          onClick={() => handleFilterToggle('wifi')}
        />
        <FilterButton 
          icon={<VolumeOff />}
          label="Quiet"
          active={activeFilters.includes('quiet')}
          onClick={() => handleFilterToggle('quiet')}
        />
        <FilterButton 
          icon={<Plug />}
          label="Outlets"
          active={activeFilters.includes('outlets')}
          onClick={() => handleFilterToggle('outlets')}
        />
        <FilterButton 
          icon={<AirVent />}
          label="AC"
          active={activeFilters.includes('ac')}
          onClick={() => handleFilterToggle('ac')}
        />
        <FilterButton 
          icon={<Armchair />}
          label="Seats"
          active={activeFilters.includes('seats')}
          onClick={() => handleFilterToggle('seats')}
        />
      </div>
    </div>
  );
};

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton = ({ icon, label, active, onClick }: FilterButtonProps) => (
  <Button 
    variant={active ? "default" : "outline"}
    size="sm"
    onClick={onClick}
    className={cn(
      "flex items-center gap-1.5 rounded-full px-4 whitespace-nowrap",
      active ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
    )}
  >
    {icon}
    <span>{label}</span>
  </Button>
);
