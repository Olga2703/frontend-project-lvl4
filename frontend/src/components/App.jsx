import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  </Router>
);

export default App;
