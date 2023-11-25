import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.jsx'
// import { fileUploadError } from 'react-icons/fa'

export default function Profile() {
  const [file, setFile] = useState(undefined)
  const [ filePerc,setFilePerc] = useState(0)
  const [fileUploadError,setFileUploadError]=useState(false)
  const[formdata,setFormdata]=useState({})
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
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

  },
    [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app)

    //app from firebase
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
      (snapshot) => {
        //snapshot every changes on file 
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError( true,error)

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
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className=' gap-4 flex flex-col'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef}
         hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} className=' self-center mt-2
         rounded-full h-24 cursor-pointer object-cover w-24' alt="profile"
          src={formdata.avatar||currentUser.avatar}/>

         <p className='text-sm self-center'>{
         fileUploadError ?<span className='text-red-700'>Error Image Upload(image must be less than 2mb)
         </span>:
         filePerc>0  && filePerc<100 ?
         (
          <span className='text-slate-700'>{`Uploading${filePerc}`}</span>
          )
          :
          (filePerc===100 ?
          (
            <span className='text-green-700'>Image successfully uploaded</span>
            )
            :""
          )
          }
         </p>
        <input type="text" id="username" placeholder='username' className='border p-3 rounded-lg' />
        <input type="text" id="email" placeholder='email' className='border p-3 rounded-lg' />
        <input type="text" id="password" placeholder='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='cursor-pointer text-red-700'>Delete Account</span>
        <span className='cursor-pointer text-red-700'>Sign Out</span>

      </div>
    </div>
  )
}
