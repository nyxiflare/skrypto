
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  rating,
  onRatingChange,
  size = 24,
  readonly = false
}) => {
  const handleStarClick = (clickedRating: number) => {
    if (!readonly) {
      onRatingChange(clickedRating);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            size={size}
            className={`${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-white/30'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRatingInput;
