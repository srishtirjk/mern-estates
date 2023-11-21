
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import Profile from "./pages/profile"
import SignIn from "./pages/signIn"
import SignOut from "./pages/signout"
import Header from "./components/header"
export default function App() {
  return( <BrowserRouter>
 
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>

    <Route path="/sign-in" element={<SignIn/>}/> 
    <Route path="/sign-out" element={<SignOut/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/profile" element={<Profile/>}/>
  </Routes>

    </BrowserRouter>
  )
  
}
 