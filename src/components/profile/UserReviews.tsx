
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface UserReviewsProps {
  reviews: Review[];
}

const UserReviews = ({ reviews }: UserReviewsProps) => {
  // Example reviews if none provided
  const defaultReviews: Review[] = [
    {
      id: 1,
      username: "CryptoBuyer42",
      rating: 5,
      comment: "Exceptional work quality and delivered ahead of schedule. Will definitely hire again for future projects.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      username: "Web3Enthusiast",
      rating: 5,
      comment: "Communication was excellent throughout the project. Very professional and knowledgeable.",
      date: "1 month ago"
    },
    {
      id: 3,
      username: "AnonymousDev",
      rating: 4,
      comment: "Good work, just needed a few minor revisions but overall satisfied with the results.",
      date: "2 months ago"
    }
  ];
  
  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;
  
  // Helper to render stars based on rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
      />
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Client Reviews</h2>
      
      <div className="space-y-4">
        {displayReviews.map(review => (
          <Card key={review.id} className="glass border-white/10">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="bg-skrypto-purple/30">
                      {review.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-white">{review.username}</span>
                </div>
                <span className="text-sm text-white/50">{review.date}</span>
              </div>
              
              <div className="flex mb-2">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-white/70 text-sm">
                {review.comment}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {displayReviews.length === 0 && (
        <div className="text-center py-8 text-white/50">
          No reviews yet
        </div>
      )}
    </div>
  );
};

export default UserReviews;
