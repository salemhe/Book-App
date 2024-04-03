import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
      fetchRecommendations();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=random&startIndex=${Math.floor(Math.random() * 100)}`);
      const data = await response.json();
      setRecommendations(data.items.slice(0, 4));
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
<div className="p-8 mt-16">
  <h1 className="text-3xl font-bold mb-8">Search Results</h1>
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
    {searchResults.map((book) => (
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

  
  );
}

export default SearchResults;
