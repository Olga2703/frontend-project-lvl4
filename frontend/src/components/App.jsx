import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' />
      <Route path='/login' />
    </Routes>
  </Router>
);

export default App;
