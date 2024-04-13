import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import logo from "./images/iLearn.jpg";
import { SideBars } from "./pages/SideBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile] = useState(window.innerWidth <= 576);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <span style={{ display: "flex", backgroundColor: "aliceblue" }}>
            <FontAwesomeIcon
              size={100}
              icon={faBars}
              onClick={toggleSidebar}
              width={40}
              height={20}
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
          {isSidebarOpen && <SideBars />}
        </>
      ) : (
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
            <li>
              <Link to="books">Books</Link> {/* Added books link */}
            </li>
          </ul>
          <Link to="/login">
            <button className="login-register">Login/Register</button>
          </Link>
        </header>
      )}
    </>
  );
}
