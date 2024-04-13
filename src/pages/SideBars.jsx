import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export const SideBars = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div>
      {isSidebarVisible && (
        <Sidebar
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '250px', // Adjust the width as needed
            height: '100vh',
            transition: 'width 0.3s ease-in-out',
          }}
        >
          <Menu>
            <MenuItem component={<Link to="/" />} onClick={handleMenuClick}>
              Home
            </MenuItem>
            <MenuItem component={<Link to="/about-us" />} onClick={handleMenuClick}>
              About Us
            </MenuItem>
            <MenuItem component={<Link to="/contact" />} onClick={handleMenuClick}>
              Contact
            </MenuItem>
            <MenuItem component={<Link to="/business" />} onClick={handleMenuClick}>
              Business
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </div>
  );
};
