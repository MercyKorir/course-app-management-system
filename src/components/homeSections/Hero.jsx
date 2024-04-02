import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/Hero.module.css";

const Hero = () => {
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
                <span className={styles.purpleTxt}>Learning</span> and <br />
                <span className={styles.purpleTxt}>Growth!</span>
              </h1>
              <p>
                Explore our diverse courses and unlock your full potential{" "}
                <br />
                today.
              </p>
            </div>
            <div className={styles.ctaBtn}>
              <button type="button" className={styles.btnPurple}>
                Get Started
              </button>
              <button type="button" className={styles.btnWhite}>
                Learn More
              </button>
            </div>
          </div>
          <div className={styles.heroAnimation}>This is the animation</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
