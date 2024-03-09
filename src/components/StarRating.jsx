import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarHalfIcon from "@mui/icons-material/StarHalf";
import styles from "../styles/StarRating.module.css";

/**
 * StarRating component renders a star rating UI with clickable stars.
 *
 * @param {Object} props - The component props.
 * @param {number} props.starValue - The current star value.
 * @param {function} props.onChange - A function to handle star value changes.
 * @param {string} props.icon - The icon to display (empty, half, or full).
 */
const StarRating = ({ starValue, onChange, icon }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  /**
   * handleIconChange function determines which icon (filled or outlined) to display for a given star index.
   *
   * @param {number} index - The index of the star.
   * @returns {JSX.Element} - The JSX element representing the star icon.
   */
  const handleIconChange = (index) => {
    if (starValue >= index + 1 || hoverValue >= index + 1) {
      return <StarIcon className={styles.emptyStar} />;
    } else {
      return <StarBorderIcon className={styles.fullStar} />;
    }
  };

  return (
    <div>
      {stars.map((star, index) => (
        <span
          key={index}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className={styles.starIcon}
        >
          {handleIconChange(index)}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
