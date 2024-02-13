import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import CourseList from "./components/CourseList.jsx";
import Login from "./components/Login.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import SignUp from "./components/Signup.jsx";
import SampleComponent from "./components/SampleComponent.jsx";
import EditCourse from "./components/EditCourse.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route
          path="/login"
          element={
            <AuthWrapper formType={"login"}>
              <Login />
            </AuthWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <AuthWrapper formType={"signup"}>
              <SignUp />
            </AuthWrapper>
          }
        />
        <Route path="/admin" element={<SampleComponent />} />
        <Route path="/edit" element={<EditCourse />} />
      </Routes>
    </div>
  );
}

export default App;
