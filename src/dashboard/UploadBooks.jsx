import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';

const UploadBooks = () => {
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
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageUrl = form.imageUrl.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPdfUrl = form.bookPdfUrl.value;

    const bookObj = {
      bookTitle, authorName, imageUrl, category, bookDescription, bookPdfUrl
    }

    console.log(bookObj)

    //send data to database
    fetch("http://localhost:5000/upload-book", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(bookObj) 
    }).then(res => res.json()).then(data => {
      // console.log(data)
      alert("Book Upload successfully !!")
      form.reset();
    })
    
  }
  
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1000px] flex-col flex-wrap gap-4">
        {/* First Row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle"  name='bookTitle'  type="text" placeholder="Book Name" required />
          </div>

          {/* Author Name */}
          <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName"  name="authorName"  type="text" placeholder="Author Name" required />
      </div>
        </div>

        {/* Second Row */}
        <div className='flex gap-8'>
          
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageUrl" value="Book Image URL" />
            </div>
            <TextInput id="imageUrl"  name='imageUrl'  type="text" placeholder="Book Image" required />
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
        <Textarea id="bookDescription" name="bookDescription"  placeholder="Write your Book description..."  className='w-full'  required rows={6} />
      </div>

      {/* Book PDF Link */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
        </div>
        <TextInput id="bookPdfUrl" name="bookPdfUrl"  type="text" placeholder="book pdf url" required />
      </div>

      <Button type="submit" className='mt-5'>Upload Book</Button>

    </form>

    </div>
  )
}

export default UploadBooks