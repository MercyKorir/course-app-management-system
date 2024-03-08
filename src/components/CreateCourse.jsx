import React, { useRef, useState } from "react";
import axios from "axios";
import "../styles/CreateCourse.css";
import ToastNotification from "./ToastNotification.jsx";

/**
 * CreateCourse component is a form for adding a new course.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - A function to handle closing the form.
 */
const CreateCourse = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [courseData, setCourseData] = useState({
    title: "",
    long_description: "",
    short_description: "",
    course_image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOperation, setToastOperation] = useState("");

  // Function to trigger the file input click event
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const { files } = e.target;

    if (files.length > 0) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setCourseData({
        ...courseData,
        course_image: files[0],
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="));
    const token = cookies.find((cookie) => cookie[0].trim() === "access_token");
    const access_token = token ? token[1] : null;

    try {
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("long_description", courseData.long_description);
      formData.append("short_description", courseData.short_description);
      formData.append("course_image", courseData.course_image);

      const response = await axios.post(
        "http://localhost:8080/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 201) {
        // Course created successfully
        setToastOperation("success");
        setToastMessage("Course created successfully!");
        setShowToast(true);
        setCourseData({
          title: "",
          long_description: "",
          short_description: "",
          course_image: null,
        });
        setPreviewImage(null);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
          setToastOperation("");
        }, 5000);
      } else {
        // Course creation failed
        setToastOperation("error");
        setToastMessage("Course addition failed!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
          setToastOperation("");
        }, 5000);
      }
    } catch (err) {
      // Error occurred during course creation
      setToastOperation("error");
      setToastMessage("Error Creating Course!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
        setToastOperation("");
      }, 5000);
      console.log("Error Creating Course", err);
    }
  };

  return (
    <div className="add-course-form-container">
      <div className="add-course-header">
        <h2>Add New Course</h2>
        <div className="btn-container">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Close
          </button>
          <button type="button" className="save-btn">
            Save
          </button>
        </div>
      </div>

      <div className="add-course-form">
        <div className="title-container">
          <h4>Course Content</h4>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Add form elements here */}
          <div>
            <label htmlFor="course-title">Title</label>
            <input
              type="text"
              id="course-title"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="custom-image-container">
            <label htmlFor="course-image">Course Image</label>
            <input
              type="file"
              id="course-image"
              name="course_image"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              required
            />
            <div className="upload-link">
              <button
                type="button"
                className="file-btn"
                onClick={handleFileButtonClick}
              >
                + Add Image
              </button>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Course Preview"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
              <p>
                {" "}
                or <span>add image URL</span>
              </p>
            </div>
          </div>
          <div>
            <label htmlFor="course-long-description">Long Description</label>
            <textarea
              id="course-long-description"
              name="long_description"
              value={courseData.long_description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="course-short-description">Short Description</label>
            <textarea
              id="course-short-description"
              name="short_description"
              value={courseData.short_description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="submit-btn-container">
            <button type="submit">Add Course</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
      {/* Toast notification */}
      {showToast && (
        <ToastNotification message={toastMessage} operation={toastOperation} />
      )}
    </div>
  );
};

export default CreateCourse;
