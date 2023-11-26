
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase.jsx"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../../redux/user/userSlice.js"
import {useNavigate} from "react-router-dom"

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth , provider)

      const res = await fetch ('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();

      dispatch(signInSuccess(data))
      alert('same')
      navigate('/');
      //getAuth() is also coming from firebase/auth
    } catch (error) {
      console.log('could not sign-in with google', error)

    }

  };
  return (

    <button onClick={handleGoogle} type="submit" className="bg-red-700 w-800 text-white p-3 rounded-lg
     uppercase hover:opacity-95">  Continue with Google </button>

  )
}
// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// import { app } from '../firebase.jsx';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../../redux/user/userSlice.js';
// import { useNavigate } from 'react-router-dom';

// export default function OAuth() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleGoogleClick = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const auth = getAuth(app);

//       const result = await signInWithPopup(auth, provider);

//       const res = await fetch('/api/auth/google/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: result.user.displayName,
//           email: result.user.email,
//           photo: result.user.photoURL,
//         }),
//       });
//       const data = await res.json();
//       dispatch(signInSuccess(data));
//       navigate('/');
//     } catch (error) {
//       console.log(' could not sign in with google', error);
//     }
//   };
//   return (
//     <button
//       onClick={handleGoogleClick}
//       type='button'
//       className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
//     >
//       Continue with google
//     </button>
//   );
// }
