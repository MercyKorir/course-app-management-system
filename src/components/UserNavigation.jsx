import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "../styles/UserNavigation.module.css";

const UserNavigation = ({ extraLoadTime = 0 }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [firstRender, setFirstRender] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNav(true);
    }, 300 + extraLoadTime);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if user is logged in using access_token cookie, if not redirect to login page
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="));
    const token = cookies.find((cookie) => cookie[0].trim() === "access_token");
    const access_token = token ? token[1] : null;

    if (!access_token) {
      setShowLogout(false);
    }

    const verifyUser = async () => {
      const data = {
        token: access_token,
        token_type_hint: "access_token",
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/user/verify",
          new URLSearchParams(data),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.data.status === 200) {
          setShowLogout(true);
        } else if (response.data.status === 401) {
          setShowLogout(false);
        } else {
          console.error("Error Verifying user: ", response);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setShowLogout(false);
        } else {
          console.error("Error Verifying user: ", err);
        }
      }
    };

    verifyUser();
  }, []);

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
  }, [activeMenuItem, firstRender]);

  return (
    <>
      {showNav && (
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
          {showLogout ? (
            <div
              className={`${styles.userMenuItem} ${
                activeMenuItem === "logout" && styles.active
              }`}
              onClick={() => setActiveMenuItem("logout")}
            >
              <LogoutIcon />
              <p>Logout</p>
            </div>
          ) : (
            <div
              className={`${styles.userMenuItem} ${
                activeMenuItem === "login" && styles.active
              }`}
              onClick={() => setActiveMenuItem("login")}
            >
              <LoginIcon />
              <p>Login</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserNavigation;
