import React from "react";
import styles from "../styles/UserNavigation.module.css";

const UserMenuItem = ({ icon, text, active, onClickFunc }) => {
  return (
    <div
      className={`${styles.userMenuItem} ${active && styles.active}`}
      onClick={onClickFunc}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default UserMenuItem;
