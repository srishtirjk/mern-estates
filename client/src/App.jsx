
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Profile from "./pages/Profile.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/signUp.jsx"
import Header from "./components/header"

export default function App() {
  return( <BrowserRouter>
 
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signin" element={<SignIn/>}/> 
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/profile" element={<Profile/>}/>
  </Routes>

    </BrowserRouter>
  )
  
}
 