import { Link } from "react-router-dom";
import {MdLocationOn} from 'react-icons/md'
export default function ListingItem({listing}) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg
    transition-shadow w-full sm:w-[330px] overflow-hidden rounded-lg ">
    <Link to={`/listings/${listing._id}`}>
  <img src={listing.imageURLs[0]} alt='listing cover'
  className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105
  transition-scale duration-300"/>
  <div className="p-3 flex flex-col gap-2 w-full">
    <p className="text-lg font-semibold text-slate-700 truncate">
{listing.name}
    </p>
    <div className="flex flex-center gap-1">
      <MdLocationOn className="h-4 w-4 text-green-700"/>
      <p className="text-sm w-full text-gray-600 truncate">{listing.address}</p>
    </div>
    <p className="text-sm text-gray-600 line-clamp-2">
      {listing.description}</p>
      <p className="text-gray-700 mt-2 font-semibold ">
         ₹{' '} {listing.offer ? listing.discountPrice.toLocaleString('en-IN') 
      : listing.regularPrice.toLocaleString('en-IN')}
      {listing.type ==='rent' && '/month'}</p>
      <div className="text-slate-700 flex ga-4">
        <div className=" font-bold text-xs">{listing.bedrooms >1 ?`${listing.bedrooms} beds`
        :`${listing.bedrooms}bed`
        }</div>

<div className=" font-bold text-xs">{listing.bathrooms >1 ?`${listing.bathrooms} baths`
        :`${listing.bathrooms}bath`
        }</div>
      </div>
  </div>
  
    </Link>
    </div>
  )
}
