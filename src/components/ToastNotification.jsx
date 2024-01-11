import React from "react";
import styles from "../styles/ToastNotification.module.css";
import CheckIcon from "@mui/icons-material/Check";

const ToastNotification = ({ message }) => {
  return (
    <div className={styles.notification}>
      <div className={styles.notificationBody}>
        <div className={styles.notificationDescription}>
          <div className={styles.iconWrapper}>
            <CheckIcon className={styles.checkIcon} />
          </div>
          <div className={styles.message}>
            <h4>{message}</h4>
          </div>
        </div>
        {/* <span className={styles.notificationBtn}>Close</span> */}
      </div>
      <div className={styles.notificationProgress}></div>
    </div>
  );
};

export default ToastNotification;
