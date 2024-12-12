import Home from "./Pages/Home/Home"
import Login from '.././src/Pages/Login/Login'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Signup from "./Pages/Signup/Signup"
import Sell from "./Pages/Sell/Sell"


function App() {


  return (
    <>
    
    <Routes>
      
      <Route  path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/sell" element={<Sell/>} />
    </Routes>
    </>
  )
}

export default App
