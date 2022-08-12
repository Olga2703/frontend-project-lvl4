import React from 'react';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import avatar from '../assets/avatar.jpg';

const LoginPage = () => (
    <div className="container">
        <div className="row">
            <div className="col-6">
                <img src={avatar} alt="avatar" className="rounded-circle" />
            </div>
            <Formik
                initialValues = { {
                  login: '',
                  password: '',
                }}
            >

               {() => (
                <Form>
                    <Field type='name' name='login' placeholder="Ваш ник" />
                    <Field type='password' name='password' placeholder="Пароль" />
                    <button type='submit'>Войти</button>
                </Form>
               )
               }
            </Formik>
        </div>
        <div className="row">

        </div>
    </div>
);

export default LoginPage;
