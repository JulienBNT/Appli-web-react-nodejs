import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import{ useNavigate } from 'react-router-dom';

function CreateObject() {

    let navigate = useNavigate();

    const initialValues = {
        objectname: "",
        description: "",
        stock: "",
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/objects", data, {
            headers: { accessToken: localStorage.getItem("accessToken")},
        })
        .then((response) => {
            navigate('/');
    });
    };

    const validationSchema = Yup.object().shape({
        objectname: Yup.string().required(),
        description: Yup.string().required(),
        stock: Yup.number().required(),
    });

  return (
    <div className='createObjectPage'> 
        <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
        >

            <Form>
                <label>L'Objet </label>
                <ErrorMessage name="objectname" component="span" />
                <Field
                autocomplete="off"
                id="inputCreateObject" 
                name="objectname" 
                placeholder="(Ex. kettlebell...)"
                />

                <label>Description: </label>
                <ErrorMessage name="description" component="span" />
                <Field
                autocomplete="off"
                id="inputCreateObject" 
                name="description" 
                placeholder="(Ex. C fait en plastique tqt...)"
                />

                <label>Stock: </label>
                <ErrorMessage name="stock" component="span" />
                <Field
                autocomplete="off"
                id="inputCreateObject" 
                name="stock" 
                placeholder="(Ex. 5...)"
                />

                <button type='submit'>Créer Objet</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreateObject