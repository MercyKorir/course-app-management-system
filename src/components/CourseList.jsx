import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseItem from "./CourseItem.jsx";
import commonStyles from "../styles/Common.module.css";
import styles from "../styles/CourseList.module.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/courses");

        if (response.data.status === 200) {
          setCourses(response.data.data);
        } else if (response.data.status === 404) {
          setCourses([]);
        } else {
          console.error("Error fetching courses: ", response);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setCourses([]);
        } else {
          console.error("Error fetching courses: ", err);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchCourses();
  }, []);

  return loading ? (
    <div className={commonStyles.ldsRipple}>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className={styles.courseListContainer}>
      <div className={styles.courseListHeader}>
        <h1>Courses We Offer</h1>
        <Link to={"/admin"}>Admin</Link>
      </div>
      <div className={styles.courseListItems}>
        {courses.map((course) => (
          <CourseItem
            key={course.course_id}
            title={course.title}
            subtitle={course.short_description}
            duration="3 Months"
            hours="100 Hours"
            price="$100.00"
            platform="Virtual"
            image_name={course.course_image}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
