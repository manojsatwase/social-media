import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppRouter} from './App';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import {Provider as AlertProvider,positions,transitions} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
     <AlertProvider  template={AlertTemplate} {...options} >
     <RouterProvider router={AppRouter} />
     </AlertProvider>
     </Provider>
  </React.StrictMode>
);
