import Logo from '../../assets/Images/olx-logo.png';
import './Login.css';
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const handleLogin = async (e) =>{
    e.preventDefault()

    try {
      const response= await fetch("http://localhost:8000/login/",{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          
      }),
    })
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("acessToken", data.token);
      
      
      localStorage.setItem("username",data.user)
      navigate("/");
    } else {
      const data = await response.json();
      setError(data.detail || "Login failed. Please try again.");
    }
  } catch (err) {
    setError("An error occurred. Please try again later.");
  }
  };


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}> 
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
          {error && <p>{error}</p>}
          <button type='submit'>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
