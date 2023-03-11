import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-bootstrap"
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="95904298791-rm71moia01edebu5gs3nhak98ql321u5.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>;
    </BrowserRouter>
  </Provider>
);