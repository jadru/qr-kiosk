import React from 'react';
import { Login, Main, StoreManagement } from './pages';
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
