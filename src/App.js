import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
import Home from './pages/Home';
import About from './pages/About';
import Business from './pages/Business';
import DetailsPage from './pages/DetailsPage';
import Layout from './pages/Layout';
import { Login } from './pages/Login';
import Cart from './pages/Cart';
import { CreateOrder } from './pages/CreateOrder';
import Favorite  from './pages/Favorite';

function App() {
  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/business" element={<Business />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/details/:title" element={<DetailsPage />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
        <Route path="/create-order" element={<CreateOrder />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
