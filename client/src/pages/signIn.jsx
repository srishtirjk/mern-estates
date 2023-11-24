import { Link ,useNavigate } from "react-router-dom"
import { useState } from "react";
export default function SignIn() {
  const [formdata,setFormData]=useState({});
  const [error,setError]=useState(null)
  const[loading,setLoading]=useState(false)
  const navigate =useNavigate();
  const handleChange=(e)=>{
 setFormData({
   ...formdata,
   [e.target.id]: e.target.value,
 });
 console.log(formdata) 
 console.log(error)
 
}
  const handleSubmit= async (e)=>{
    e.preventDefault();
    //it is for to prevent refresh page while we submit form
    
    try{setLoading(true)
    const res = await fetch('/api/auth/signin',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formdata),
    })
    const data= await res.json();
    // we change response into json
    if(data.success===false){
      setError(data.message);
      setLoading(false)
      return;
    }
    setLoading(false);
    setError(null);
    console.log(data)
    navigate('/home');
  }
  catch(error){
    setLoading(false);
    setError(error.message)
    
  }
  }
  ;
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold
      my-7">SignIn
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       <input type="email" id="email" onChange={handleChange} placeholder="email" className="border p-3 rounded-lg" />
        <input type="password" id="password" onChange={handleChange}  placeholder="password" className="border p-3 rounded-lg" />
       
        <button disabled={loading}className="bg-slate-700  text-white p-3 rounded-lg 
     disable:opacity-80 uppercase hover:opacity-95">{loading ? 'Loading...':'SignIn'}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p> Dont have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700"> Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
