
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings, Heart, Clock, Star, 
  Wifi, VolumeOff, Plug, AirVent, Armchair, 
  Sun, Moon
} from 'lucide-react';
import { StudySpotCard } from '@/components/StudySpotCard';
import { studySpots } from '@/data/studySpots';

const Profile = () => {
  const favorites = studySpots.slice(0, 3);
  const history = studySpots.slice(3, 5);
  
  return (
    <Layout>
      <Header title="Profile" />
      
      <main className="px-4 py-6">
        {/* Profile Header */}
        <div className="flex items-center">
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Marcus Santos</h2>
            <p className="text-sm text-muted-foreground">UST Student</p>
            <Button variant="link" size="sm" className="px-0 text-primary">
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Preferences Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Your Preferences</h3>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="bg-card rounded-2xl p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wifi className="h-5 w-5 mr-3 text-primary" />
                  <Label htmlFor="wifi-pref">Fast Wi-Fi</Label>
                </div>
                <Switch id="wifi-pref" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <VolumeOff className="h-5 w-5 mr-3 text-primary" />
                  <Label htmlFor="quiet-pref">Quiet Environment</Label>
                </div>
                <Switch id="quiet-pref" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Plug className="h-5 w-5 mr-3 text-primary" />
                  <Label htmlFor="outlets-pref">Power Outlets</Label>
                </div>
                <Switch id="outlets-pref" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AirVent className="h-5 w-5 mr-3 text-primary" />
                  <Label htmlFor="ac-pref">Air Conditioning</Label>
                </div>
                <Switch id="ac-pref" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Armchair className="h-5 w-5 mr-3 text-primary" />
                  <Label htmlFor="seat-pref">Available Seating</Label>
                </div>
                <Switch id="seat-pref" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 mr-3 text-primary" />
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <Switch id="dark-mode" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Favorites Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Favorites</h3>
            <Heart className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {favorites.map(spot => (
              <StudySpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        </div>
        
        {/* Recent History */}
        <div className="mt-8 mb-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recently Visited</h3>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {history.map(spot => (
              <StudySpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        </div>
      </main>
      
      <BottomNav />
    </Layout>
  );
};

export default Profile;
