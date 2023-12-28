import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/AuthForm.module.css";
import signUpStyles from "../styles/SignUp.module.css";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [message, setMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.password_confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        new URLSearchParams(signUpData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 201) {
        const { firstname } = response.data;
        setMessage(`Signed up successfully. Welcome ${firstname}!`);
        setSignUpData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          password_confirm: "",
        });
      } else {
        setMessage("SignUp failed. Check your email and password.");
      }
    } catch (err) {
      setMessage("Registration failed. Please check your credentials.");
      console.error("SignUp error: ", err);
    }
  };

  return (
    <div className={styles.loginForm}>
      <div>
        <p className={styles.formGreet}>New here? Welcome!👋</p>
        <h2 className={styles.formTitle}>SignUp</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div>
              <PersonIcon />
            </div>
          </span>
          <input
            type="text"
            id="firstName"
            name="firstname"
            autoComplete="username"
            value={signUpData.firstname}
            onChange={handleChange}
            required
          />
          <label htmlFor="firstName">FirstName</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div>
              <PersonIcon />
            </div>
          </span>
          <input
            type="text"
            id="lastName"
            name="lastname"
            autoComplete="username"
            value={signUpData.lastname}
            onChange={handleChange}
            required
          />
          <label htmlFor="lastName">LastName</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div>
              <EmailIcon />
            </div>
          </span>
          <input
            type="email"
            id="signUpEmail"
            name="email"
            autoComplete="email"
            value={signUpData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="signUpEmail">Email</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
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
            id="signUpPwd"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="signUpPwd">Password</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div onClick={() => setShowConfPwd(!showConfPwd)}>
              {showConfPwd ? (
                <VisibilityIcon style={{ cursor: "pointer" }} />
              ) : (
                <VisibilityOffIcon style={{ cursor: "pointer" }} />
              )}
            </div>
          </span>
          <input
            type={showConfPwd ? "text" : "password"}
            id="confSignUpPwd"
            name="password_confirm"
            value={signUpData.password_confirm}
            onChange={handleChange}
            required
          />
          <label htmlFor="confSignUpPwd">Confirm Password</label>
        </div>
        <div className={styles.forgotPwd}>
          <Link to={"/forgot-password"} className={styles.forgotLink}>
            Forgot Password?
          </Link>
        </div>
        <button type="submit" className={styles.formBtn}>
          Register
        </button>
        <div className={styles.loginRegister}>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className={styles.registerLink}>
              Login
            </Link>
          </p>
        </div>
        <p className={`${styles.message} ${signUpStyles.signUpMessage}`}>
          {message}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
