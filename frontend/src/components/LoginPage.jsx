import React from 'react';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import avatar from '../assets/avatar.jpg';

const LoginPage = () => (
    <div className="container-fluid h-100 mt-5">
        <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                    <div className="card-body row p-5">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <img src={avatar} alt="avatar" className="rounded-circle" />
                        </div>
                        <Formik
                            initialValues = { {
                              login: '',
                              password: '',
                            }}
                        >
                        {() => (
                            <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                                <h1 className="text-center mb-4">Войти</h1>
                                <Field type='name' name='login' placeholder="Ваш ник" className="form-floating mb-4"/>
                                <Field type='password' name='password' placeholder="Пароль" />
                                <button type='submit'>Войти</button>
                            </Form>)
                        }
                        </Formik>
                    </div>
                </div>

            </div>

        </div>
        <div className="row">

        </div>
    </div>
);

export default LoginPage;
