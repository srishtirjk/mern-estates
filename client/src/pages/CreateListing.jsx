import { getDownloadURL,
         getStorage, 
         ref, 
         uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { app } from "../firebase";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
export default function CreateListing() {

        const{currentUser}=useSelector(state=>state.user)
         const [files,setFiles]=useState([])
         const[error,setError]=useState(false)
         const navigate =useNavigate();
         const[loading,setLoading]=useState(false)
         const[formdata,setFormdata]=useState({
    imageURLs:[],
    name:"",
    description:'',
    address:'',
    sale:false,
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:3000,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
 })


  const [uploading,setUploading]=useState(false);
  //
        const [imageUploadError,setImageUploadError]=useState(false)
       console.log(imageUploadError)
        console.log(formdata)
       
       
        const handleImageButton=()=>{
                if(files.length > 0 && files.length+formdata.imageURLs.length < 7)
          {
            setUploading(true)
            setImageUploadError(false)
            const promises =[]
          for(let i=0;i<files.length;i++)
          {
             promises.push(storeImage(files[i]));
          }
         Promise.all(promises).then((urls)=>{
       setFormdata({ ...formdata,
        imageURLs:formdata.imageURLs.concat(urls)})
        setImageUploadError(false);
        setUploading(false);
       
 }).catch((error)=>{
  setImageUploadError("image upload failed (2 mb max per image)",error)
  setUploading(false);
 })
 

 }
 else
 {
  setImageUploadError("you can only upload 6 images per listing")
  setUploading(false); 
}
}
 const storeImage=async(file)=>{
  return new Promise((resolve,reject) =>
  {
    const storage=getStorage(app)
    const filename= new Date().getTime() + file.name;
    const storageRef =ref(storage,filename)
    const uploadTask =uploadBytesResumable(storageRef,file);
    uploadTask.on(
      "state_changed",
      (snapshot)=>{
        const progress =(snapshot.bytesTransferred /snapshot.totalBytes)*100;
          console.log(`Upload is ${progress}% done`)
      },
      (error)=>{
        reject(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          resolve(downloadURL)
        });
      })
  })
 }
 const handleRemoveButton=(index)=>{
setFormdata({
  ...formdata,
  imageURLs:formdata.imageURLs.filter((_,i)=>
   i !==index
  )
  })

 }
 const handleChange =(e)=>{
  if(e.target.id=='sale'||e.target.id==='rent')
  {
    setFormdata({
       ...formdata,
       type:e.target.id
    })
  }
  if(e.target.id === 'parking'||
     e.target.id === 'furnished' ||
      e.target.id ==='offer')
   {
    setFormdata({
      ...formdata,
      [e.target.id]:e.target.checked
    })
   }
 if(e.target.type ==='number'  ||
    e.target.type ==='text' ||
    e.target.type === 'textarea' 
   )
    {
       setFormdata({
        ...formdata,
        [e.target.id]:e.target.value
       })

    }
 }

const handleSubmit= async(e)=>{
  e.preventDefault();
  try{
    if(formdata.imageURLs.length < 1)return setError('You must upload at least one image')
    if(+formdata.regularPrice < +formdata.discountPrice) return setError('Discount price must be lower than Regular price')
    setLoading(true);
    setError(false)
    const res = await fetch('/api/listing/create',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',

      },
      body:JSON.stringify({
        ...formdata,
      userRef:currentUser._id, 
      })

    })
    const data =  res.json();
    setLoading(false);
  if(data.success === false ){
    setError(data.message)
  }
  navigate(`/listing/${data._id}`)

  }catch(error)
  {
setError(error.message)
setLoading(false)
  }

}
 
