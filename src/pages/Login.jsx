import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth <= 576);

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth <= 576);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        toast.success("Login Successful");
        localStorage.setItem("token", data.token);
        navigate("/",{state: {refreshHandler:true}});
        window.location.reload();
        window.location.reload();
      } else {
        toast.error("Invalid credentials. Please try again.");
        setErrorMessage("Invalid credentials. Please try again.");
      }
      console.log("Token: ", data.token);
    } catch (error) {
      toast.error("Error signing in. Please try again.");
      setErrorMessage("Error signing in. Please try again.");
    }
  };

  useEffect(() => {

    handleScreenWidth();
    window.addEventListener("resize", handleScreenWidth);

    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    }
   
  }, []);

  return (
    <div className="login">
      <ToastContainer />
      {screenWidth ? (
        <div
          style={{  
            marginTop: "200px",
            width: "80%",
            marginLeft: "30px",
            marginRight: "30px",
            borderRadius: '20px',
            padding: '20px',
          }}
        >
          <h3 className="login-heading">
            Welcome to iLearn <br />
            Your book online book store
          </h3>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <br />
          <span className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button className="showHideBtn" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </span>
          <br /> <br />
          <button className="sign-in" onClick={handleSignIn}>
            SignIn
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      ) : (
        <div className="parentDiv">
          <div className="container">
            <h5 className="login-heading">
              Welcome to iLearn <br />
              Your book online book store
            </h5>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            <br />
            <span className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                className="showHideBtn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </span>
            <br /> <br />
            <button className="sign-in" onClick={handleSignIn}>
              SignIn
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
