import Home from "./Pages/Home/Home"
import Login from '.././src/Pages/Login/Login'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Signup from "./Pages/Signup/Signup"
import Sell from "./Pages/Sell/Sell"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"


function App() {


  return (
    <>
    
    <Routes>
      
      <Route  path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/sell" element={<Sell/>} />
      <Route path="/product" element={<ProductDetails/>} />
      <Route path="/product-details/:id" element={<ProductDetails/>} />
    </Routes>
    </>
  )
}

export default App
