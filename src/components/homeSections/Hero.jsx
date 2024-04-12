import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(false);

    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsOn(false);
    const animationTimer = setTimeout(() => {
      setIsOn(true);
    }, 2100);

    return () => clearTimeout(animationTimer);
  }, []);

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div id="hero" className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <div className={styles.searchBar}>
          <p>Search for media name</p>
          <span>
            <SearchIcon className={styles.searchIcon} />
          </span>
        </div>
        <div className={styles.heroContentMain}>
          <div className={styles.textCtaContent}>
            <div className={styles.ctaTexts}>
              <h1>
                <span className={styles.greenTxt}>Embark</span> on a Journey of{" "}
                <span className={styles.purpleTxt}>Learning</span> and{" "}
                <span className={styles.purpleTxt}>Growth!</span>
              </h1>
              <p>
                Explore our diverse courses and unlock your full potential{" "}
                <br />
                today.
              </p>
            </div>
            <div className={styles.ctaBtn}>
              <button
                type="button"
                className={styles.btnPurple}
                onClick={handleGetStarted}
              >
                Get Started
              </button>
              <button type="button" className={styles.btnWhite}>
                Learn More
              </button>
            </div>
          </div>
          <div className={styles.heroAnimation}>
            <div
              className={`${styles.lightBulbContent} ${
                showAnimation ? styles.show : ""
              }`}
            >
              <div
                className={`${styles.lightBulbWire} ${
                  showAnimation ? styles.show : ""
                }`}
              ></div>
              <div
                className={`${styles.lightBulb} ${isOn ? styles.on : ""} ${
                  showAnimation ? styles.show : ""
                }`}
              >
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
