import React from 'react';
import { Login, Main, StoreManagement, TossPay } from './pages';
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
    path: '/toss-pay/*',
    element: <TossPay />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
