// BookDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentSection from '../Mern-client/src/components/Comment';
import Comment from '../Mern-client/src/components/Comment';
import useNode  from '../Mern-client/src/hooks/useNode';
import StarRating from '../Mern-client/src/components/StarRating';

const comments ={
  id: 1,
  items: []
}

function BookDetails() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);  const [commentsData, setCommentsData] = useState(comments);
  const [userRating, setUserRating] = useState(0); // State to track user's rating
  const [userReview, setUserReview]  = useState(''); // State for the review
  const { insertNode, editNode, deleteNode } = useNode();

  // Function to handle user's rating change
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };


  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  const fetchRecommendations = async () => {
   try {
     const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=random');
     const data = await response.json();
     setRecommendations(data.items.slice(0, 4));
   } catch (error) {
     console.error('Error fetching recommendations:', error);
   }
 };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const data = await response.json();
        setBookDetails(data.volumeInfo);
        console.log(data.volumeInfo)
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
    fetchRecommendations();
  }, [bookId]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }



  return (
    <div >
      <div className="p-8 mt-16">
         {/* <h1 className="text-xl font-bold mb-4">Book Title: <span className='font-semibold text-lg'>{bookDetails.title}</span></h1> */}
         <div className="block sm:flex border bg-gray-100 rounded-md overflow-hidden shadow-md">
            <div className=" w-1/2">
               {/* <div className='w-full borde h-full  relativ'>
                  <img
                     src={bookDetails.imageLinks?.thumbnail}
                     alt={bookDetails.title}
                     className="absolut inset-0   h-full object-cover"
                  />
               </div> */}
               <div className=' h-full items-center w-full pl-8 sm:pl-0 flex justify-center '>
                  <img src={bookDetails.imageLinks?.thumbnail} alt={bookDetails.title} className="w-56 mt-6 h-72 object-cover" />
                </div>
            </div>
            <div className="p-6 sm:pr-36 sm:py-6 w-full sm:w-[1/2]">
               <h2 className="text-xl sm:text-2xl font-semibold mb-4">{bookDetails.title}</h2>
               <div className="mb-4">
                  <p className="font-semibold text-sm mb-2">
                  Author(s): <span className="text-gray-700 text-sm font-normal">{bookDetails.authors?.join(', ')}</span>
                  </p>
                  <p className="font-semibold text-sm mb-2">
                  Published Date: <span className="text-gray-700 text-sm font-normal">{bookDetails.publishedDate}</span>
                  </p>
                  <p className="font-semibold text-sm mb-2">
                  Ratings: <span className="text-gray-700 text-sm font-normal">{bookDetails.maturityRating}</span>
                  </p>
                  <p className="font-semibold text-sm mb-2">
                  Page Count: <span className="text-gray-700 text-sm font-normal">{bookDetails.pageCount}</span>
                  </p>
               </div>
               <div className="font-semibold text-sm mb-2">Description: <div className=' text-sm text-gray-700 font-normal' dangerouslySetInnerHTML={{ __html: bookDetails.description }} /></div>
            </div>
         </div>

         <div>
      {/* Existing code... */}

      {/* Render the StarRating component */}
      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Rate this book:</h2>
        <StarRating
         onChange={handleRatingChange} />
      </div> */}

      {/* Allow users to input reason for their review */}
      {/* <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Add a reason for your review:</h2>
        <textarea
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          rows="4"
          className="w-full border rounded-md p-2"
          placeholder="Enter your reason here..."
        />
      </div> */}
    </div>
         {/* Render description as HTML */}
         
         <div className='mt-16'>
          <Comment comment={commentsData}
                handleInsertNode={handleInsertNode}
                handleEditNode={handleEditNode}
                handleDeleteNode={handleDeleteNode}
          />
         </div>
      </div>
      <hr className="my-8" />

      {/* Add more details here such as description, ISBN, ratings, etc. */}

      <div className="p-8">
      <h2 className="text-3xl font-bold mt-12 mb-8">Book Recommendations</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
         {recommendations.map((book) => (
         <div key={book.id} className="flex flex-col bg-white shadow-md rounded-sm overflow-hidden transition transform hover:-translate-y-2  
         ease-out hover:ease-in hover:shadow-lg">
            <Link to={`/book-details/${book.id}`}>
            <div className=' flex justify-center '>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="w-36 mt-6 h-44 object-cover" />
            </div>
            <div className="p-4">
            <h3 className=" text-sm font-semibold mb-2 text-center">{book.volumeInfo.title}</h3>
            <p className=" font-semibold text-sm mb-2 text-center">Author(s): <span className='text-gray-700 text-sm font-normal'>{book.volumeInfo.authors?.join(', ')}</span></p>
            <p className=" font-semibold text-sm text-center">Published Date: <span className='text-gray-700 text-sm font-normal'>{book.volumeInfo.publishedDate}</span></p>
            </div>
            </Link>
         </div>
         ))}
      </div>
      </div>
    </div>
  );
}

export default BookDetails;
