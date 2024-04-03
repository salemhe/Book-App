import React from 'react'
import { Link } from 'react-router-dom'
import bookPic from "../assets/awardbooks.png"

const PromoBanner = () => {
  return (
      <div className='mt-16 py-12 bg-teal-200 px-4 lg:px-24'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-12 w-full'>
          <div className='md:w-1/2'>
            <h2 className='text-2xl font-bold mb-5 leading-snug'>2023 National Book Awards for Fiction Shortlist</h2>
            <Link to="/shop" className='block'>
              <button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>
                Get Promo
              </button>
            </Link>
          </div>

          <div className='md:w-1/2'>
            <img src={bookPic} alt="" className='h-auto w-60 mx-auto md:mx-0'/>
          </div>
        </div>
      </div>
  )
}

export default PromoBanner