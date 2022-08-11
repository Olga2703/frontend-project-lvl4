import React from 'react';
import {
  BrowserRouter as Router,
  Routers,
  Route,
} from 'react-router-dom';
import Header from './Header.jsx';

const App = () => (
      <Router>
        <Header />
        <Routers>
          <Route path="/" />
          <Route path="/login" />
        </Routers>
      </Router>
);

export default App;
