import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/iLearn.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideBars from "./SideBars";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    setLoggedIn(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? 
    <header className="head">
    <span style={{ display: "flex", backgroundColor: "aliceblue" }}>
      <FontAwesomeIcon
        color="#d4a373"
        fontSize={20}
        icon={faBars}
        onClick={toggleSidebar}
        style={{
          marginTop: "10px",
          backgroundColor: "white",
          padding: "5",
          marginLeft: "20",
          marginRight: "20",
          borderRadius: "5px",
          border: "black 1px solid",
        }}
      />
      <img src={logo} width={200} height={50} alt="logo" />
    </span>
    <SideBars
      isOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      loggedIn={loggedIn}
      handleLogout={handleLogout}
    />
  </header> 
  :
  <header className="head">
          <img src={logo} width="200px" height="80px" alt="iLearn" />
          <ul className="tab">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="about-us">About Us</Link>
            </li>
            <li>
              <Link to="contact">Contact Us</Link>
            </li>
            <li>
              <Link to="business">Business</Link>
            </li>
          </ul>
          <Link to="/login">
            <button className="login-register">Login/Register</button>
          </Link>
        </header>
  
    }
    </>
  );
};

export default Header;
