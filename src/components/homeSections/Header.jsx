import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div id="header" className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link to={"/"} style={{textDecoration: "none"}}>
          <h1 className={styles.logoHeaderText}>LOGO</h1>
        </Link>
        <button type="button" className={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
