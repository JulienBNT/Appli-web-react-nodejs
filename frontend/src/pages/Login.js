import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext)

  let navigate = useNavigate();

  const login = () => {
    const data = {email: email, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
      alert(response.data.error);
      } else {
        console.log("myresponse",response.data)
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);

        setAuthState({ email: response.data.email, id: response.data.id, status: true });
        navigate("/");
      }
    });
  };

  return (
    <div>

      <input 
      type="text" 
      onChange={(event) => {
        setEmail(event.target.value);
        }}
        />

      <input 
      type="password" 
      onChange={(event) => {
        setPassword(event.target.value);
        }}
      />

      <button onClick={login}>Se connecter</button>
    </div>
  )
}

export default Login