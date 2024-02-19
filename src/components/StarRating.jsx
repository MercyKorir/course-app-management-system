import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarHalfIcon from "@mui/icons-material/StarHalf";
import styles from "../styles/StarRating.module.css";

const StarRating = ({ starValue, onChange, icon }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const stars = [1, 2, 3, 4, 5];

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
