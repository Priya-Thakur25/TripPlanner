import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to={'/view-trip/' + trip.id}>
    <div className='hover:scale-105 transition-all hover:shadow-lg p-5'>
      <img src="/temp.jpg" className='object-cover rounded-2xl h-[200px]' />
      <div>
        <h2 className='text-lg font-medium'>{trip?.userSelection.location}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection.days} days Trip with {trip?.userSelection.budget} budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem