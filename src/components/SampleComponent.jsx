import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/SampleComponent.css";
import CreateCourse from "./CreateCourse.jsx";
import styles from "../styles/Common.module.css";

const SampleComponent = () => {
  const [courses, setCourse] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortType, setSortType] = useState("default");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState("");

  useEffect(() => {
    // Check if user is logged in using access_token cookie, if not redirect to login page
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="));
    const token = cookies.find((cookie) => cookie[0].trim() === "access_token");
    const access_token = token ? token[1] : null;

    if (!access_token) {
      setAuthorized(false);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      // navigate("/login");
    }

    const verifyUser = async () => {
      const data = {
        token: access_token,
        token_type_hint: "access_token",
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/user/verify",
          new URLSearchParams(data),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.data.status === 200) {
          setAuthorized(true);
        } else if (response.data.status === 401) {
          setAuthorized(false);
          // If user is not verified, redirect to login page
          // navigate("/login");
        } else {
          console.error("Error Verifying user: ", response);
          setErrorMessage("Error verifying user. Please try again.");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setAuthorized(false);
          // If user is not verified, redirect to login page
          // navigate("/login");
        } else {
          console.error("Error Verifying user: ", err);
          setErrorMessage("Error verifying user. Please try again.");
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    verifyUser();
  }, [navigate]);

  const fetchCourses = useCallback(async () => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="));
    const token = cookies.find((cookie) => cookie[0].trim() === "access_token");
    const access_token = token ? token[1] : null;
    try {
      const response = await axios.get("http://localhost:8080/course", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.data.status === 200) {
        setCourse(response.data.data);
        setShowEmptyMessage("");
      } else if (response.data.status === 404) {
        setCourse([]);
        setShowEmptyMessage("Add Items to display");
      } else {
        console.error("Error fetching courses: ", response);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setCourse([]);
        setShowEmptyMessage("No Items to display");
      } else {
        console.error("Error fetching courses: ", err);
      }
    }
  }, []);

  useEffect(() => {
    if (authorized) {
      fetchCourses();
    }
  }, [authorized, fetchCourses]);

  // useEffect(() => {
  //   if (authorized) {
  //     console.log("Selected courses: ", selectedCourses);
  //   }
  // }, [selectedCourses, authorized]);

  const handleRefreshList = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      fetchCourses();
      setIsRefreshing(false);
    }, 2000);
  };

  const handleShowAddCourse = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleFormClose = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const handleSelectAll = () => {
    if (selectedCourses.length === courses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(courses.map((course) => course.course_id));
    }
  };

  const handleSelectCourse = (id) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter((courseId) => courseId !== id));
    } else {
      setSelectedCourses([...selectedCourses, id]);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="));
    const token = cookies.find((cookie) => cookie[0].trim() === "access_token");
    const access_token = token ? token[1] : null;
    try {
      const response = await axios.delete(
        `http://localhost:8080/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchCourses();
      } else {
        console.error("Error deleting course: ", response);
      }
    } catch (err) {
      alert("Error deleting course. Please try again.");
      console.error("Error deleting course: ", err);
    }
  };

  const handleDeleteSelectedCourses = async () => {
    try {
      if (selectedCourses.length === 0) {
        return;
      }
      if (selectedCourses.length > 1) {
        selectedCourses.forEach(async (courseId) => {
          handleDeleteCourse(courseId);
        });
      } else if (selectedCourses.length === 1) {
        handleDeleteCourse(selectedCourses[0]);
      }
      setSelectedCourses([]);
      alert("Courses deleted successfully.");
    } catch (err) {
      alert("Error deleting courses. Please try again.");
      console.error("Error deleting courses: ", err);
    }
  };

  const handleLogout = async () => {
    try {
      const cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="));
      const token = cookies.find(
        (cookie) => cookie[0].trim() === "access_token"
      );
      const access_token = token ? token[1] : null;

      const data = {
        token: access_token,
        token_type_hint: "access_token",
      };

      const response = await axios.post(
        "http://localhost:8080/user/logout",
        new URLSearchParams(data),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 200) {
        setLoading(true);
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 2000);
      } else {
        console.error("Error logging out: ", response);
      }
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  const sortCourses = (courses) => {
    return courses.slice().sort((a, b) => {
      switch (sortType) {
        case "recent":
          return sortOrder === "asc"
            ? new Date(b.created_at) - new Date(a.created_at)
            : new Date(a.created_at) - new Date(b.created_at);
        case "title":
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);

        default:
          return 0;
      }
    });
  };

  const handleSort = (category) => {
    if (category === "default") {
      return;
    }

    setSortType(category);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = () => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleShowManage = (e) => {
    e.preventDefault();
    setShowManage(true);
    setShowDone(true);
  };

  const handleDoneShowManage = (e) => {
    e.preventDefault();
    setShowManage(false);
    setShowDone(false);
  };

  const handleGoHome = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  return loading ? (
    <div className={styles.ldsRipple}>
      <div></div>
      <div></div>
    </div>
  ) : authorized ? (
    <div className="cms-container">
      <div className="header-row">
        <div className="header-course-no">
          <div className="title">Course</div>
          <div className="course-no">{courses.length} Courses</div>
        </div>
        <div className="btn-container">
          {showDone ? (
            <button
              type="button"
              className="manage-course-btn"
              onClick={handleDoneShowManage}
            >
              Done
            </button>
          ) : (
            courses.length > 0 && (
              <button
                type="button"
                className="manage-course-btn"
                onClick={handleShowManage}
              >
                Manage Course
              </button>
            )
          )}

          <button
            type="button"
            className="add-course-btn"
            style={{ marginLeft: "10px" }}
            onClick={handleShowAddCourse}
          >
            + Add Course
          </button>
          <button
            type="button"
            className="add-course-btn"
            style={{ marginLeft: "10px" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="title-row">
        <div className="refresh-container">
          <h3>Course List</h3>
          <p
            onClick={handleRefreshList}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>
              <CachedIcon />
            </span>{" "}
            refresh list
          </p>
          {selectedCourses.length > 0 && (
            <div className="deleteIconContainer">
              <DeleteIcon onClick={handleDeleteSelectedCourses} />
            </div>
          )}
        </div>
        <div className="sort-filter-search">
          {/* <button className="sort-btn">Sort</button> */}
          <select
            name="sort-category"
            id="sortCategory"
            value={sortType}
            onChange={(e) => handleSort(e.target.value)}
            className="sort-type"
          >
            <option value="default">Sort</option>
            <option value="recent">
              Recent {sortOrder === "asc" ? "↑" : "↓"}
            </option>
            <option value="title">
              Title {sortOrder === "asc" ? "↑" : "↓"}
            </option>
          </select>
          <button className="filter-btn">Filter</button>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onMouseEnter={
              handleSearch
            } /* Change to on pressing of enter in keyboard */
          />
        </div>
      </div>
      <div className="course-content">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="selectAll"
                  name="selectAll"
                  onChange={handleSelectAll}
                />
              </th>
              <th>No.</th>
              <th>Title</th>
              <th>Image</th>
              <th>Long Description</th>
              <th>Short Description</th>
            </tr>
          </thead>
          <tbody>
            {isRefreshing ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <div className={styles.ldsDualRing}></div>
                  <h3>Refreshing</h3>
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <h4 style={{ color: "GrayText" }}>{showEmptyMessage}</h4>
                </td>
              </tr>
            ) : (
              sortCourses(handleSearch()).map((course, index) => (
                <tr key={course.course_id}>
                  <td>
                    <input
                      type="checkbox"
                      id={`courseNo${course.course_id}`}
                      checked={selectedCourses.includes(course.course_id)}
                      onChange={() => handleSelectCourse(course.course_id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    {course.title}{" "}
                    {showManage && (
                      <div>
                        <EditIcon
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "10px",
                            color: "GrayText",
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                          }}
                        />
                        {/* <DeleteIcon
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#ff00009b",
                          }}
                        /> */}
                      </div>
                    )}
                  </td>
                  <td>
                    {/* Update the path to the folder uploads in backend */}
                    <img
                      src={`/assets/uploads/${course.course_image}`}
                      alt={course.title}
                      className={styles.courseImg}
                    ></img>
                  </td>
                  <td>{course.long_description}</td>
                  <td>{course.short_description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showForm && <CreateCourse onClose={handleFormClose} />}
    </div>
  ) : (
    <div>
      <h1>Unauthorized</h1>
      {errorMessage && <p>{errorMessage}</p>}
      Go <span onClick={handleGoHome}>Home</span>
    </div>
  );
};

export default SampleComponent;
