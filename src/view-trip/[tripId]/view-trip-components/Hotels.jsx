import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='text-xl font-bold mt-5'>Hotel Reccommendations</h2>
        <div className='mt-3 grid grid-cols-3 gap-3'>
            {trip?.tripData?.hotels?.map((hotel,index) => (
                <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+ "," + hotel?.hotelAddress} target='_blank'>
                    <div className='hover:scale-105 transition-all cursor-pointer' key={index}>
                        <img src='/temp.jpg' className='h-[75%] w-full rounded-xl' />
                        <div className='my-2 flex flex-col gap-1'>
                            <h2 className='font-medium'>{hotel.hotelName}</h2>
                            <h2 className='text-xs font-normal text-gray-600'>📍{hotel.hotelAddress}</h2>
                            <h2 className='text-sm font-normal'>💰{hotel.price.range} per night</h2>
                            <h2 className='text-sm font-normal'>⭐{hotel.rating} rating</h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Hotels