
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import './Header.css'
import { useEffect, useState } from 'react';

function Header() {
  const [isLoggedIn,setIsLoggedIn] =useState(false)
  useEffect(()=>{
    const token = localStorage.getItem('acessToken')
    setIsLoggedIn(!!token)
  },[])
  const handleAuthClick = ()=>{
    if (isLoggedIn){
      localStorage.removeItem('acessToken')
      setIsLoggedIn(false)
    }else{
      window.location.href = '/'
    }
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
        <div onClick={handleAuthClick} className="loginPage">
        {isLoggedIn ? 'Logout' : 'Login'}
          <hr />
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>

   </>
  )
}

export default Header
