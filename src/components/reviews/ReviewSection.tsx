
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Calendar } from 'lucide-react';
import StarRatingInput from './StarRatingInput';

interface Review {
  id?: string;
  rating: number;
  comment?: string;
  created_at: string;
  reviewer_id: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, averageRating }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const distribution = getRatingDistribution();
  const totalReviews = reviews.length;

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star size={20} />
          Reviews & Ratings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {totalReviews === 0 ? (
          <div className="text-center py-8">
            <Star size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-6 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <StarRatingInput rating={Math.round(averageRating)} onRatingChange={() => {}} readonly />
                  <div className="text-white/60 text-sm mt-1">
                    {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                  </div>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = distribution[rating as keyof typeof distribution];
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    
                    return (
                      <div key={rating} className="flex items-center gap-2 mb-1">
                        <span className="text-white/70 text-sm w-8">{rating}</span>
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-white/60 text-sm w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={review.id || index}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-skrypto-purple text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <StarRatingInput rating={review.rating} onRatingChange={() => {}} readonly size={16} />
                        <div className="flex items-center gap-1 text-white/50 text-sm">
                          <Calendar size={14} />
                          {formatDate(review.created_at)}
                        </div>
                      </div>
                      
                      {review.comment && (
                        <p className="text-white/80 leading-relaxed">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
