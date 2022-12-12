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
import LoginPage from './loginPage/LoginPage.jsx';
import NotFoundPage from './notFoundPage/NotFoundPage.jsx';
import ChatPage from './chatPage/ChatPage.jsx';
import Registration from './signupPage/Registration.jsx';
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
            <Route path="" element={<ChatPage />} />
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
