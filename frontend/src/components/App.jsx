import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import Registration from './Registration.jsx';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import AuthProvider from '../api/AuthProvider.jsx';

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
            <Route path="" element={<PrivatePage />} />
          </Route>
          <Route path={routes.signupPagePath()} element={<Registration />} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </AuthProvider>
);

export default App;
