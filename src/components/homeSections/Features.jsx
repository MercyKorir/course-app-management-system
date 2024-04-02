import React from "react";
import UIFriendlyIcon from "../../assets/ui-friendly.svg";
import FlexibleLearningIcon from "../../assets/flexible-learningsvg.svg";
import FreeCoursesIcon from "../../assets/free-courses.svg";
import MobileCompatibleIcon from "../../assets/mobile-compatibility.svg";
import styles from "../../styles/Features.module.css";

const Features = () => {
  return (
    <div id="features" className={styles.featuresContainer}>
      <div className={styles.featuresContent}>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <UIFriendlyIcon style={{ width: "60px", height: "60px" }} />
          </div>
          <div className={styles.featureText}>
            <h3>User-Friendly Interface</h3>
            <p>
              Easy navigation for seamless <br />
              learning experience
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <FlexibleLearningIcon style={{ width: "60px", height: "60px" }} />
          </div>
          <div className={styles.featureText}>
            <h3>Flexible Learning</h3>
            <p>
              Learn anytime, anywhere at <br />
              your pace
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <FreeCoursesIcon style={{ width: "60px", height: "60px" }} />
          </div>
          <div className={styles.featureText}>
            <h3>Free Courses</h3>
            <p>
              Access quality courses at <br />
              zero cost
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <MobileCompatibleIcon style={{ width: "60px", height: "60px" }} />
          </div>
          <div className={styles.featureText}>
            <h3>Mobile Compatibility</h3>
            <p>
              Learn on-the-go with mobile <br />
              access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
