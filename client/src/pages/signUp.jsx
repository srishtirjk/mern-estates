import { Link } from "react-router-dom"
export default function SignOut() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold
      my-7">SignUp
      </h1>
      <form className="flex flex-col gap-4">
        <input type="text" id="username" placeholder="username" className=" text-border p-3 rounded-lg" />
        <input type="password" id="password" placeholder="password" className="border p-3 rounded-lg" />
        <input type="email" id="email" placeholder="email" className="border p-3 rounded-lg" />
        <button className="bg-slate-700  text-white p-3 rounded-lg 
     disable:opacity-80 uppercase hover:opacity-95">SignUp</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700"> Sign in</span>
        </Link>
      </div>
    </div>
  )
}
