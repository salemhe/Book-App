import React, { useState } from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Navigate to search results page with the current query
    // For simplicity, we'll just update the URL in this example
    window.location.href = `/search-results?query=${query}`;
    setQuery(" ")
  };

  return (
    <div className="px-4 lg:px-24  bg-teal-200 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* Left side */}
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-4xl font-bold leading-snug text-black">
              Discover your next read with ease! 
            <span className="text-blue-700">Simply search for books hassle-free</span>
          </h2>
          <p className="md:w-4/5">
            Find and read more books you{"'"}ll love, and keep track of the
            books you want to read. Be part of the world{"'"}s largest communtiy
            of book lovers on Goodreads.{" "}
          </p>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Search a book"
              className="py-2 px-2 rounded-s-sm outline-none"
            />
            <button
              onClick={handleSearch}
              disabled={!query}
              className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right side */}
        {/* <div>
          <BannerCard />
        </div> */}
      </div>
    </div>
  );
}

export default Banner;


