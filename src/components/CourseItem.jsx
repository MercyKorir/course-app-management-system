import React, { useState } from "react";
import styles from "../styles/CourseItem.module.css";
import StarRating from "./StarRating.jsx";

/**
 * CourseItem component renders a single course item with its details.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the course.
 * @param {string} props.subtitle - The subtitle or description of the course.
 * @param {string} props.duration - The duration of the course.
 * @param {string} props.hours - The number of hours for the course.
 * @param {string} props.price - The price of the course.
 * @param {string} props.platform - The platform where the course is available.
 * @param {string} props.image_name - The name of the course image file.
 */
const CourseItem = ({
  title,
  subtitle,
  duration,
  hours,
  price,
  platform,
  image_name,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [iconVal, setIconVal] = useState("empty");

  // Toggle the "Read More" and "Read Less" functionality
  const handleReadMore = () => {
    setReadMore(!readMore);
    setTimeout(() => {
      setIsExpanded(!isExpanded);
    }, 100);
  };

  // Update the rating and the corresponding icon value
  const handleRatingChange = (starValue) => {
    setRating(starValue);
    setIconVal(starValue === 0 ? "empty" : starValue === 0.5 ? "half" : "full");
  };

  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseContHeader}>
        {/* Course image container */}
        <div className={styles.courseImg}>
          <div className={styles.dimImage}></div>
          <img
            src={`http://localhost:8080/image/${encodeURIComponent(
              image_name
            )}`}
            alt={title}
          />
        </div>
        <div className={styles.courseTitle}>{title}</div>
        <div className={styles.courseButton}>Enroll Now</div>
      </div>
      <div className={styles.courseDescription}>
        <div className={styles.courseContent}>
          {/* Render the course description with "Read More" functionality */}
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
          {/* Render the StarRating component for rating */}
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
