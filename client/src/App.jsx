
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Profile from "./pages/Profile.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/signUp.jsx"
import Header from "./components/header"
import PrivateRoute from './components/privateRoute.jsx'
import CreateListing from './pages/CreateListing.jsx'
import EditListing from './pages/EditListing.jsx'
import Listing from './pages/Listing.jsx'
import Search from './pages/Search.jsx'
 


export default function App() {
  return( 
  <BrowserRouter>
 
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signin" element={<SignIn/>}/> 
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/listings/:listingId" element={<Listing/>}/>
   <Route path='/search' element={<Search/>}></Route>
    <Route element={<PrivateRoute></PrivateRoute>}>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/create-listing" element={<CreateListing/>}/>
    <Route path="/update-listing/:listingId" element={<EditListing></EditListing>}/>
    
    </Route>
  </Routes>

    </BrowserRouter>
  )
  
}
 