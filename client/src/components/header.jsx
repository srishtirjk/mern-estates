import {FaSearch} from 'react-icons/fa'
import {Link}from 'react-router-dom'
import {useSelector} from  'react-redux'
export default function Header() {
  const{currentUser}=useSelector(state=>state.user)
   
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

    <form className="bg-gray-100 p-3 rounded-lg flex item-center">
        <input type="text" placeholder="search...."
     className="bg-transparent focus:outline-none w-24 sm:w-64"/>
       <FaSearch className='text-slate-400'/>
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
