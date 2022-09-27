import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import routes from '../routes.js';
import { AuthContext } from '../context/index.js';
import { useAuth } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        getAuthHeader,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className='d-flex flex-column h-100'>
        <Header />
        <Routes>
          <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
            <Route path='' element={<PrivatePage />} />
          </Route>
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
