
import { StudySpot } from '@/types';
import { WifiIcon, NoiseIcon, AcIcon, OutletIcon, SeatIcon } from './StatusIcons';

interface SpotDetailsCardProps {
  spot: StudySpot;
}

export const SpotDetailsCard = ({ spot }: SpotDetailsCardProps) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'working': return 'Working';
      case 'not working': return 'Not Working';
      case 'available': return 'Available';
      case 'limited': return 'Limited';
      case 'full': return 'Full';
      case 'quiet': return 'Quiet';
      case 'moderate': return 'Moderate';
      case 'loud': return 'Loud';
      default: return status;
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm p-5">
      <h3 className="text-lg font-medium mb-4">Status Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <WifiIcon speed={spot.wifiSpeed} className="h-6 w-6" />
          <div>
            <div className="text-sm text-muted-foreground">Wi-Fi Speed</div>
            <div className="font-medium">{spot.wifiSpeed} Mbps</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <NoiseIcon level={spot.noiseLevel} className="h-6 w-6" />
          <div>
            <div className="text-sm text-muted-foreground">Noise Level</div>
            <div className="font-medium">{getStatusLabel(spot.noiseLevel)}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <SeatIcon status={spot.seatStatus} className="h-6 w-6" />
          <div>
            <div className="text-sm text-muted-foreground">Seats</div>
            <div className="font-medium">{getStatusLabel(spot.seatStatus)}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <OutletIcon count={spot.powerOutlets} className="h-6 w-6" />
          <div>
            <div className="text-sm text-muted-foreground">Power Outlets</div>
            <div className="font-medium">{spot.powerOutlets} Available</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <AcIcon status={spot.acStatus} className="h-6 w-6" />
          <div>
            <div className="text-sm text-muted-foreground">Air Conditioning</div>
            <div className="font-medium">{getStatusLabel(spot.acStatus)}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 flex items-center justify-center">🕒</div>
          <div>
            <div className="text-sm text-muted-foreground">Open Hours</div>
            <div className="font-medium">{spot.openHours}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
