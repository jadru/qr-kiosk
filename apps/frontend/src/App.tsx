import React from 'react';
import {
  Login,
  Main,
  Order,
  OrderList,
  StoreManagement,
  OrderSuccess,
  Signup,
  LastOrder,
  Owner,
} from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorScreen } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorScreen />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/owner',
    element: <Owner />,
  },
  {
    path: '/owner/manage',
    element: <StoreManagement />,
  },
  {
    path: '/:storeId/:tableId/order',
    element: <Order />,
  },
  {
    path: '/:storeId/:tableId/order/confirm',
    element: <OrderList />,
  },
  {
    path: '/:storeId/:tableId/order/success',
    element: <OrderSuccess />,
  },
  {
    path: '/:storeId/:tableId/order/list',
    element: <LastOrder />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
