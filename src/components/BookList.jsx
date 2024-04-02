import React, { useState, useEffect } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("/books");
        if (response.data.success) {
          setBooks(response.data.data);
        } else {
          console.error("Failed to fetch books:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Your request</h1>
      <div className="books-list">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img src={book.url} alt="Book Cover" />
            <h2>{book.title}</h2>
            <p>Author: {book.authors}</p>
            <p>Description: {book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
