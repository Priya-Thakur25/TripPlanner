import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col text-center px-40 mt-20'>
      <h2 className='font-extrabold text-5xl p-5'>
        <span className='text-red-500 block mb-5'>Discover Your Next Adventure with AI:<br/></span> Personalized ltineraries at Your Fingertips</h2>
      <p className='text-xl font-normal'>Your Personal trip planner and travel curator, creating custom ltineraries to your interests and Budget.</p>
      <Link to={'/create-trip'}><div className='mt-10'><Button className="">Get Started, it's Free</Button></div></Link>
    </div>
  )
}

export default Hero