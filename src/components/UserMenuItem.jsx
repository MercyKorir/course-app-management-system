import React from "react";
import styles from "../styles/UserNavigation.module.css";

/**
 * UserMenuItem component renders a menu item for the user navigation.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.icon - The icon to display in the menu item.
 * @param {string} props.text - The text to display in the menu item.
 * @param {boolean} props.active - Whether the menu item is currently active or not.
 * @param {function} props.onClickFunc - The function to be called when the menu item is clicked.
 */
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
