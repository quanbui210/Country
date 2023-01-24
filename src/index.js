import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Country from './Component/Country'
import Region from './Component/Region'
import Error from './Component/Error'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "/country/:name",
    element: <Country/>,
  },
  {
    path: "/region/:region",
    element: <Region/>,
  },
  {
    path: "/country/",
    element: <Error/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <RouterProvider router={router} />
);



