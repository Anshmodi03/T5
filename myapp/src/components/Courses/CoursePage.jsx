import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainCourse from "./MainCourse";
import CourseDetailPage from "./CourseDetailPage";

const CoursePage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainCourse />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
      </Routes>
    </Router>
  );
};

export default CoursePage;
