import React from "react";
import { useNavigate, Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div id="footer" className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.upperContent}>
          <div className={styles.upperContentInfo}>
            <div className={styles.leftUpper}>
              <h1>LOGO</h1>
              <button type="button" onClick={handleGetStarted}>
                Get Started
              </button>
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
                <Link
                  to={"https://github.com/MercyKorir"}
                  style={{ textDecoration: "none" }}
                >
                  <GitHubIcon
                    color="action"
                    className={styles.iconSocialItem}
                  />
                </Link>
                <Link
                  to={"https://www.linkedin.com/in/mercychelangatkorir/"}
                  style={{ textDecoration: "none" }}
                >
                  <LinkedInIcon
                    color="primary"
                    className={styles.iconSocialItem}
                  />
                </Link>
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
