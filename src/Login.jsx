import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="parentDiv">
      <div className="container">
        <h3 className="login-heading" style={{fontFamily:'whisper',fontSize:'35px',fontWeight:'bold'}}>
          Welcome to iLearn <br />
          Your book online book store
        </h3>
        <input type="text" placeholder="Enter email" />
        <br />
        <br />
        <span className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
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
        <button className="sign-in">SignIn</button>
      
      </div>
    </div>
  );
};
