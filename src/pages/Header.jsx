import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/iLearn.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle,faHeart } from "@fortawesome/free-solid-svg-icons";
import SideBars from "./SideBars";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [userProfile, setUserProfile] = useState(null);
  const [viewProfile, setViewProfile] = useState(false);

  const handleProfile = () => {
    setViewProfile(!viewProfile);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.refreshHeader) {
      // Refresh header logic here
      console.log("Header refreshed!");
    }
  }, [location.state]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    // Handle logout logic here
    setLoggedIn(false);
    handleProfile();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoggedIn(false);
          return;
        }

        const response = await fetch("http://localhost:8080/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
          setLoggedIn(true);
        } else {
          // Handle unauthorized access or other errors
          console.error("Profile Fetch Error:", response.statusText);
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Profile Fetch Error:", error.message);
        setLoggedIn(false);
      } finally {
      }
    };

    fetchProfile();
  }, []);

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
      {isMobile ? (
        <header className="head">
          <span style={{ display: "flex" }}>
            <FontAwesomeIcon
              color="black"
              fontSize={25}
              icon={faBars}
              onClick={toggleSidebar}
              style={{
                marginTop: "10px",
                padding: "5",
                marginLeft: "20",
                marginRight: "20",
                borderRadius: "5px",
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
      ) : (
        <header className="head">
          <Link to="/">
            {" "}
            <img src={logo} width="280px" height="150px" alt="iLearn" />
          </Link>
          <input
            type="text"
            className="search-box"
            placeholder="Search by Author, Name"
          />

          <div>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faHeart} className="fav"/>
              <FontAwesomeIcon
                icon={faBagShopping}
                className="bag"
              />
              <FontAwesomeIcon
                icon={faUserCircle}
                className="user-circle"
                onClick={handleProfile}
                style={{ cursor: "pointer" }}
              />
              {viewProfile ? (
                <div className="profile">
                  <div className="profile-box">
                    {loggedIn && userProfile ? (
                      <div style={{ fontSize: "15px" }}>
                        Welcome, <span>{userProfile.name}</span>
                      </div>
                    ) : (
                      <></>
                    )}
                    {loggedIn && userProfile ? (
                      <Link to='/login' className="login-register" onClick={handleLogout}>Logout</Link>
                    ) : (
                      <Link to="/login" className="login-register" onClick={handleProfile}>
                        Login/Register
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </span>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
