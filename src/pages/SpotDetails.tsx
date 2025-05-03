
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { SpotDetailsCard } from '@/components/SpotDetailsCard';
import { ReviewCard } from '@/components/ReviewCard';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { studySpots, reviews } from '@/data/studySpots';

const SpotDetails = () => {
  const { id } = useParams<{ id: string }>();
  const spot = studySpots.find(s => s.id === id);
  const spotReviews = reviews[id || ''] || [];
  
  if (!spot) {
    return (
      <Layout>
        <Header title="Not Found" showBackButton />
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-muted-foreground">Study spot not found</p>
          <Button onClick={() => window.history.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fade-in">
        <Header title={spot.name} showBackButton />
        
        <main className="pb-20">
          {/* Header Image */}
          <div className="relative h-48 w-full">
            <img 
              src={spot.image} 
              alt={spot.name} 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Spot Info */}
          <div className="px-4 py-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold">{spot.name}</h1>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{spot.address}</span>
                </div>
              </div>
              <div className="bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full">
                {spot.type}
              </div>
            </div>
            
            <div className="flex items-center mt-2">
              <div className="text-yellow-500 text-lg">
                {'★'.repeat(Math.floor(spot.rating))}
                {'☆'.repeat(5 - Math.floor(spot.rating))}
              </div>
              <span className="ml-2 text-sm font-medium">{spot.rating}</span>
            </div>
            
            <div className="mt-6">
              <SpotDetailsCard spot={spot} />
            </div>
            
            {/* Menu Section */}
            {spot.menu && spot.menu.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Menu Highlights</h3>
                <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50 text-left">
                      <tr>
                        <th className="p-3 font-medium text-sm">Item</th>
                        <th className="p-3 font-medium text-sm">Price</th>
                        <th className="p-3 font-medium text-sm">Available</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spot.menu.map((item, idx) => (
                        <tr key={idx} className="border-t border-border/40">
                          <td className="p-3">{item.name}</td>
                          <td className="p-3">₱{item.price}</td>
                          <td className="p-3">
                            {item.available ? (
                              <span className="text-green-500">Yes</span>
                            ) : (
                              <span className="text-red-500">No</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Reviews Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Reviews</h3>
              {spotReviews.length > 0 ? (
                spotReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground bg-card rounded-2xl">
                  No reviews yet
                </div>
              )}
            </div>
            
            {/* Navigation Button */}
            <div className="mt-6">
              <Button className="w-full" size="lg">
                Get Directions
              </Button>
            </div>
          </div>
        </main>
        
        <BottomNav />
      </div>
    </Layout>
  );
};

export default SpotDetails;
