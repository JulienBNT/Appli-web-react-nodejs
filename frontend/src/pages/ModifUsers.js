import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ModifUsers() {

    let { id } = useParams();
    console.log(id);

    const [user, setUser] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/profileinfo/${id}`).then((response) => {
          setUser(response.data)
        });
    }, []);



    const modifyFirstname = () => {
        const newFirstname = prompt("Entrer nouveau prénom");
        axios.put(`http://localhost:3001/auth/firstname`, { 
            newFirstname: newFirstname, 
            id: id,
        },
        {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }
        );
        setUser({ ...user, firstname: newFirstname});
    }

    // Fonction avec requête put pour modifier le prénom

    const modifyLastname = () => {
        const newLastname = prompt("Entrer nouveau nom");
        axios.put(`http://localhost:3001/auth/lastname`, { 
            newLastname: newLastname, 
            id: id,
        },
        {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }
        );
        setUser({ ...user, lastname: newLastname});
    }

    // Fonction avec requête put pour modifier le nom

    const modifyPhone = () => {
        const newPhone = prompt("Entrer nouveau téléphone");
        axios.put(`http://localhost:3001/auth/phone`, { 
            newPhone: newPhone, 
            id: id,
        },
        {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }
        );
        setUser({ ...user, phone: newPhone});
    }

    // Fonction avec requête put pour modifier le téléphone

    const modifyEmail = () => {
        const newEmail = prompt("Entrer nouveau email");
        axios.put(`http://localhost:3001/auth/email`, { 
            newEmail: newEmail, 
            id: id,
        },
        {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }
        );
        setUser({ ...user, email: newEmail});
    }

  return (
          <div>
            <div className="firstname">
              {user.firstname}
              <button onClick={modifyFirstname}>Modifier Prénom</button>
            </div>

            <div className="lastname"> 
              {user.lastname}
              <button onClick={modifyLastname}>Modifier Nom</button>
            </div>

            <div className="phone">
              {user.phone}
              <button onClick={modifyPhone}>Modifier Téléphone</button>
            </div>

            <div className="email"> 
              {user.email}
              <button onClick={modifyEmail}>Modifier Email</button>
            </div>
          </div>
  )
}

export default ModifUsers