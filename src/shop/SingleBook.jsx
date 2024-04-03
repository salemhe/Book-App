// import React from "react";
// import { useLoaderData } from "react-router-dom";

// const SingleBook = () => {
//   // Destructuring the data from useLoaderData
//   const { bookTitle, imageUrl, authorName, bookPdfUrl } = useLoaderData();

//   const handleButtonClick = () => {
//     // Navigate to the specified URL when the button is clicked
//     window.open(bookPdfUrl, "_blank");
//   };

//   return (
//     <div className="mt-20 mx-auto px-4 lg:px-24 text-black">
//       {/* Container for book image, author name, book title, and download button */}
//       <div className="flex flex-col items-center mb-8">
//         {/* Display the book image */}
//         <img src={imageUrl} alt={bookTitle} className="h-80 mb-2 mx-auto" />

//         {/* Display the book details */}
//         <h2 className="text-lg font-bold">{bookTitle}</h2>
//         <h2 className="text-md font-bold">Author: {authorName}</h2>

//         {/* Use a button to trigger navigation */}
//         <button
//           className="text-blue-500 bg-transparent border border-solid border-blue-500 rounded p-1 mt-4"
//           onClick={handleButtonClick}
//         >
//           Download book here
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SingleBook;



// import React from "react";
// import { useLoaderData } from "react-router-dom";

// const SingleBook = () => {
//   const { bookTitle, imageUrl, authorName, bookDescription, bookPdfUrl } =
//     useLoaderData();

//   const handleButtonClick = () => {
//     window.open(bookPdfUrl, "_blank");
//   };

//   return (
//     <div className="mt-20 mx-auto px-4 lg:px-24 text-black">
//       <div className="flex flex-col items-center mb-8">
//         <img src={imageUrl} alt={bookTitle} className="h-80 mb-2 mx-auto" />
//         <h2 className="text-lg font-bold">{bookTitle}</h2>
//         <h2 className="text-md font-bold">Author: {authorName}</h2>
//         <p>{bookDescription}</p>
//         <button
//           className="text-blue-500 bg-transparent border border-solid border-blue-500 rounded p-1 mt-4"
//           onClick={handleButtonClick}
//         >
//           Download book here
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SingleBook;

import { useLoaderData } from "react-router-dom";

const SingleBook = () => {
  const { bookTitle, imageUrl, authorName, bookDescription, bookPdfUrl } =
    useLoaderData();

  const handleButtonClick = () => {
    window.open(bookPdfUrl, "_blank");
  };

  return (
    <div className="mt-20 mx-auto px-4 lg:px-24 text-black flex justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Image on the left */}
        <img src={imageUrl} alt={bookTitle} className="h-80 mb-2" />

        {/* Text on the right */}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-bold">{bookTitle}</h2>
          <h2 className="text-md font-bold">Author: {authorName}</h2>
          <p>{bookDescription}</p>
          <button
            className="text-blue-500 bg-transparent border border-solid border-blue-500 rounded p-1 mt-4"
            onClick={handleButtonClick}
          >
            Download book here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
