
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import StarRatingInput from './StarRatingInput';

interface LeaveReviewFormProps {
  freelancerId: string;
  onSubmitReview: (rating: number, comment?: string) => void;
  isSubmitting?: boolean;
}

const LeaveReviewForm: React.FC<LeaveReviewFormProps> = ({
  freelancerId,
  onSubmitReview,
  isSubmitting = false
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmitReview(rating, comment.trim() || undefined);
      setRating(0);
      setComment('');
    }
  };

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star size={20} />
          Leave a Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">
              Rating *
            </label>
            <StarRatingInput
              rating={rating}
              onRatingChange={setRating}
              size={32}
            />
            {rating === 0 && (
              <p className="text-red-400 text-sm mt-1">Please select a rating</p>
            )}
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">
              Comment (optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience working with this freelancer..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              rows={4}
              maxLength={500}
            />
            <div className="text-right text-white/50 text-sm mt-1">
              {comment.length}/500
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            className="w-full bg-skrypto-purple hover:bg-skrypto-purple/90 text-white glow-purple"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeaveReviewForm;
