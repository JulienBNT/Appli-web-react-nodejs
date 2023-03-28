import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

    // function saveBasket(basket){
    //     localStorage.setItem("basket", JSON.stringify(basket));
    // }

    // // permet d'enregistrer le panier dans le localstorage
    // // le paramètre basket permet de dire à la fonction ce que l'on va entegistrer (basket)
    // // le localstorage est une API dans le navigateur qui permet de conserver les données, la clé est "basket" et la valeur est basket
    // // permet aussi de conserver les données

    // function getBasket() {
    //     let basket = localStorage.getItem("basket");
    //     if (basket == null){
    //         return [];
    //     } else {
    //         return JSON.parse(basket);
    //     } 
    // }

    // // fonction qui permet de récupérer l'item portant la clé "basket"

    // function addBasket(product) {
    //     let basket = getBasket();
    //     // on récupère le panier qui existe dans le localstorage
    //     let foundProduct = basket.find(p => p.id == product.id);
    //     if (foundProduct != undefined){
    //         foundProduct.quantity++;
    //     } else {
    //         product.quantity = 1;
    //     }
    //     basket.push(product);
    //     // on lui ajoute le produit
    //     saveBasket(basket);
    //     // on enregistre le nouveau panier
    // }

    // // fonction d'ajout au panier

    // function removeFromBasket(product){
    //     let basket = getBasket();
    //     basket = basket.filter(p => p.id != product.id)
    //     saveBasket(basket);
    // }

    // // fonction pour retirer un produit

    // function changeQuantity(product, quantity){
    //     let basket = getBasket();
    //     let foundProduct = basket.find(p => p.id == product.id);
    //     if (foundProduct != undefined){
    //         foundProduct.quantity += quantity;
    //         if (foundProduct.quantity <= 0){
    //             removeFromBasket(foundProduct);
    //         } else {
    //             saveBasket(basket);
    //         }
    //     }
    //     saveBasket(basket)
    // }

    // function getNumberProduct(){
    //     let basket = getBasket();
    //     let number = 0;
    //     for(let product of basket){
    //         number += product.quantity;
    //     }
    //     return number;
    // }

    // function getTotalPrice(){
    //     let basket = getBasket();
    //     let total = 0;
    //     for(let product of basket){
    //         total += product.quantity * price;
    //     }
    //     return total;
    // }

function ShoppingCart() {

    let navigate = useNavigate();

    let list = JSON.parse(localStorage.getItem("basket")); // permet d'analyser les données du basket du localstorage
    let length = list.length; // taille/longueur de list
    let listOfObjects = [];
    let object = [];


    const clearBasket = () => {
        list = [];
        localStorage.clear(listOfObjects);
        navigate("/");
    };

    // permet de vider le panier et redirige au début


    const validateBasket = () => {
        list = [];
        listOfObjects.map((value) => {

            let id = value.id;
            let newStock = value.stock - value.quantity;
            object.push({id: value.id, newStock: newStock,});
            localStorage.setItem("newStock", JSON.stringify(object));

            axios.put('http://localhost:3001/objects/stock', {
                id: id,
                newStock: newStock,
            },
            // requète put pour assigner au stock sa nouvelle valeur de stock
            {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
            });
            
            localStorage.clear(listOfObjects); // nettoie le localstorage
            navigate("/"); // redirige au début
        })
    }

    // permet de valider le panier et d'assigner un nouveau stock aux objets concernés
    // vide le localstorage 

    for (var i = 0; i < length; i++) {
        if (list[i].stock > 0) {
            listOfObjects.push(list[i]);
        }
    // permet de retourner les objets que l'utilisateur a rajouté au panier
      }
    
  return (
    <div>
        <div>ShoppingCart</div>
        <div>
        {listOfObjects.map((value, key) => {
              return (
                <div key={key}>
                    <div>{value.objectname}</div>
                    <div>{value.description}</div>
                    <div>{value.objectname}</div>
                    <div>{value.quantity}</div>

                </div>
              )
        })}
            <button onClick={ clearBasket }>Annuler</button>
            <button onClick={ validateBasket }>Valider</button>
        </div>

        </div>
  )
}

export default ShoppingCart
