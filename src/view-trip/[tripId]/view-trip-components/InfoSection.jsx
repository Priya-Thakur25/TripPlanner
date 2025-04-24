import { GetPlaceDetails } from '@/services/GlobalAPI';
import React, { useEffect } from 'react'
import { PiShareFatFill } from "react-icons/pi";

function InfoSection({trip}) {


  useEffect(() => {
    trip&&GetPlacePhoto();
  },[trip])
   
  const GetPlacePhoto = async() => {
    const data = {
      textQuery:trip?.userSelection?.location
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data)
    })
  }
  return (
    <div className=''>
        <img src='/temp.jpg' className='h-72 w-full rounded-xl'/>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-3 my-4'>
                <h2 className='text-2xl font-bold text-gray-900'>{trip?.userSelection?.location}</h2>
                <div className='flex gap-4 text-gray-700'>
                    <p className='text-base  font-normal bg-slate-200 rounded-2xl p-1 px-3'>📆{trip?.userSelection?.days} Day</p>
                    <p className='text-base  font-normal bg-slate-200 rounded-2xl p-1 px-3'>💰{trip?.userSelection?.budget} budget</p>
                    <p className='text-base  font-normal bg-slate-200 rounded-2xl p-1 px-3'>🏝️For {trip?.userSelection?.people}</p>
                </div>
            </div>
            <PiShareFatFill className='border'/>
        </div>
    </div>
  )
}

export default InfoSection