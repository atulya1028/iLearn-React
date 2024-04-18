import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignIn, faInfoCircle, faContactCard, faBusinessTime, faSignOut } from "@fortawesome/free-solid-svg-icons";

const SideBars = ({ isOpen, toggleSidebar, loggedIn, handleLogout, closeSidebar }) => {
  const handleMenuItemClick = () => {
    closeSidebar(); // Close the sidebar when a menu item is clicked
  };

  const handleLoginClick = () => {
    toggleSidebar(); // Toggle the sidebar when the Login/Register button is clicked
    handleMenuItemClick(); // Close the sidebar after toggling (if it was open)
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
      <List>
        <ListItem button component={Link} to="/" onClick={handleMenuItemClick}>
          <ListItemText>
            <FontAwesomeIcon icon={faHome} color="blue" /> Home
          </ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/about-us" onClick={handleMenuItemClick}>
          <ListItemText>
            <FontAwesomeIcon icon={faInfoCircle} color="blue" /> About Us
          </ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/contact" onClick={handleMenuItemClick}>
          <ListItemText>
            <FontAwesomeIcon icon={faContactCard} color="blue" /> Contact Us
          </ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/business" onClick={handleMenuItemClick}>
          <ListItemText>
            <FontAwesomeIcon icon={faBusinessTime} color="blue" /> Business
          </ListItemText>
        </ListItem>
        {loggedIn ? (
          <ListItem button component={Link} to="/" onClick={toggleSidebar}>
            <ListItemText>
              <FontAwesomeIcon icon={faSignOut} color="blue" /> Logout
            </ListItemText>
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login" onClick={handleLoginClick}>
            <ListItemText>
              <FontAwesomeIcon icon={faSignIn} color="blue" /> Login/Register
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default SideBars;
