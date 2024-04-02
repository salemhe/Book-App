import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';

const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle, authorName, imageUrl, category, bookDescription, bookPdfUrl} = useLoaderData();


  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mistery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Biography",
    "Autobiography",
    "History",
    "Self-Help",
    "Memories",
    "Buisness",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design"
  ]

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value)
  }

  //handle book submition
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageUrl = form.imageUrl.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPdfUrl = form.bookPdfUrl.value;

    const updateBookObj = {
      bookTitle, authorName, imageUrl, category, bookDescription, bookPdfUrl
    }

    // console.log(bookObj)
    //update book data
    fetch(`http://localhost:5000/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateBookObj)
    }).then(res => res.json()).then(data => {
      // console.log(data)
      alert("Book is Updated successfully !!")
    }) 
  }
  
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the book data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1000px] flex-col flex-wrap gap-4">
        {/* First Row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle"  name='bookTitle'  type="text"  defaultValue={bookTitle} placeholder="Book Name" required />
          </div>

          {/* Author Name */}
          <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName"  name="authorName"  type="text" defaultValue={authorName}  placeholder="Author Name" required />
      </div>
        </div>

        {/* Second Row */}
        <div className='flex gap-8'>
          
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageUrl" value="Book Image URL" />
            </div>
            <TextInput id="imageUrl"  name='imageUrl'  type="text"  defaultValue={imageUrl} placeholder="Book Image" required />
          </div>

          {/* Category Name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>

            <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory}onChange={handleChangeSelectedValue}>
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }

            </Select>
        
          </div>
        </div>

        {/* Book Descriptions */}
        <div>
        <div className="mb-2 block">
          <Label htmlFor="bookDescription" value="Book Description" />
        </div>
        <Textarea id="bookDescription" name="bookDescription"  defaultValue={bookDescription}  placeholder="Write your Book description..."  className='w-full'  required rows={6} />
      </div>

      {/* Book PDF Link */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
        </div>
        <TextInput id="bookPdfUrl" name="bookPdfUrl"   defaultValue={bookPdfUrl} type="text" placeholder="book pdf url" required />
      </div>

      <Button type="submit" className='mt-5'>Update Book</Button>

    </form>

    </div>
  )
}

export default EditBooks