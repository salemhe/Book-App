// BookDetails.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentSection from '../components/Comment';
import Comment from '../components/Comment';
import useNode  from '../hooks/useNode';
import StarRating from '../components/StarRating';
import StarReview from '../components/StarRating';
import { db } from '../firebase/firebase.config';
import { collection, doc, getDoc, orderBy, onSnapshot, query, addDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from '../contects/AuthProvider';
import CommentForm from '../components/commentForm';

// const comments ={
//   id: 1,
//   items: []
// }

function BookDetails() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);  
  const [commentsData, setCommentsData] = useState([]);

  const { insertNode, editNode, deleteNode } = useNode();
  const {user} = useContext(AuthContext)

  const handleReviewSubmit = (reviewData) => {
    console.log('Submitted Review:', reviewData);
    // You can send the review data to your backend or manage it locally.
  };


  const handleInsertNode = async (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);

      try {
          if (!user) throw new Error("User not signed in");
          const serializedStructure = JSON.stringify(finalStructure);
        // Add document metadata to Firestore
        await addDoc(collection(db, "books", bookId, 'comments'), {
          userId: user.uid,
          userName: user.displayName,
          userImage: user.photoURL,
          // parentId,
          commentText: item,
          finalStructure: serializedStructure,
          timestamp: serverTimestamp(),
          });

          console.log("New node added!");
          setCommentsData({...commentsData, items:finalStructure});
      } catch (error) {
        console.error('Error adding comment: ', error);
      }

    // setCommentsData(finalStructure);
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

  // const handleInsertNode = (parentId, item) => {
  //   insertNode(bookId, parentId, item);
  // };
  
  // const handleEditNode = (commentId, value) => {
  //   editNode(bookId, commentId, value);
  // };
  
  // const handleDeleteNode = (commentId) => {
  //   deleteNode(bookId, commentId);
  // };

  useEffect(() => {
        const commentQuery = collection(db, "books", bookId, "comments");
        const comments = onSnapshot( 
          query(commentQuery, orderBy("timestamp", "desc")),  
          (snapshot) => {
            const newComments = snapshot.docs.map((doc) => {
              const commentData = doc.data();
              return { 
                id: doc.id, 
                ...commentData, 
                timestamp: commentData.timestamp ? commentData.timestamp.toDate() : null
              };
            });
            console.log('newComments', newComments);
            setCommentsData(newComments);
        }
      );
      
        // setCommentsData({ id: bookId, items: comments });
      return () => comments()
  
  }, [bookId]);
  
  
const fetchRecommendations = async () => {
  try {
    // Fetch book details
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    const data = await response.json();
    setBookDetails(data.volumeInfo);

    // Extract relevant keywords from the book details
    const keywords = data.volumeInfo.title.split(" ").join("+");

    // Fetch recommendations based on extracted keywords
    const recommendationResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keywords}&startIndex=0&maxResults=4`);
    const recommendationData = await recommendationResponse.json();
    setRecommendations(recommendationData.items);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
};

useEffect(() => {
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
                  <img src={bookDetails.imageLinks?.thumbnail} alt={bookDetails.title} className="w-56 mt-6 h-72 mb-4 object-cover" />
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
                  {/* <p className="font-semibold text-sm mb-2">
                  Ratings: <span className="text-gray-700 text-sm font-normal">{bookDetails.maturityRating}</span>
                  </p> */}
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
      <div className="mt-8">
        <h2 className="text-xl mt-6 font-semibold mb-2">Rate this book:</h2>
        <StarReview onSubmit={handleReviewSubmit} bookId={bookId} />
      </div>
    </div>
         {/* Render description as HTML */}
         
         <div className='mt-16'>
          <CommentForm  comment={commentsData} handleInsertNode={handleInsertNode}/>
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
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="w-36 mt-4 h-44 object-cover" />
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


// const {user} = useContext(AuthContext)
  
// const insertNode = async (bookId, parentId, item) => {
//   try {
//     if (!user) throw new Error("User not signed in");
//   console.log(parentId)

//   // Add document metadata to Firestore
//   await addDoc(collection(db, "books", bookId, 'comments'), {
//     userId: user.uid,
//     userName: user.displayName,
//     userImage: user.photoURL,
//     // parentId,
//     item,
//     timestamp: serverTimestamp(),
//   });
//   } catch (error) {
//     console.error('Error adding comment: ', error);
//   }
// };

// const editNode = async (bookId, commentId, value) => {
//   try {
//     await db.collection('books').doc(bookId).collection('comments').doc(commentId).update({
//       item: value,
//       timestamp: serverTimestamp(),
//     });
//   } catch (error) {
//     console.error('Error editing comment: ', error);
//   }
// };

// const deleteNode = async (bookId, commentId) => {
//   try {
//     await db.collection('books').doc(bookId).collection('comments').doc(commentId).delete();
//   } catch (error) {
//     console.error('Error deleting comment: ', error);
//   }
// };