import { useState } from 'react';
import Logo from '../../assets/Images/olx-logo.png';
import './Signup.css';
import {Link, useNavigate} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css'; 

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.detail || "Signup failed. Please try again.");
 
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
   
    }
  };

  return (


    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSignup}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
         
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
            
          />
          <br />
          <br />
          {error && <p className='error'>{error}</p>}
          <button type='submit'>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
