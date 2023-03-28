import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function Users() {


  let { id } = useParams();
  const [user, setUser] = useState("")
  
  const [listOfObjects, setListOfObjects] = useState([]);

  const [listOfUsers, setListOfUsers] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/auth").then((response) => {
      setListOfUsers(response.data)
    });

    axios.get("http://localhost:3001/objects").then((response) => {
      setListOfObjects(response.data)
    });
  }, []);

  



  // const modifyFirstname = () => {
  //   const newFirstname = prompt("Entrer nouveau prénom");
  //   axios.put(`http://localhost:3001/auth/firstname`, { 
  //     newFirstname: newFirstname, 
  //     id: id,
  //   },
  //   {
  //     headers: { accessToken: localStorage.getItem("accessToken") },
  //   }
  //   );
  //   setUser({ ...user, firstname: newFirstname});
  // }

  // const modifyLastname = () => {
  //   let newLastname = prompt("Entrer nouveau nom");
  // }

  // const modifyPhone = () => {
  //   let newPhone = prompt("Entrer nouveau téléphone");
  // }

  // const modifyEmail = () => {
  //   let newEmail = prompt("Entrer nouveau email");
  // }

  // const modifyPassword = () => {
  //   // let newPassword = prompt("Entrer nouveau mot de passe");
  //   // axios.put(`http://localhost:3001/auth/password`, { 
  //   //   newPassword: newPassword, 
  //   //   id: id,
  //   // },
  //   // {
  //   //   headers: { accessToken: localStorage.getItem("accessToken") },
  //   // }
  //   // );
  //   // setUser({ ...user, password: newPassword});
  // }

  return (
    <div>
      {listOfUsers.map((value, key) => {
        return (
          <div key={key}>
            <div className="firstname">
              {value.firstname} 
            </div>

            <div className="lastname"> 
              {value.lastname} 
            </div>

            <div className="phone">
              {value.phone} 
            </div>

            <div className="email"> 
              {value.email} 
            </div>
            <button onClick={ () => {navigate(`/modifusers/${value.id}`)}}>Aller à l'utilisateur</button>
            <hr></hr>
          </div>
        )
      })}

{listOfObjects.map((value, key) => {
      return (
        <div key={key}>
          <div className="objectName"> {value.objectname} </div>
          <div className="description"> {value.description} </div>
          <div className="stock"><p> stock: {value.stock}</p></div>
          <button onClick={ () => {navigate(`/modifobjects/${value.id}`)}}>Aller à l'objet</button>
        </div>
      );
    })}
    </div>




  )
}

export default Users