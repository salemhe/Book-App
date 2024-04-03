import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaCartShopping } from 'react-icons/fa6';

const BookCards = ({ headline, books }) => {
  // console.log(books)
  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>

      {/* Cards */}
      <div className='mt-12'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className='mySwiper w-full h-full'
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
              <Link to={`/book/${book._id}`}>
                <div className='relative'>
                  <img src={book.imageUrl} alt='' />
                  <div className='absolute top-3 right-3 bg-pink-700 hover:bg-black p-3 rounded'>
                    <FaCartShopping className='w-4 h-4 text-white' />
                  </div>
                </div>
                <div>
                  <div>
                    <h3 className='text-black text-sm md:text-base lg:text-lg'>{book.bookTitle}</h3>
                    <p className='text-black text-xs md:text-sm lg:text-base'>{book.authorName}</p>
                  </div>
                  <div>
                    <p className='text-black text-sm md:text-base lg:text-lg'>$10</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookCards;
