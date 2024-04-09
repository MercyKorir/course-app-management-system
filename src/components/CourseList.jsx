import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseItem from "./CourseItem.jsx";
import Header from "./homeSections/Header.jsx";
import Hero from "./homeSections/Hero.jsx";
import Features from "./homeSections/Features.jsx";
import Testimonials from "./homeSections/Testimonials.jsx";
import ContactUs from "./homeSections/ContactUs.jsx";
import Footer from "./homeSections/Footer.jsx";
import commonStyles from "../styles/Common.module.css";
import styles from "../styles/CourseList.module.css";

/**
 * CourseList component fetches and displays a list of courses.
 */
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from the server on component mount
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

  // Render a loading spinner or the list of courses
  return loading ? (
    <div className={commonStyles.ldsRipple}>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className={styles.courseListContainer}>
      <Header />
      <Hero />
      <Features />
      <div id="courses" className={styles.coursesSectionContainer}>
        <div className={styles.courseListHeader}>
          <div className={styles.courseTextHeader}>
            <h1>Courses We Offer</h1>
            <p>
              Discover a wide array of courses designed to cater to your
              learning needs. From beginner to advanced levels, our courses
              cover various topics to help you achieve your goals.
            </p>
          </div>
          <div className={styles.courseCategories}>
            <button className={styles.active}>Popular</button>
            <button>Design</button>
            <button>Development</button>
            <button>AI</button>
          </div>
          {/* <h1>Courses We Offer</h1>
        <Link to={"/admin"}>Admin</Link> */}
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
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default CourseList;
