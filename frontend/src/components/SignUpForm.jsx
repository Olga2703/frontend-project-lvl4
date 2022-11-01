import React, { useEffect, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormFloating, FormControl, FormLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const SignUpForm = () => {
  const inputEl = useRef();
  const navigate = useNavigate();
  const { logIn } = useAuth();

  useEffect(() => {
    inputEl.current.focus();
  }, []);
  const validatePassword = (password) => (value) => (value !== password ? 'Пароли должны совпадать' : undefined);

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object({
        username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
        password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
      })}
      onSubmit={({ username, password }, actions) => {
        axios
          .post(routes.signupPath(), { username, password })
          .then(({ data }) => {
            localStorage.setItem('userId', JSON.stringify(data));
            console.log(data);
            logIn();
            navigate(routes.chatPagePath());
          })
          .catch((err) => {
            if (err.isAxiosError && err.response.status === 409) {
              actions.setFieldError('confirmPassword', 'Такой пользователь уже существует');
              inputEl.current.select();
              return;
            }
            throw err;
          });
      }}>
      {({ errors, values }) => (
        <Form className='w-50'>
          <h1 className='text-center mb-4'>Регистрация</h1>
          <FormFloating className='mb-3'>
            <FormControl
              isInvalid={errors.username}
              id='username'
              autoComplete='username'
              placeholder='От 3 до 20 символов'
              required
              name='username'
              type='text'
              as={Field}
              innerRef={inputEl}
            />
            <FormLabel htmlFor='username'>Имя пользователя</FormLabel>
            {errors.username && (
              <div className='invalid-tooltip' placement='right'>
                {errors.username}
              </div>
            )}
          </FormFloating>
          <FormFloating className='mb-3'>
            <FormControl
              isInvalid={errors.password}
              id='password'
              autoComplete='new-password'
              placeholder='Не менее 6 символов'
              required
              name='password'
              type='password'
              as={Field}
            />
            <FormLabel htmlFor='password' className='form-label'>
              Пароль
            </FormLabel>
            {errors.password && (
              <div className='invalid-tooltip' placement='right'>
                {errors.password}
              </div>
            )}
          </FormFloating>
          <FormFloating className='mb-4'>
            <FormControl
              validate={validatePassword(values.password)}
              isInvalid={errors.confirmPassword}
              id='confirmPassword'
              autoComplete='new-password'
              placeholder='Пароли должны совпадать'
              required
              name='confirmPassword'
              type='password'
              as={Field}
            />
            <FormLabel htmlFor='confirmPassword' className='form-label'>
              Подтвердите пароль
            </FormLabel>
            {errors.confirmPassword && (
              <div className='invalid-tooltip' placement='right'>
                {errors.confirmPassword}
              </div>
            )}
          </FormFloating>
          <Button variant='outline-primary' className='w-100' type='submit'>
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
