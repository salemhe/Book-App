import React, { useState } from 'react';

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingChange(ratingValue)}
            />
            <span role="img" aria-label={`${ratingValue} star`}>
              ⭐
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
