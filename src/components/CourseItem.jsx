import React from "react";
import styles from "../styles/CourseItem.module.css";

const CourseItem = ({ title, subtitle, duration, hours, price, platform }) => {
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
        {/* <div className={styles.courseUsername}>{trainer ? trainer : user}</div> */}

        <div className={styles.courseContent}>{subtitle}</div>
      </div>
      <div className={styles.courseRatingPrice}>
        <div className={styles.coursePrice}>{price}</div>
        <div className={styles.courseRating}>5 Stars</div>
      </div>
      <div className={styles.courseDetails}>
        <div className={styles.courseTimeDetails}>
          <div className={styles.courseDuration}>Duration: {duration}</div>
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
