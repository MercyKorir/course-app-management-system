import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LoginIcon from "@mui/icons-material/Login";
import styles from "../styles/UserNavigation.module.css";

const UserNavigation = () => {
  return (
    <div className={styles.userNavContainer}>
      <div className={styles.userMenuItem}>
        <HomeIcon />
        <p>Home</p>
      </div>
      <div className={styles.userMenuItem}>
        <NotificationsIcon />
        <p>Notifications</p>
      </div>
      <div className={styles.userMenuItem}>
        <SupportAgentIcon />
        <p>Support</p>
      </div>
      <div className={styles.userMenuItem}>
        <LoginIcon />
        <p>Login</p>
      </div>
    </div>
  );
};

export default UserNavigation;
