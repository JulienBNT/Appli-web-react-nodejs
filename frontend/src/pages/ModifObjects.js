import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ModifObjects() {

    let { id } = useParams();
    console.log(id);

    const [object, setObject] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/objects/byId/${id}`).then((response) => {
          setObject(response.data)
        });
    }, []);

    const modifyObjectname = () => {
        const newObjectname = prompt("Entrer nouveau nom objet");
        axios.put(`http://localhost:3001/objects/objectname`, { 
            newObjectname: newObjectname, 
            id: id,
        },
        {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }
        );
        setObject({ ...object, lastname: newObjectname});
    }

    const modifyDescription = () => {
        const newDescription = prompt("Entrer nouveau nom objet");
        axios.put(`http://localhost:3001/objects/description`, { 
            newDescription: newDescription, 
            id: id,
        },
        {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }
        );
        setObject({ ...object, lastname: newDescription});
    }

    const modifyStock = () => {
        const newStock = prompt("Entrer nouveau nom objet");
        axios.put(`http://localhost:3001/objects/stock`, { 
            newStock: newStock, 
            id: id,
        },
        {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }
        );
        setObject({ ...object, lastname: newStock});
    }





  return (
    <div>
            <div className="firstname">
              {object.objectname}
              <button onClick={modifyObjectname}>Modifier Nom Objet</button>
            </div>

            <div className="lastname"> 
              {object.description}
              <button onClick={modifyDescription}>Modifier Description</button>
            </div>

            <div className="phone">
              {object.stock}
              <button onClick={modifyStock}>Modifier Stock</button>
            </div>
          </div>
  )
}

export default ModifObjects