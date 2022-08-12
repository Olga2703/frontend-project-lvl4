import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App.jsx';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);
root.render(<App />);
