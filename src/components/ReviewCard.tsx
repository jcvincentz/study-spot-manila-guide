
import { Review } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Card className="spot-card mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium">{review.user}</div>
            <div className="text-sm text-muted-foreground">
              {review.date}
            </div>
          </div>
          <div className="text-lg">
            {renderStars(review.rating)}
          </div>
        </div>
        <p className="mt-2 text-sm">{review.text}</p>
      </CardContent>
    </Card>
  );
};
