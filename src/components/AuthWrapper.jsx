import React, { useState, useEffect } from "react";
import "../styles/AuthWrapper.css";
import bgImage from "../assets/loginBG.png";

/**
 * AuthWrapper component is a container for authentication forms (login and signup).
 * It handles the layout and responsiveness of the form container.
 *
 * @param {JSX.Element} children - The form component to be rendered inside the wrapper.
 * @param {string} formType - The type of form to be rendered ("login" or "signup").
 */
const AuthWrapper = ({ children, formType }) => {
  const [heightVal, setHeightVal] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Set up an event listener for window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine the height of the form container based on form type and screen width
  useEffect(() => {
    const determineHeight = () => {
      if (formType === "login") {
        setHeightVal("600px");
      } else if (formType === "signup") {
        if (screenWidth >= 768) {
          setHeightVal("630px");
        } else {
          setHeightVal("fit-content");
        }
      } else {
        setHeightVal("600px");
      }
    };
    determineHeight();
  }, [formType, screenWidth]);

  return (
    <div className="authContainer">
      <div className="formContainer" style={{ height: heightVal }}>
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
