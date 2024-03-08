import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "../styles/Login.css";

/**
 * Login component renders a login form for user authentication.
 */
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  /**
   * Validate function checks if there are any errors in the form fields.
   * @returns {boolean} True if there are no errors, false otherwise.
   */
  const validate = () => {
    validateEmail();
    validatePassword();

    return Object.keys(errors).length === 0;
  };

  /**
   * handleChange function updates the login form data state.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  /**
   * validateEmail function validates the email field and updates the errors state.
   */
  const validateEmail = () => {
    let emailErrors = {};
    if (!loginData.email.trim()) {
      emailErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      emailErrors.email = "Email is invalid!";
    }

    if (Object.keys(emailErrors).length === 0) {
      setErrors((prevErrors) => {
        delete prevErrors.email;
        return { ...prevErrors };
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...emailErrors,
      }));
    }
  };

  /**
   * validatePassword function validates the password field and updates the errors state.
   */
  const validatePassword = () => {
    let pwdErrors = {};
    if (!loginData.password.trim()) {
      pwdErrors.password = "Password is required!";
    } else if (loginData.password.length < 6) {
      pwdErrors.password = "Password must to be 6 characters or more!";
    }

    if (Object.keys(pwdErrors).length === 0) {
      setErrors((prevErrors) => {
        delete prevErrors.password;
        return { ...prevErrors };
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...pwdErrors,
      }));
    }
  };

  /**
   * handleBlurEmail function is called when the email field loses focus.
   * It validates the email field.
   */
  const handleBlurEmail = () => {
    validateEmail();
  };

  /**
   * handleBlurPwd function is called when the password field loses focus.
   * It validates the password field.
   */
  const handleBlurPwd = () => {
    validatePassword();
  };

  /**
   * getClient function fetches the client ID and client secret from the server.
   * @returns {Promise<{client: string, secret: string}>} A promise that resolves with the client ID and secret.
   */
  const getClient = async (e) => {
    try {
      const response = await axios.get("http://localhost:8080/client");

      if (response.data.status === 200) {
        const client = response.data.data.client_id;
        const secret = response.data.data.client_secret;
        return { client, secret };
      } else {
        console.error("Client error");
      }
    } catch (err) {
      setMessage("Failed to get client Information. Please try again.");
      console.error("Client error: ", err);
    }
  };

  /**
   * handleReset function resets the login form and clears the message and errors.
   */
  const handleReset = () => {
    setLoginData({
      email: "",
      password: "",
    });
    setMessage("");
    setErrors({});
  };

  /**
   * handleSubmit function is called when the login form is submitted.
   * It validates the form, fetches the client ID and secret, and sends a login request to the server.
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check why it is not returning true
    if (!validate()) {
      return;
    }

    const authData = {
      grant_type: "password",
      username: loginData.email,
      password: loginData.password,
    };

    const { client, secret } = await getClient();

    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        new URLSearchParams(authData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${client}:${secret}`),
          },
        }
      );

      if (response.status === 200) {
        const { access_token, expires_in, refresh_token } = response.data;

        const accessExpiry = new Date(new Date().getTime() + expires_in);
        const refreshExpiry = new Date(
          new Date().getTime() + 14 * 24 * 3600 * 1000
        );
        document.cookie = `access_token=${access_token}; expires=${accessExpiry} path=/;`;
        document.cookie = `refresh_token=${refresh_token}; expires=${refreshExpiry} path=/;`;
        setMessage(`Signed in successfully.`);
        setErrors({});
        setLoginData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        setMessage("Login failed. Check your email and password.");
      }
    } catch (err) {
      setMessage("Authentication failed. Please check your credentials.");
      console.error("Login error: ", err);
    }
  };

  return (
    <div className="loginForm">
      <div className="form-greet-title">
        <p className="formGreet">Welcome Back!👋</p>
        <h2 className="formTitle">Login</h2>
      </div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="inputBox">
          <span className="icon">
            <div>
              <EmailIcon />
            </div>
          </span>
          <input
            type="email"
            id="loginEmail"
            name="email"
            autoComplete="email"
            value={loginData.email}
            onChange={handleChange}
            onBlur={handleBlurEmail}
            required
          />
          <div
            className={`${
              errors.email ? "validation-error" : "validation-error-no-display"
            }`}
          >
            <span className="warnIcon">
              <WarningAmberIcon fontSize="inherit" />
            </span>{" "}
            <p>{errors.email}</p>
          </div>
          <label htmlFor="loginEmail">Email</label>
        </div>
        <div className="inputBox">
          <span className="icon">
            <div onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? (
                <VisibilityIcon style={{ cursor: "pointer" }} />
              ) : (
                <VisibilityOffIcon style={{ cursor: "pointer" }} />
              )}
            </div>
          </span>
          <input
            type={showPwd ? "text" : "password"}
            id="loginPwd"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            onBlur={handleBlurPwd}
            required
          />
          <div
            className={`${
              errors.password
                ? "validation-error"
                : "validation-error-no-display"
            }`}
          >
            <span className="warnIcon">
              <WarningAmberIcon fontSize="inherit" />
            </span>{" "}
            <p>{errors.password}</p>
          </div>
          <label htmlFor="loginPwd">Password</label>
        </div>
        <div className="forgotPwd">
          <Link to={"/forgot-password"} className="forgotLink">
            Forgot Password?
          </Link>
        </div>
        <div className="btn-container">
          <button type="submit" className="formBtn">
            Login
          </button>
          <button type="reset" className="formBtn">
            Reset
          </button>
        </div>
        <div className="loginRegister">
          <p>
            Don't have an account?{" "}
            <Link to={"/register"} className="registerLink">
              Register
            </Link>
          </p>
        </div>
        <p className="message">{message}</p>
      </form>
    </div>
  );
};

export default Login;
