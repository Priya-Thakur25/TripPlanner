import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlaceToVisit({ trip }) {
  return (
    <div>
      <h2 className="text-xl font-bold mt-5">Places to Visit</h2>
      {trip?.tripData?.itinerary.map((item,index) => (
        <div key={index} className='p-2'>
          <h2 className='font-medium text-lg'>Day {item.day}</h2>
          <div className='grid md:grid-cols-2 gap-5'>
            {item?.plan.map((it,index) => (
              <div className='' key={index}>
                <h2 className='text-sm font-medium text-orange-500 my-2'>{it.time}</h2>
                <PlaceCardItem place={it}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaceToVisit;
