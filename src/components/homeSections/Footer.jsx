import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <div id="footer" className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.upperContent}>
          <div className={styles.upperContentInfo}>
            <div className={styles.leftUpper}>
              <h1>LOGO</h1>
              <button>Get Started</button>
            </div>
            <div className={styles.centerUpper}>
              <div className={styles.leftCenter}>
                <h4>Navigate</h4>
                <ul>
                  <li>Courses</li>
                  <li>Features</li>
                  <li>Testimonials</li>
                  <li>Login</li>
                </ul>
              </div>
              <div className={styles.rightCenter}>
                <h4>Support</h4>
                <ul>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
            <div className={styles.rightUpper}>
              <h4>Socials</h4>
              <div className={styles.socialIcons}>
                <GitHubIcon color="action" className={styles.iconSocialItem} />
                <LinkedInIcon
                  color="primary"
                  className={styles.iconSocialItem}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.lowerContent}>
          <div className={styles.lowerContentText}>
            <p>&copy; 2024 All Rights Reserved</p>
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
