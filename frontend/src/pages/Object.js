import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Object() {
  let { id } = useParams()

  const [postObjects, setPostObjects] = useState({
  });

  let navigate = useNavigate

    useEffect(() => {
        axios.get(`http://localhost:3001/objects/byId/${id}`).then((response) => {
          setPostObjects(response.data)
        });
      });
      // fonction qui récupère un objet en fonction de l'ID

      const deleteObject = (id) => {
        axios.delete(`http://localhost:3001/objects/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken")},
        }).then(() => {
          navigate("/");
        })
      }

      // fonction qui exécute une requète delete qui supprime un élément (ici un objet sélectionné)

  return (
    <div className='objectdesc'>
      <div className='test'>{postObjects.objectname}</div>
      <div className='tes2'>{postObjects.description}</div>
      <div className='test3'>{postObjects.stock}</div>
      <button onClick={() => {deleteObject(postObjects.id)}}>Supprimer Objet</button>
    </div>
  )
}

export default Object
