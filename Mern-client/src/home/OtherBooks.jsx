import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';

const OtherBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect( () => {
        fetch("https://mern-server-ruby.vercel.app/all-books").then(res => res.json()).then(data => setBooks(data.slice(0,5)));

    }, [])
  return (
    <div>
        <BookCards books={books} headline="Other Books"/>
    </div>
  )
}

export default OtherBooks