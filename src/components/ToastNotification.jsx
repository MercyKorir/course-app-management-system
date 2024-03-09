import React from "react";
import styles from "../styles/ToastNotification.module.css";
import CheckIcon from "@mui/icons-material/Check";

/**
 * ToastNotification component renders a toast notification with a message and an icon based on the operation type.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to display in the notification.
 * @param {string} props.operation - The operation type ("success" or "error").
 */
const ToastNotification = ({ message, operation }) => {
  // Determine the CSS class for the icon wrapper based on the operation type
  const wrapperClass =
    operation === "success"
      ? styles.iconWrapperSuccess
      : styles.iconWrapperError;

  // Determine the CSS class for the notification progress bar based on the operation type
  const progressClass =
    operation === "success"
      ? styles.notificationProgressSuccess
      : styles.notificationProgressError;

  return (
    <div className={styles.notification}>
      <div className={styles.notificationBody}>
        <div className={styles.notificationDescription}>
          <div className={wrapperClass}>
            <CheckIcon className={styles.checkIcon} />
          </div>
          <div className={styles.message}>
            <h4>{message}</h4>
          </div>
        </div>
        {/* <span className={styles.notificationBtn}>Close</span> */}
      </div>
      <div className={progressClass}></div>
    </div>
  );
};

export default ToastNotification;
