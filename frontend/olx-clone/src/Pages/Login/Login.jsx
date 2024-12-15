import Logo from '../../assets/Images/olx-logo.png';
import './Login.css';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken){
      navigate("/")
    }
  },[navigate])
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store access and refresh tokens in localStorage
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("username", data.user);

        console.log("Login successful:", data);
        navigate("/"); // Redirect to the homepage
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
          <label htmlFor="fname">username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}

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
