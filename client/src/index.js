import './index.css';
import App from './App';
import "react-bootstrap"
import React from 'react';
import store from './Redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { BrowserRouter } from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='770351686412-ah57rrbapjnr5ujk2dobi2dlhb1evjpt.apps.googleusercontent.com'>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);