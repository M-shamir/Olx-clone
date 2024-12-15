
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import './Header.css'
import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

function Header() {
  const [isAuthenticated,setIsAuthenticated]= useState(false)
  const navigate =  useNavigate()
  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken)
  },[])
  const handleLogout =()=>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    navigate("/");
  }
  return (
   <>
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text"  value="India"/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div  className="loginPage">
        {
          !isAuthenticated?(<Link to="/login">Login</Link>):
          (<>
        <p onClick={handleLogout}>Logout</p>
          </>
       ) }
          <hr />
        </div>

        <Link to="/sell" className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </Link>
      </div>
    </div>

   </>
  )
}

export default Header
