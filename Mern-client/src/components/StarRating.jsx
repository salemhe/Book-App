import React, { useState, useContext, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../contects/AuthProvider';
import {db} from '../firebase/firebase.config';
import { serverTimestamp, addDoc, query, collection, orderBy, onSnapshot} from "firebase/firestore";
import 'firebase/firestore';

 const StarReview = ({ onSubmit, bookId }) => {
  const [rating, setRating] = useState(0);
  const [reason, setReason] = useState('');
  const [hover, setHover] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
   const [loading, setLoading] = useState(false)
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

// const handleSubmit = () => {
//    // Check if rating is provided
//    if (rating === 0) {
//      alert('Please provide a rating');
//      return;
//    }
 
//    // Submit the review
//    onSubmit({ rating, reason });
//    hideTextArea();
 
//    // Add the review to the list of reviews
//    setReviews([...reviews, { rating, reason }]);
 
//    // Save to Firebase
//    saveToFirebase(user.displayName, user.photoURL, rating, reason); // Assuming 'user.displayName' is the user's name and 'user.photoURL' is the user's image URL
 
//    // Clear the form after submission
//    setRating(0);
//    setReason('');
//  };
 
 
//  const saveToFirebase = async (userName, userImage, userRating, userReview) => {

//    try {
//       if (!user) throw new Error("User not signed in");
//       setLoading(true);

      
//       // Add document metadata to Firestore
//     await addDoc(collection(db, "users", user.uid, "review"), {
//          userId: user.uid,
//          userName,
//          userImage,
//          userRating,
//          userReview,
//          timestamp: serverTimestamp(),
//       });

//       console.log("review submitted ")
//    }   catch (error) { 
//       console.error('Error adding review to Firebase: ', error);
//    } 
   
// }

// StarReview component
const handleSubmit = async () => {
   // Check if rating is provided
   if (rating === 0) {
     alert('Please provide a rating');
     return;
   }
 
   // Submit the review
   onSubmit({ rating, reason });
   hideTextArea();
 
   // Save to Firebase with bookId
   saveToFirebase(user.displayName, user.photoURL, rating, reason, bookId); 
 
   // Clear the form after submission
   setRating(0);
   setReason('');
 };
 
 const saveToFirebase = async (userName, userImage, userRating, userReview, bookId) => {
   try {
     if (!user) throw new Error("User not signed in");
     setLoading(true);
 
     // Add document metadata to Firestore
     await addDoc(collection(db, "books", bookId, "reviews"), {
       userId: user.uid,
       userName,
       userImage,
       userRating,
       userReview,
       timestamp: serverTimestamp(),
     });
 
     console.log("review submitted ")
   } catch (error) { 
     console.error('Error adding review to Firebase: ', error);
   } 
 }

//  useEffect(() => {
//    const reviewQuery= collection(db, "books", bookId, "reviews");
//    const unsubscribe = onSnapshot(reviewQuery, orderBy("timestamp", "desc"), (snapshot) => {
//      const reviewsData = snapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//       timestamp: doc.data().timestamp.toDate()
//      }));
//      setReviews(reviewsData);
//    });
 
//    // Clean up the listener when the component unmounts
//    return () => unsubscribe();
//  }, [bookId]);

 
useEffect(() => {
   const reviewQuery = collection(db, "books", bookId, "reviews");
   const unsubscribe = onSnapshot(
     query(reviewQuery, orderBy("timestamp", "desc")),
     (snapshot) => {
       const reviewsData = snapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
         timestamp: doc.data().timestamp.toDate() // Convert Firestore timestamp to JavaScript Date object
       }));
       setReviews(reviewsData);
     }
   );
 
   // Clean up the listener when the component unmounts
   return () => unsubscribe();
 }, [bookId]);
 

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
      <h3 onClick={showTextArea} className="reply comment cursor-pointer font-semibold w-24 !text-[#065fd4] ">
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
            // console.log(review),
            <div key={index} className="borde p-4 space-x-4 flex">
              <div className="">
                <img src={review.userImage} alt="" className="rounded-full h-7 w-7" />
              </div>
              <div>
                <h4 className="font-medium text-black dark:text-white">{review.userName}</h4>
                <div className=' flex space-x-3'>
                  
                  <p className="flex items-center">
                     {/* Rating:{' '} */}
                     {[...Array(review.userRating)].map((_, i) => (
                     <FaStar key={i} className="ml-2" color="#065fd4" />
                     ))}
                  </p>
                  
                  <p className='text-xs text-gray-500'>{review.timestamp.toLocaleDateString()}</p>
                </div>
                <p className=' w-72 borde break-words text-sm text-gray-700 font-normal'> {review.userReview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarReview