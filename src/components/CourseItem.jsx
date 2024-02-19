import React, { useState } from "react";
import styles from "../styles/CourseItem.module.css";
import StarRating from "./StarRating.jsx";

const CourseItem = ({ title, subtitle, duration, hours, price, platform }) => {
  const [readMore, setReadMore] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [iconVal, setIconVal] = useState("empty");

  const handleReadMore = () => {
    setReadMore(!readMore);
    setTimeout(() => {
      setIsExpanded(!isExpanded);
    }, 100);
  };

  const handleRatingChange = (starValue) => {
    setRating(starValue);
    setIconVal(starValue === 0 ? "empty" : starValue === 0.5 ? "half" : "full");
  };

  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseContHeader}>
        {/* Add image here */}
        <div className={styles.courseImg}>
          <div className={styles.dimImage}></div>
          <img src="/photography.jpg" alt="CourseImage" />
        </div>
        <div className={styles.courseTitle}>{title}</div>
        <div className={styles.courseButton}>Enroll Now</div>
      </div>
      <div className={styles.courseDescription}>
        <div className={styles.courseContent}>
          {subtitle.length < 100 ? (
            <p>{subtitle}</p>
          ) : (
            <span
              className={
                readMore ? styles.noInitialDesc : styles.showInitialDesc
              }
            >
              {subtitle.substring(0, 100)}{" "}
              <span className={styles.readMoreEllipse}>...</span>
              <span className={styles.readMoreBtn} onClick={handleReadMore}>
                Read More
              </span>
            </span>
          )}
          {readMore && (
            <div
              className={`${styles.expandedDescription} ${
                isExpanded ? styles.showFadeExpanded : ""
              }`}
            >
              <p className={styles.fullDescPTag}>{subtitle}</p>
              <span className={styles.readLessBtn} onClick={handleReadMore}>
                Read Less
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.courseRatingPrice}>
        <div className={styles.coursePrice}>{price}</div>
        <div className={styles.courseRating}>
          <StarRating
            starValue={rating}
            onChange={handleRatingChange}
            icon={iconVal}
          />
        </div>
      </div>
      <div className={styles.courseDetails}>
        <div className={styles.courseTimeDetails}>
          <div className={styles.courseDuration}>{duration}</div>
          <div className={styles.courseHours}>{hours}</div>
        </div>
        <div className={styles.coursePlatformDetails}>
          <div className={styles.coursePlatform}>{platform}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
