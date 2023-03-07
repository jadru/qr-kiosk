import React from 'react';
import {
  Login,
  Main,
  Order,
  OrderList,
  StoreManagement,
  TossPay,
  TossPaySuccess,
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
    path: '/store-management/*',
    element: <StoreManagement />,
  },
  {
    path: '/order',
    element: <Order />,
  },
  {
    path: '/order/confirm',
    element: <OrderList />,
  },
  {
    path: '/order/payment',
    element: <TossPay />,
  },
  {
    path: '/order/success',
    element: <TossPaySuccess />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
