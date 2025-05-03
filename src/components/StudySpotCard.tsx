
import { StudySpot } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WifiIcon, NoiseIcon, AcIcon, OutletIcon, SeatIcon } from './StatusIcons';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudySpotCardProps {
  spot: StudySpot;
}

export const StudySpotCard = ({ spot }: StudySpotCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="spot-card w-full animate-fade-in cursor-pointer"
      onClick={() => navigate(`/spot/${spot.id}`)}
    >
      <div className="h-36 w-full overflow-hidden rounded-t-2xl">
        <img 
          src={spot.image} 
          alt={spot.name} 
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{spot.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{spot.address}</span>
            </div>
          </div>
          <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-2 rounded-full">
            {spot.distance}
          </div>
        </div>
        
        <div className="flex justify-between mt-3 pt-3 border-t">
          <div className="flex space-x-3">
            <WifiIcon speed={spot.wifiSpeed} />
            <NoiseIcon level={spot.noiseLevel} />
            <AcIcon status={spot.acStatus} />
            <OutletIcon count={spot.powerOutlets} />
            <SeatIcon status={spot.seatStatus} />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs font-medium text-primary hover:text-primary/80 hover:bg-primary/10 p-0"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/spot/${spot.id}`);
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
