import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {

  let navigate = useNavigate;

  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Champ requis"),
    lastname: Yup.string().required("Champ requis"),
    phone: Yup.number().required("Champ requis"),
    email: Yup.string().required("email invalide"),
    password: Yup.string().min(8).max(20).required("mdp invalide"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    })
  };

  return (
    <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
        >

            <Form>

                <label>Prénom</label>
                <ErrorMessage name="objectname" component="span" />
                <Field
                autocomplete="off"
                id="inputCreateObject" 
                name="firstname" 
                placeholder="Jean"
                />

                <label>Nom</label>
                <ErrorMessage name="objectname" component="span" />
                <Field
                autocomplete="off"
                id="inputCreateObject" 
                name="lastname" 
                placeholder="Jaurès"
                />

                <label>Téléphone</label>
                <ErrorMessage name="objectname" component="span" />
                <Field
                autocomplete="off"
                id="inputCreateObject" 
                name="phone" 
                placeholder="06 36 63..."
                />

                <label>Email</label>
                <ErrorMessage name="objectname" component="span" />
                <Field
                autocomplete="off"
                id="inputCreateObject" 
                name="email" 
                placeholder="jeanpierre@gmail.com"
                />

                <label>Mot De Passe</label>
                <ErrorMessage name="description" component="span" />
                <Field
                autocomplete="off"
                type="password"
                id="inputCreateObject" 
                name="password" 
                placeholder="Ton MDP"
                />

                <button type='submit'>Valider</button>
            </Form>
        </Formik>
  )
}

export default Registration