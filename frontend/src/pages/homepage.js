import './homepage.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Homepage() {

  const [listOfObjects, setListOfObjects] = useState([]);
  let navigate = useNavigate()

  let list = JSON.parse(localStorage.getItem("cart"));

  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    role: "",
    status: false,
  })


  useEffect(() => {
    axios.get("http://localhost:3001/objects").then((response) => {
      setListOfObjects(response.data)
    });

  }, []);

  function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  // permet d'enregistrer le panier dans le localstorage
  // le paramètre basket permet de dire à la fonction ce que l'on va enregistrer (basket)
  // le localstorage est une API dans le navigateur qui permet de conserver les données, la clé est "basket" et la valeur est basket
  // permet aussi de conserver les données

  function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      return [];
    } else {
      return JSON.parse(basket);
    }
  }

  // fonction qui permet de récupérer l'item portant la clé "basket"

  let amount = 0;
  let quantity = 0;

  return (
    <div>
      {listOfObjects.map((value, key) => {
        // map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
        const addBasket = () => {


          let basket = getBasket();
          console.log(basket);
          let foundValue = basket.find((p) => p.id === value.id); // permet de trouver sur quel objet on a cliqué 
          if (foundValue !== undefined) { // si il y a une valeur de stock
            foundValue.quantity++;
            if (foundValue.quantity > value.stock) { // si quantité supérieure au stock
              foundValue.quantity = value.stock;
            }
            localStorage.setItem(value.id, foundValue.quantity); // met à jour value.id avec l'élément foundValue.quantity
          } else {
            value.quantity = 1;
            basket.push(value); // rajoute des éléments dans un tableau et le retourne
            localStorage.setItem(value.id, value.quantity); // met à jour value.id avec l'élément value.quantity
          }
          saveBasket(basket);
          quantity = JSON.parse(localStorage.getItem(value.id));
          //   let basket = getBasket();

          //   let valueBasket = basket.find((p) => p.id === value.id);
          //   if(valueBasket !== undefined) {
          //       valueBasket.amount++;

          //     if(valueBasket.amount > value.stock){
          //       valueBasket.amount = value.stock;
          //     }

          //   localStorage.setItem(value.id, valueBasket.amount);

          //   } else {
          //     value.amount = 1;
          //     basket.push(amount);
          //     localStorage.setItem(value.id, value.amount);
          //   }

          // saveBasket(basket);
          // amount = JSON.parse(localStorage.getItem(value.id));
          // console.log(amount);
          // console.log(basket);
          // console.log(value.id);
        };



        return (
          <div className='background'>
            <div key={key} className="objects">
              <div className="objectName" onClick={() => { navigate(`/object/${value.id}`) }}> {value.objectname} </div>
              <div className="description"> {value.description} </div>
              <div className="stock"><p> stock: {value.stock}</p></div>
              <button onClick={addBasket}>Ajouter au panier</button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Homepage