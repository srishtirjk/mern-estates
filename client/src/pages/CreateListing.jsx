import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { app } from "../firebase";
export default function CreateListing() {
  const [files,setFiles]=useState([])
  const[formdata,setFormdata]=useState({
    imageURLs:[],
  })
console.log(formdata)
const handleImageButton=()=>{
                if(files.length > 0 && files.length < 7)
          {
            const promises =[]
          for(let i=0;i<files.length;i++)
          {
             promises.push(storeImage(files[i]));
          }
         Promise.all(promises).then((urls)=>{
       setFormdata({ ...formdata,imageURLs:formdata.imageURLs.concat(urls)})
 
 });

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
      }


    )

  })
 }
//console.log(files)
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className="text-3xl font-semibold text-center gap-2 my-7">
        Create a Listing
      </h1>
     <form className="flex flex-col sm:flex-row gap-4">
          <div className=" flex flex-col gap-4 flex-1">
                 <input className="border p-3 rounded-lg" id="name"maxLength='62'
                    minLength='10' required type="text " placeholder="Name"></input>
          <textarea className="border p-3 rounded-lg" id="description" required 
               type="text " placeholder="Description"></textarea>
           <input className="border p-3 rounded-lg" id="address"maxLength='62' 
               required type="text " placeholder="Address"></input>
      <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                   <input type="checkbox" id="sale" className="w-5"/>
                     <span>Sell</span>
              </div>
              <div className="flex gap-2">
                  <input type="checkbox" id="rent" className="w-5"/>
                    <span>Rent</span>
              </div>
              <div className="flex gap-2">
                  <input type="checkbox" id="parking" className="w-5"/>
                    <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                  <input type="checkbox" id="furnished" className="w-5"/>
                    <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                  <input type="checkbox" id="offer" className="w-5"/>
                    <span>Offer</span>
              </div>
             
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <input className="p-3 border border-gray-300 rounded-lg"type="number" id="bedrooms"
           min='1' max='10' required/>
          <p>Beds</p>
        </div>
        <div className="flex items-center gap-2">
          <input className="p-3 border border-gray-300 rounded-lg"type="number" id="bathrooms"
           min='1' max='10' required/>
          <p>Baths</p>
        </div>
        <div className="flex items-center gap-2">
          <input className="p-3 border border-gray-300 rounded-lg"type="number" 
          id="regularPrice" min='1' max='10' required/>
         <div className="flex  flex-col items-center">
         <p >Regular price</p>
         <span className="text-xs">  ₹/month</span>
        </div>
        </div>
        <div className="flex items-center gap-2">
          <input className="p-3 border border-gray-300 rounded-lg"type="number" 
          id="discountedPrice" min='1' max='10' required/>
         
         <div className="flex  flex-col items-center"> <p>Discounted price</p>
          <span className="text-xs">  ₹/month</span>
          </div>
        </div>
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
      <button type="button" onClick={handleImageButton}className="p-3 text-green-700 border rounded uppercase
                   hover:shadow-lg disabled:opacity:80 border-green-700">Upload</button>

     </div>
     <button className="p-3 bg-slate-700 text-white rounded-lg uppercase
         hover:opacity-95 disabled:opacity-80">Create Listing</button>
 
      </div>
    </form>
    </main>
  )
}
