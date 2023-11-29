import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import {Swiper,SwiperSlide} from'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

export default function Listing() {
    const params =useParams();
    const [listing,setListing]=useState(null)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(false)
    SwiperCore.use([Navigation])
  useEffect(()=>{
    
      const fetchListing =async ()=>{
        try{
          setLoading(true)
          const res =await fetch(`/api/listings/get/${params.listingId}`)
          const data =await res.json()
          if(data.success === false){
             
              setLoading(false)
              setError(true)
              return;
          }
          setListing(data)
          setLoading(false)
          setError(false)

          

        }catch(error){
             setError(true)
             setLoading(false)
        }
      
      }
      fetchListing()
  },[params.listingId]
  )
  console.log(loading)
    return (
    <main>
      {loading &&<p className="text-center my-7 text-2xl">
        Loading....</p>}
        {error && <p className="text-center my-7 text-2xl">
           Something went wrong</p>}
       {listing && !loading && !error &&(
       <div>
       <Swiper navigation>
        {listing.imageURLs.map((urls) =>
          <SwiperSlide key={urls}>
         <div className="h-[500px] " style={{background:`urls(${urls}) 
         center no-repeat`,backgroundSize :'cover'}}>
          
         </div>
          </SwiperSlide>
        )}

       </Swiper>
       </div>
       ) }
    </main>
  )
}
