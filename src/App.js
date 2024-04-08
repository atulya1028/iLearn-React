import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Business from './pages/Business';
import DetailsPage from './pages/DetailsPage';
import Layout from './pages/Layout';

function App() {
  return (
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/business" element={<Business />} />
        </Route>
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
