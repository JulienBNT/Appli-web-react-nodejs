import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';

function Profile() {

    let { id } = useParams();
    console.log(id);
    const [user, setUser] = useState("")
    console.log("inside user",user);

    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/profileinfo/${id}`).then((response) => {
            setUser(response.data);
        });
    }, []);

    const editPassword = () => {
      let newPassword = prompt("Entrer nouveau mot de passe");
      axios.put(`http://localhost:3001/auth/password`, { 
        newPassword: newPassword, 
        id: id,
      },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      );
      setUser({ ...user, password: newPassword});
    }

  return (
    <div>
        <div>Nom:{user.lastname}</div>
        <div>prénom: {user.firstname}</div>
        <div>Email: {user.email}</div>
        <div>Téléphone: +33 {user.phone}</div>
         {/* <button onClick={() => {navigate('/changepassword')}}>Changer mot de passe</button> */}
         <button onClick={editPassword}>Changer le mdp</button>
    </div>
  )
}

export default Profile