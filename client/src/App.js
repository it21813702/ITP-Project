import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';

/* Import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import AddProduct from './components/AddProduct';
import Products from './components/Product/Products';
import ProductDetail from './components/Product/ProductDetail';
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Reports from './components/Reports';
//import help from './components/Help'
/** Auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';
//import { Menu } from '@mui/material';
import Help from './components/Help';

/* Root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/password',
    element: <ProtectRoute><Password /></ProtectRoute>,
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>,
  },
  {
    path: '/reset',
    element: <Reset></Reset>,
  },
  {
    path: '/profile',
    element: <AuthorizeUser><Profile /></AuthorizeUser>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
  {
    path:'/side',
    element:<Sidebar></Sidebar>
  },
  
  {
    path:'/add',
    element:<AddProduct></AddProduct>
  },
  {
    path:'/products',
    element:<Products></Products>
  },
  {
    path:'/dash',
    element:<Dashboard></Dashboard>
  },
  {
    path:'/help',
    element:<Help></Help>
  },
  {
    path:'products/:id',
    element:<ProductDetail></ProductDetail>
  },
  {
    path:'/reports',
    element:<Reports></Reports>
  }
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}>
        <Routes>
          <Route
            path="/"
            element={
              <Sidebar>
                <Route path="/" element={<Username />} exact />
                <Route path="/add" element={<AddProduct />} exact />
                <Route path="/products" element={<Products />} exact />
                <Route path="/products/:id" element={<ProductDetail />} exact />
                <Route path="/profile" element={<Profile />} exact />
              </Sidebar>
            }
          />
        </Routes>
      </RouterProvider>
    </main>
  );
}
 


export default App;
