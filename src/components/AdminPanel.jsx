import React, { useState } from "react";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Full Stack Development",
      description: "This is a paragraph. It is co ...",
    },
    {
      id: 2,
      title: "Front End Development",
      description: "This is a paragraph. It is co ...",
    },
    {
      id: 3,
      title: "Back End Development",
      description: "This is a paragraph. It is co ...",
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "This is a paragraph. It is co ...",
    },
  ]);

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      title: "",
      description: "",
    };
    setCourses([...courses, newCourse]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [name]: value };
    setCourses(newCourses);
  };

  return (
    <div className="admin-panel">
      <h2>Course Management</h2>
      <button onClick={addCourse}>Add Course</button>
      <div className="course-list">
        {courses.map((course, index) => (
          <div key={course.id} className="course-item">
            <label>Course Title:</label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={(e) => handleInputChange(e, index)}
            />
            <label>Course Description:</label>
            <textarea
              name="description"
              value={course.description}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
