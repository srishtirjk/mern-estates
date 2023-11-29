import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import{Link} from 'react-router-dom'
import { getDownloadURL, 
             getStorage,
             ref, 
             uploadBytesResumable
       } from 'firebase/storage'
import { app } from '../firebase.jsx'
import { deleteUserFailure,
              deleteUserStart, 
              deleteUserSuccess,
               signOutUserFailure,
               signOutUserStart,
              signOutUserSuccess,
              updateUserFailure,
               updateUserStart,
               updateUserSuccess
       } from '../../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
// import { fileUploadError } from 'react-icons/fa'

export default function Profile() {
  const [file, setFile] = useState(undefined)
  
  const [ filePerc,setFilePerc] = useState(0)
  const [fileUploadError,setFileUploadError]=useState(false)
  const[formdata,setFormdata]=useState({})
  // const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileRef = useRef(null)
  const { currentUser,error,loading } = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const[showListingError,setshowListingError]=useState(false)
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [deleteSuccess,setDeleteSuccess]=useState(false);
  const [logoutSuccess,setlogoutSuccess]=useState(false);
  const[showListing,setShowListing]=useState([])
  console.log(formdata)
  console.log(filePerc)
  console.log(fileUploadError)

  // filePerc,fileUploadError,

  //firebase storage
  // allow read;
  // allow write:if
  // request.resource.size<2*1024*1024 &&
  // request.resource.contentType.matches('image./*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }

  },[file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app)

    //app from firebase
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //snapshot every changes on file 
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError( true)
         console.log(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>setFormdata({...formdata,avatar:downloadURL}))
      
      }
    );
    // )(error)
    // {
    //   setFileUploadError(true);
    // }
    // ()=>{ 
    //   get
    // }
      
  };
  const handleChange=(e)=>{
    setFormdata({ ...formdata,[e.target.id]:e.target.value})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res= await fetch(`/api/user/update/${currentUser._id}`
      // const res =await fetch(`/api/user/update/${currentUser._id}`
      ,{
        method:"POST",
        headers:{
          'Content-Type' :'application/json'
        },
        body:JSON.stringify(formdata)
      })
      const data = await res.json()
      console.log(data)
      if(data.success ===false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    }catch(error){
      dispatch(updateUserFailure(error.message ,"hello"));

    }
  }

  const handleDeleteUser=async()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
      {
        method:"DELETE",
      });

      const data =await res.json()
      if(data.success===false){
        dispatch(deleteUserFailure(data.message ))
        return;
      }
 dispatch(deleteUserSuccess(data))
 setDeleteSuccess(true)
    }catch(error){
      dispatch(deleteUserFailure(error.message ))

    }

  }
  const handleLogout = async ()=>{
    try{
      dispatch(signOutUserStart())
      const res =await fetch('/api/auth/signout/')
        const data =await res.json()
        if(data.success===false){
          dispatch(signOutUserFailure(data.message))
          return;
        }
          dispatch(signOutUserSuccess(data))
          setlogoutSuccess(true);
    }catch(error){
         dispatch(deleteUserFailure(error.message))
    }
  };

  const handleShowListings= async()=>{
    try{
      setshowListingError(false)
      const res =await fetch(`/api/user/listing/${currentUser._id}`)
    const data = await res.json();
    if(data.success === false){
      setshowListingError(true)
      return
    }
    console.log(data);
   setShowListing(data)

  }catch(error){
      setshowListingError(true)
    }
    
  }
    // const handleListingDelete =async(listingId)=>{
    //   try{
    //     const res =await fetch(`api/listings/delete${listingId}`,{
    //       method:'DELETE',
    //     });
    //     const data =await res.json();
    //     if(data.success === false){
    //       console.log(data.message)
    //       return;
    //     }
    //     setShowListing((prev)=>prev.filter((listing)=>listing._id !==listingId))
    //   }catch(error){
    //     console.log(error)

    //   }
    // }
    const handleListingDelete = async (listingId) => {
      try {
        const res = await fetch(`/api/listings/delete/${listingId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
  
        setShowListing((prev) =>
          prev.filter((listing) => listing._id!== listingId)
        );
      } catch (error) {
        console.log(error.message);
      }
    };
  
  
    return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className="text-3xl font-semibold text-center my-7">
        Profile
        </h1>
    <form onSubmit={handleSubmit} className='gap-4 flex flex-col'>

        <input onChange={(e) => setFile(e.target.files[0])} type="file"
         ref={fileRef}  hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} className=' self-center mt-2
             rounded-full h-24 cursor-pointer object-cover w-24' alt="profile"
               src={formdata.avatar||currentUser.avatar}/>
{/* ||currentUser.avatar */}
    <p className='text-sm self-center'>
            { fileUploadError ?<span className='text-red-700'>Error Image Upload(image must be less than 2mb)
               </span>:
            filePerc>0  && filePerc<100 ?
         (
          <span className='text-slate-700'>{`Uploading ${filePerc} %`}</span>
          )
          :
          (filePerc===100 ?
          (
            <span className='text-green-700'>Image successfully uploaded</span>
            )
            :""
          )
          }
          {/* /*  
           defaultValue={currentUser.email}
           ||currentUser.avatar
           defaultValue={currentUser.username}*/ }
           
         </p>
        <input defaultValue={currentUser.username} type="text" id="username" placeholder='username'onChange={handleChange} className='border p-3 rounded-lg' />
        <input defaultValue={currentUser.email} type="text" id="email"  placeholder='email'onChange={handleChange} className='border p-3 rounded-lg' />
        <input type="text" id="password"  placeholder='password'onChange={handleChange} className='border p-3 rounded-lg' />
        <button disabled={loading} type="submit" className='bg-slate-700 text-white rounded-lg p-3 
        uppercase hover:opacity-80'>{loading ?'loading...':'Update'}</button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase
         text-center hover:opacity-95'to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={ handleDeleteUser}className='cursor-pointer text-red-700'>Delete Account</span>
        <span onClick={handleLogout} className='cursor-pointer text-red-700'>Sign Out</span>

      </div>
      <p className='text-red-600 mt-5'>{error?error:""}</p>
      <p className='text-green-700 mt-5'>
         {updateSuccess?"User is updated successfully!":""}</p>
         <p className='text-green-700 mt-5'>
         {deleteSuccess?"User is delete successfully!":""}</p>
         <p className='text-green-700 mt-5'>
         {logoutSuccess?"User is logout successfully!":""}</p>
        <button type="button" onClick={handleShowListings}className='  bg-gray-200 text-green-700 w-full'>Show Listing</button>
        <p className='text-red-600 mt-5'>{showListingError?'Error showing listing':""}</p>
      {showListing && showListing.length >0 &&(
        <div className='flex flex-col gap-4'>
          <h1 className=' text-center mt-7 text-2xl font-semibold'>
            Your Listing
          </h1>
          {showListing.map((listing)=>(
            <div key={listing._id} 
            className='border rounded-lg p-3 items-center gap-4 flex justify-between'>
             <Link to={`/listings/${listing._id}`}>
              <img src={listing.imageURLs[0]}
              alt='listing cover'
              className='h-16 w-16 object-contain'/>
             </Link>
             <Link className='text-slate-700 font-semibold truncate flex-1 hover:underline'
               to={`listing/${listing._id}`}>
                <p>{listing.name}</p></Link>
            
            <div className='flex flex-col item-center '>
              <button onClick={()=>handleListingDelete(listing._id)}
               className='text-red-700 uppercase'>Delete</button>
              {/* <Link to={`/update-listing/${listing._id}`}>  */}
             
              {/* </Link> */}
              <Link to={`/update-listing/${listing._id}`}>
              <button className='text-green-700 uppercase'>Edit</button>
              </Link>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
