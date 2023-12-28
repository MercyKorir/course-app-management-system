import React from "react";
import "../styles/AuthWrapper.css";
import bgImage from "../assets/loginBG.png";

const AuthWrapper = ({ children, formType }) => {
  const determineHeight = () => {
    if (formType === "login") {
      return 600;
    } else if (formType === "signup") {
      return 740;
    } else {
      return 600;
    }
  };

  return (
    <div className="authContainer">
      <div
        className="formContainer"
        style={{ height: determineHeight() + "px" }}
      >
        <div className="imageContainer">
          <div className="imgLogo">
            <p>LOGO</p>
          </div>

          <img src={bgImage} alt="Login Background" className="bgImage" />
        </div>
        <div className="formWrapperContainer">
          <div className="formWrapper">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
