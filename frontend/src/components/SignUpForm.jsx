import React, { useEffect, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
  FormFloating, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const SignUpForm = () => {
  const inputEl = useRef();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const validatePassword = (password) => (value) =>
    (value !== password ? t('errors.validation.matching_passwords') : undefined);

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object({
        username: yup
          .string()
          .min(3, t('errors.validation.username_length'))
          .max(20, t('errors.validation.username_length'))
          .required(t('errors.validation.required_field')),
        password: yup
          .string()
          .min(6, t('errors.validation.password_length'))
          .required(t('errors.validation.required_field')),
      })}
      onSubmit={({ username, password }, actions) => {
        axios
          .post(routes.signupPath(), { username, password })
          .then(({ data }) => {
            localStorage.setItem('user', JSON.stringify(data));
            console.log(data);
            logIn(data);
            navigate(routes.chatPagePath());
          })
          .catch((err) => {
            if (err.isAxiosError && err.response.status === 409) {
              actions.setFieldError('confirmPassword', t('errors.validation.account_already_exists'));
              inputEl.current.select();
              return;
            }
            throw err;
          });
      }}
    >
      {({ errors, values }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('registration_form.header')}</h1>
          <FormFloating className="mb-3">
            <FormControl
              isInvalid={errors.username}
              id="username"
              autoComplete="username"
              placeholder={t('errors.validation.username_length')}
              required
              name="username"
              type="text"
              as={Field}
              innerRef={inputEl}
            />
            <FormLabel htmlFor="username">{t('registration_form.username')}</FormLabel>
            {errors.username && (
              <div className="invalid-tooltip" placement="right">
                {errors.username}
              </div>
            )}
          </FormFloating>
          <FormFloating className="mb-3">
            <FormControl
              isInvalid={errors.password}
              id="password"
              autoComplete="new-password"
              placeholder={t('errors.validation.password_length')}
              required
              name="password"
              type="password"
              as={Field}
            />
            <FormLabel htmlFor="password" className="form-label">
              {t('registration_form.password')}
            </FormLabel>
            {errors.password && (
              <div className="invalid-tooltip" placement="right">
                {errors.password}
              </div>
            )}
          </FormFloating>
          <FormFloating className="mb-4">
            <FormControl
              validate={validatePassword(values.password)}
              isInvalid={errors.confirmPassword}
              id="confirmPassword"
              autoComplete="new-password"
              placeholder={t('errors.validation.matching_passwords')}
              required
              name="confirmPassword"
              type="password"
              as={Field}
            />
            <FormLabel htmlFor="confirmPassword" className="form-label">
              {t('registration_form.confirm_password')}
            </FormLabel>
            {errors.confirmPassword && (
              <div className="invalid-tooltip" placement="right">
                {errors.confirmPassword}
              </div>
            )}
          </FormFloating>
          <Button variant="outline-primary" className="w-100" type="submit">
            {t('registration_form.btn_register')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
