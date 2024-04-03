import React, { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../contects/AuthProvider';
import {db} from '../firebase/firebase.config';
import { serverTimestamp, doc, updateDoc} from "firebase/firestore";
import 'firebase/firestore';

const StarReview = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reason, setReason] = useState('');
  const [hover, setHover] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);

  const showTextArea = () => {
    if (!showInput) {
      setShowInput(true);
    }
  };

  const hideTextArea = () => {
    setShowInput(false);
    setReason('');
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

//   const handleSubmit = () => {
//     // Check if rating is provided
//     if (rating === 0) {
//       alert('Please provide a rating');
//       return;
//     }

//     // Submit the review
//     onSubmit({ rating, reason });
//     hideTextArea();

//     // Add the review to the list of reviews
//     setReviews([...reviews, { rating, reason }]);

//     // Clear the form after submission
//     setRating(0);
//     setReason('');
//   };

const handleSubmit = () => {
   // Check if rating is provided
   if (rating === 0) {
     alert('Please provide a rating');
     return;
   }
 
   // Submit the review
   onSubmit({ rating, reason });
   hideTextArea();
 
   // Add the review to the list of reviews
   setReviews([...reviews, { rating, reason }]);
 
   // Save to Firebase
   saveToFirebase(user.displayName, user.photoURL, rating, reason); // Assuming 'user.displayName' is the user's name and 'user.photoURL' is the user's image URL
 
   // Clear the form after submission
   setRating(0);
   setReason('');
 };
 
 
 const saveToFirebase = (userName, userImage, userRating, userReview) => {

   db.collection('user_reviews').add({
     userName,
     userImage,
     userRating,
     userReview,
     timestamp: serverTimestamp(),
   })
   .then(() => {
     console.log('Review added to Firebase');
   })
   .catch((error) => {
     console.error('Error adding review to Firebase: ', error);
   });
 };
 
 

  return (
    <div>
      <div>
        <div className="flex">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  className="hidden"
                  onClick={() => setRating(ratingValue)}
                  checked={rating === ratingValue}
                  onChange={() => handleRatingChange(ratingValue)}
                />
                <FaStar
                  className="cursor-pointer"
                  color={ratingValue <= (hover || rating) ? '#065fd4' : '#e4e5e9'}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
      </div>
      <h3 onClick={showTextArea} className="reply comment font-semibold w-24 !text-[#065fd4] ">
        Write a review
      </h3>
      {showInput && (
        <div className="flex-col flex">
          <textarea
            className="w-[100%] sm:w-[50%]"
            rows="4"
            placeholder="Enter your review reason..."
            value={reason}
            onChange={handleReasonChange}
          ></textarea>
          <button
            className="post comment w-36 disabled:cursor-not-allowed disabled:bg-[#e0e0e0] mt-3 disabled:text-white"
            disabled={!reason}
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Display submitted reviews */}
      <div>
        {reviews <= 0  ? 'No Reviews Yet.' : 'Ratings and Reviews:'}
        

        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={index} className="borde p-4 space-x-4 flex">
              <div className="">
                <img src={user.photoURL} alt="" className="rounded-full h-7 w-7" />
              </div>
              <div>
                <h4 className="font-medium text-black dark:text-white">{user.displayName}</h4>
                <p className="flex items-center">
                  {/* Rating:{' '} */}
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="ml-2" color="#065fd4" />
                  ))}
                </p>
                <p className=' w-72 borde break-words text-sm text-gray-700 font-normal'> {review.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarReview;
