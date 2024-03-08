import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import CourseList from "./components/CourseList.jsx";
import Login from "./components/Login.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import SignUp from "./components/Signup.jsx";
import SampleComponent from "./components/SampleComponent.jsx";
import EditCourse from "./components/EditCourse.jsx";
import UserNavigation from "./components/UserNavigation.jsx";

/**
 * App Component which is the main entry point for the application
 * It sets up the routes for the application and renders the components
 */
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route for the home page */}
        <Route
          path="/"
          element={
            <>
              <UserNavigation extraLoadTime={2200} />
              <CourseList />
            </>
          }
        />
        {/*Route for the login page*/}
        <Route
          path="/login"
          element={
            <>
              <UserNavigation />
              <AuthWrapper formType={"login"}>
                <Login />
              </AuthWrapper>
            </>
          }
        />
        {/*Route for the register page*/}
        <Route
          path="/register"
          element={
            <>
              <UserNavigation />
              <AuthWrapper formType={"signup"}>
                <SignUp />
              </AuthWrapper>
            </>
          }
        />
        {/*Route for the admin page*/}
        <Route path="/admin" element={<SampleComponent />} />
        {/*Route for the edit course page*/}
        <Route path="/edit" element={<EditCourse />} />
      </Routes>
    </div>
  );
}

export default App;
