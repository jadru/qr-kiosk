import React from 'react';
import { Login, Main, StoreManagement, TossPay, TossPaySuccess } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
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
    path: '/toss-pay',
    element: <TossPay />,
  },
  {
    path: '/success',
    element: <TossPaySuccess />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
