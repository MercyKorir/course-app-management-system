import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import UserMenuItem from "./UserMenuItem.jsx";
import styles from "../styles/UserNavigation.module.css";

const CommonItems = [
  {
    id: "home",
    icon: <HomeIcon />,
    text: "Home",
  },
  {
    id: "notifications",
    icon: <NotificationsIcon />,
    text: "Notifications",
  },
  {
    id: "support",
    icon: <SupportAgentIcon />,
    text: "Support",
  },
];

const ItemNames = {
  Home: "home",
  Notifications: "notifications",
  Support: "support",
  Login: "login",
  Logout: "logout",
};

let MenuItems = [];

const UserNavigation = ({ extraLoadTime = 0 }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(ItemNames.Home);
  const [firstRender, setFirstRender] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

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
    MenuItems = showLogout
      ? [...CommonItems, { id: "logout", icon: <LogoutIcon />, text: "Logout" }]
      : [...CommonItems, { id: "login", icon: <LoginIcon />, text: "Login" }];
  }, [showLogout]);

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem("activeMenuItem");

    if (storedActiveMenu) {
      setActiveMenuItem(storedActiveMenu);
    }
  }, []);

  const handleClick = (menuItem) => {
    setActiveMenuItem(menuItem);

    localStorage.setItem("activeMenuItem", menuItem);

    switch (menuItem) {
      case ItemNames.Home:
        navigate("/");
        break;
      case ItemNames.Notifications:
        navigate("/notifications");
        break;
      case ItemNames.Support:
        navigate("/support");
        break;
      case ItemNames.Login:
        navigate("/login");
        break;
      case ItemNames.Logout:
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/");
        break;
      default:
        throw new Error("Invalid menu item");
    }
  };

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
          {MenuItems.map((item) => (
            <UserMenuItem
              key={item.id}
              icon={item.icon}
              text={item.text}
              active={item.id === activeMenuItem}
              onClickFunc={() => handleClick(item.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UserNavigation;
