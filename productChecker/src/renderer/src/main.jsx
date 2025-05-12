import './main.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import Hub from './components/frontPage/hub.jsx'
import AdminLogin from './components/frontPage/adminLogin.jsx'
import WarehousemanLogin from './components/frontPage/warehousemanLogin.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Hub/>,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/warehouseman-login",
    element: <WarehousemanLogin />
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

