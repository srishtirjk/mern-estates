import {FaSearch} from 'react-icons/fa'
import {Link,useNavigate}from 'react-router-dom'
import {useSelector} from  'react-redux'
import { useEffect, useState } from 'react'
export default function Header() {
  const{currentUser}=useSelector(state=>state.user)
   const [searchTerm,setSearchTerm] =useState('')
   const navigate =useNavigate()
   const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams =  new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery =urlParams.toString();
    navigate(`/search?${searchQuery}`)  

   }
   useEffect(()=>{
    const urlParams =new URLSearchParams(location.search)
     const searhTermFromUrl = urlParams.get('searchTerm')
     if(searhTermFromUrl){
      setSearchTerm(searhTermFromUrl)
     }
   },[location.search])
    //in h1 we use sm:text-xl for mobile user
    //same we use flex-wrap for mobile
  return (
  
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-3xl mx-auto p-3">
            <Link to='/'>
    <h3 className="font-bold  text-sm sm:text-xl flex flex-wrap">
                
              <span className="text-slate-500">Prestige</span>
              <span className="text-slate-700">Estate</span>
    </h3> </Link>

    <form onSubmit={handleSubmit}
    className="bg-gray-100 p-3 rounded-lg flex item-center">
        <input type="text" placeholder="search...."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
     className="bg-transparent focus:outline-none w-24 sm:w-64"/>
    <button>
       <FaSearch className='text-slate-400'/>
       </button>  
       </form>
        <ul className='flex gap-4'>
           <Link to='/home'>
               <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
            </Link>

             <Link to='/about'>
               <li  className='hidden sm:inline text-slate-700 hover:underline'>About</li>
             </Link>
             <Link to='/profile'>

             { currentUser ?(
              <img  className="rounded-full h-7 w-7 object-cover"src={currentUser.avatar}
               alt="profile"/>):(
             <li  className='  text-slate-700 hover:underline'>Sign-in</li>
             )}
             </Link>
        </ul>
        </div>
    </header>
  )
}