//console.log(files)
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className="text-3xl font-semibold text-center gap-2 my-7">
        Create a Listing
      </h1>
     <form onSubmit={handleSubmit}className="flex flex-col sm:flex-row gap-4">
          <div className=" flex flex-col gap-4 flex-1">
                 <input value={formdata.name}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                        id="name"maxLength='62'
                        minLength='10'
                        required type="text "
                         placeholder="Name">

                  </input>
          <textarea   onChange={handleChange}
                     value={formdata.description}
                     className="border p-3 rounded-lg"
                      id="description" required 
                      type="text "
                       placeholder="Description">
          </textarea>
           <input     onChange={handleChange}
                     value={formdata.address}
                     className="border p-3 rounded-lg" 
                     id="address"
                     maxLength='62' 
                    required type="text "
                     placeholder="Address"
                     ></input>
      <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                   <input onChange={handleChange}
                          checked={formdata.type ==="sale"}
                           type="checkbox"
                            id="sale"
                             className="w-5"/>
                     <span>Sell</span>
              </div>
              <div className="flex gap-2">
                  <input type="checkbox"
                         onChange={handleChange}
                         checked={formdata.type ==="rent"}
                          id="rent"
                           className="w-5"/>
                    <span>Rent</span>
              </div>
              <div className="flex gap-2">
                  <input type="checkbox"
                        onChange={handleChange} 
                        checked={formdata.parking}
                        id="parking"
                        className="w-5"/>
                    <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                  <input type="checkbox"
                   onChange={handleChange}
                   checked={formdata.furnished}
                    id="furnished" className="w-5"/>
                    <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                  <input type="checkbox" 
                  onChange={handleChange}
                  checked={formdata.offer}  id="offer" className="w-5"/>
                    <span>Offer</span>
              </div>
             
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <input  onChange={handleChange}
                  value={formdata.bedrooms}
                  className="p-3 border border-gray-300 rounded-lg"type="number" id="bedrooms"
           min='1' max='10' required/>
          <p>Beds</p>
        </div>
        <div className="flex items-center gap-2">
          <input  onChange={handleChange} 
                  value={formdata.bathrooms}
                  className="p-3 border  border-gray-300 rounded-lg"
                  type="number"
                   id="bathrooms"
           min='1' max='10' required/>
          <p>Baths</p>
        </div>
        <div className="flex items-center gap-2">
          <input  onChange={handleChange}
                  value={formdata.regularPrice}
                  className="p-3 border   border-gray-300 rounded-lg"
                 type="number" 
                 id="regularPrice"
                 min='3000' max='100000' required/>
         <div className="flex  flex-col items-center">
         <p >Regular price</p>
         <span className="text-xs">  ₹/month</span>
        </div>
        </div>
        {formdata.offer &&
        (
        <div className="flex items-center gap-2">
          <input onChange={handleChange}
                 value={formdata.discountPrice}
                  className="p-3 border border-gray-300 rounded-lg"type="number" 
                  id="discountPrice" min='0' max='10000' required/>
         
         <div className="flex  flex-col items-center"> <p>Discounted price</p>
          <span className="text-xs">  ₹/month</span>
          </div>
        </div>)}
      </div>
          </div>
      <div className="flex flex-col flex-1 gap-4 ">
           <p className="font semibold">Images:
                 <span className="font-normal text-gray-600 ml-2 ">
                  The first will be the cover (max 6) 
                  </span>
          </p>
     <div className=" flex gap-4">
      <input onClick={(e)=>setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" 
                    id="images" accept='image/*' multiple/>
      <button disabled={uploading} type="button" onClick={handleImageButton}className="p-3 text-green-700 border rounded uppercase
                   hover:shadow-lg disabled:opacity:80 border-green-700 semibold" >{uploading ?"Uploading...":"Upload"}</button>

     </div>
     <p className="text-red-700 text-sm" > {imageUploadError && imageUploadError}</p>
   {
    formdata.imageURLs.length > 0 && formdata.imageURLs.map((urls,index)=>
    (
      <div
                key={urls}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={urls}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={()=>handleRemoveButton(index)}
                  className='p-3 text-red-700 rounded-lg text-sm hover:opacity-75'
                >
                  Delete
                </button>
              </div>
    ))
   }

     <button disabled={loading || uploading}className="p-3 bg-slate-700 text-white rounded-lg uppercase
         hover:opacity-95 disabled:opacity-80">{loading? 'Creating....' : 'Create Listing'}</button>
       {error &&<p className="text-red-700 text-sm">{error}</p>}
      </div>
    </form>
    </main>
  )
}
