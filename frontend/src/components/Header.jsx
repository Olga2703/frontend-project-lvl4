import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import routes from '../routes';

const Header = () => {
  const { t } = useTranslation();
  const AuthButton = () => {
    const auth = useAuth();
    return auth.user
      && <Button href={routes.loginPagePath()} onClick={auth.logOut}>
           {t('navbar.btn_out')}
         </Button>;
  };
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand href="/">{t('navbar.header')}</Navbar.Brand>
        <AuthButton />
      </div>
    </Navbar>
  );
};

export default Header;
