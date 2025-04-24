import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="border rounded-xl shadow-lg flex gap-3 py-3 px-1">
        <img src="/temp.jpg" className="h-[130px] w-[130px] m-2 rounded-xl" />
        <div className="mt-2">
          <h2 className="font-semibold text-lg">{place?.placeName}</h2>
          <h2 className="text-sm text-gray-400">{place?.placeDetails}</h2>
          <h2 className="text-sm text-slate-600">
            Ticket : {place?.ticketPricing}
          </h2>
          <div className="py-1 flex cursor-pointer font-medium">
            <HiLocationMarker className="text-2xl text-red-600" />
            View
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
