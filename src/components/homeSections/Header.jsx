import React from "react";
import styles from "../../styles/Header.module.css";

const Header = () => {
  return (
    <div id="header" className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1 className={styles.logoHeaderText}>LOGO</h1>
        <button type="button" className={styles.loginBtn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
