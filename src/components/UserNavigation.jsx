import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LoginIcon from "@mui/icons-material/Login";
import styles from "../styles/UserNavigation.module.css";

const UserNavigation = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      const el = document.querySelector(".userMenuItem.active");

      if (el) {
        el.classList.add("animate");

        setTimeout(() => {
          el.classList.remove("animate");
        }, 300);
      }
    } else {
      setFirstRender(false);
    }
  }, [activeMenuItem]);

  return (
    <div className={styles.userNavContainer}>
      <div
        className={`${styles.userMenuItem} ${
          activeMenuItem === "home" && styles.active
        }`}
        onClick={() => setActiveMenuItem("home")}
      >
        <HomeIcon />
        <p>Home</p>
      </div>
      <div
        className={`${styles.userMenuItem} ${
          activeMenuItem === "notifications" && styles.active
        }`}
        onClick={() => setActiveMenuItem("notifications")}
      >
        <NotificationsIcon />
        <p>Notifications</p>
      </div>
      <div
        className={`${styles.userMenuItem} ${
          activeMenuItem === "support" && styles.active
        }`}
        onClick={() => setActiveMenuItem("support")}
      >
        <SupportAgentIcon />
        <p>Support</p>
      </div>
      <div
        className={`${styles.userMenuItem} ${
          activeMenuItem === "login" && styles.active
        }`}
        onClick={() => setActiveMenuItem("login")}
      >
        <LoginIcon />
        <p>Login</p>
      </div>
    </div>
  );
};

export default UserNavigation;
