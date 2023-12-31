import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInSuccess, signInStart } from "../../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
export default function SignIn() {
  const [formdata, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
    console.log(formdata)
    console.log(error)
    console.log(loading)

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //it is for to prevent refresh page while we submit form

    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      })
      const data = await res.json();
      console.log(data);
      // we change response into json
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      console.log(data)
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold
      my-7">SignIn
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" id="email" onChange={handleChange} placeholder="email" className="border p-3 rounded-lg" />
        <input type="password" id="password" onChange={handleChange} placeholder="password" className="border p-3 rounded-lg" />


        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth /></form>
      <div className="flex gap-2 mt-5">
        <p> Dont have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700"> Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
