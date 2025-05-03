
import { Wifi, VolumeOff, Volume1, Volume2, AirVent, Plug, Armchair } from "lucide-react";
import { cn } from "@/lib/utils";

interface WifiIconProps {
  speed: number;
  className?: string;
}

export const WifiIcon = ({ speed, className }: WifiIconProps) => {
  let color = "text-red-500";
  
  if (speed > 20 && speed <= 50) {
    color = "text-yellow-500";
  } else if (speed > 50) {
    color = "text-green-500";
  }
  
  return <Wifi className={cn("h-5 w-5", color, className)} />;
};

interface NoiseIconProps {
  level: 'quiet' | 'moderate' | 'loud';
  className?: string;
}

export const NoiseIcon = ({ level, className }: NoiseIconProps) => {
  switch (level) {
    case 'quiet':
      return <VolumeOff className={cn("h-5 w-5 text-green-500", className)} />;
    case 'moderate':
      return <Volume1 className={cn("h-5 w-5 text-yellow-500", className)} />;
    case 'loud':
      return <Volume2 className={cn("h-5 w-5 text-red-500", className)} />;
  }
};

interface AcIconProps {
  status: 'working' | 'not working';
  className?: string;
}

export const AcIcon = ({ status, className }: AcIconProps) => {
  return (
    <AirVent 
      className={cn(
        "h-5 w-5", 
        status === 'working' ? "text-green-500" : "text-red-500",
        className
      )} 
    />
  );
};

interface OutletIconProps {
  count: number;
  className?: string;
}

export const OutletIcon = ({ count, className }: OutletIconProps) => {
  let color = "text-red-500";
  
  if (count >= 5 && count < 15) {
    color = "text-yellow-500";
  } else if (count >= 15) {
    color = "text-green-500";
  }
  
  return <Plug className={cn("h-5 w-5", color, className)} />;
};

interface SeatIconProps {
  status: 'available' | 'limited' | 'full';
  className?: string;
}

export const SeatIcon = ({ status, className }: SeatIconProps) => {
  let color = "text-red-500";
  
  if (status === 'limited') {
    color = "text-yellow-500";
  } else if (status === 'available') {
    color = "text-green-500";
  }
  
  return <Armchair className={cn("h-5 w-5", color, className)} />;
};
