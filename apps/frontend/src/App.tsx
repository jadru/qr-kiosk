import React from 'react';
import { Login, Main, StoreManagement } from './pages';
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
