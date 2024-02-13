import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../styles/Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <div>
        <p className="formGreet">Welcome Back!👋</p>
        <h2 className="formTitle">Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
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
            required
          />
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
            required
          />
          <label htmlFor="loginPwd">Password</label>
        </div>
        <div className="forgotPwd">
          <Link to={"/forgot-password"} className="forgotLink">
            Forgot Password?
          </Link>
        </div>
        <button type="submit" className="formBtn">
          Login
        </button>
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
