import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import styles from "../styles/AuthForm.module.css";
import signUpStyles from "../styles/SignUp.module.css";

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
  const [errors, setErrors] = useState({});

  const validate = () => {
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();
    validatePasswordConfirm();

    console.log("Errors: ", errors);

    return (
      errors.firstname === "" &&
      errors.lastname === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.password_confirm === ""
    );
  };

  const validateFirstName = () => {
    let firstNameErrors = {};
    if (!signUpData.firstname.trim()) {
      firstNameErrors.firstname = "First Name is required!";
    }

    if (Object.keys(firstNameErrors).length === 0) {
      firstNameErrors.firstname = "";
      console.log("First Name is valid");
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...firstNameErrors,
    }));
  };

  const validateLastName = () => {
    let lastNameErrors = {};
    if (!signUpData.lastname.trim()) {
      lastNameErrors.lastname = "Last Name is required!";
    }

    if (Object.keys(lastNameErrors).length === 0) {
      lastNameErrors.lastname = "";
      console.log("Last Name is valid");
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...lastNameErrors,
    }));
  };

  const validateEmail = () => {
    let emailErrors = {};
    if (!signUpData.email.trim()) {
      emailErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      emailErrors.email = "Email is invalid!";
    }

    if (Object.keys(emailErrors).length === 0) {
      emailErrors.email = "";
      console.log("Email is valid");
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...emailErrors,
    }));
  };

  const validatePassword = () => {
    let pwdErrors = {};
    if (!signUpData.password.trim()) {
      pwdErrors.password = "Password is required!";
    } else if (signUpData.password.length < 6) {
      pwdErrors.password = "Password must to be 6 characters or more!";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(signUpData.password)) {
      pwdErrors.password =
        "Password must contain letters and at least one number!";
    }

    if (Object.keys(pwdErrors).length === 0) {
      pwdErrors.password = "";
      console.log("Password is valid");
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...pwdErrors,
    }));
  };

  const validatePasswordConfirm = () => {
    let pwdConfirmErrors = {};
    if (!signUpData.password_confirm.trim()) {
      pwdConfirmErrors.password_confirm = "Confirm Password is required!";
    } else if (signUpData.password_confirm !== signUpData.password) {
      pwdConfirmErrors.password_confirm = "Passwords do not match!";
    }

    if (Object.keys(pwdConfirmErrors).length === 0) {
      pwdConfirmErrors.password_confirm = "";
      console.log("Password Confirm is valid");
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...pwdConfirmErrors,
    }));
  };

  const handleBlur = (field) => {
    switch (field) {
      case "firstname":
        validateFirstName();
        break;
      case "lastname":
        validateLastName();
        break;
      case "email":
        validateEmail();
        break;
      case "password":
        validatePassword();
        break;
      case "password_confirm":
        validatePasswordConfirm();
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setSignUpData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirm: "",
    });
    setMessage("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SignUp Data: ", signUpData);

    if (!validate()) {
      console.log("Validation failed");
      return;
    }

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
        setErrors({});
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
      <div className={styles.welcomeSignUp}>
        <p className={styles.formGreet}>New here? Welcome!👋</p>
        <h2 className={styles.formTitle}>SignUp</h2>
      </div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className={styles.formItems}>
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
              onBlur={() => handleBlur("firstname")}
              required
            />
            <div
              className={`${
                errors.firstname
                  ? styles.validationError
                  : styles.validationErrorNoDisplay
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{errors.firstname}</p>
            </div>
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
              onBlur={() => handleBlur("lastname")}
              required
            />
            <div
              className={`${
                errors.lastname
                  ? styles.validationError
                  : styles.validationErrorNoDisplay
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{errors.lastname}</p>
            </div>
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
              onBlur={() => handleBlur("email")}
              required
            />
            <div
              className={`${
                errors.email
                  ? styles.validationError
                  : styles.validationErrorNoDisplay
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{errors.email}</p>
            </div>
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
              onBlur={() => handleBlur("password")}
              required
            />
            <div
              className={`${
                errors.password
                  ? styles.validationError
                  : styles.validationErrorNoDisplay
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{errors.password}</p>
            </div>
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
              onBlur={() => handleBlur("password_confirm")}
              required
            />
            <div
              className={`${
                errors.password_confirm
                  ? styles.validationError
                  : styles.validationErrorNoDisplay
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{errors.password_confirm}</p>
            </div>
            <label htmlFor="confSignUpPwd">Confirm Password</label>
          </div>
        </div>
        <div className={styles.forgotPwd}>
          <Link to={"/forgot-password"} className={styles.forgotLink}>
            Forgot Password?
          </Link>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.formBtn}>
            Register
          </button>
          <button type="reset" className={styles.formBtn}>
            Reset
          </button>
        </div>
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
