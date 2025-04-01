"use client";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CoursesPage from "./CoursesPage";
import CourseDetail from "./CourseDetail";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const CoursesIndex = ({ setCursorVariant }) => {
  const location = useLocation();

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<CoursesPage setCursorVariant={setCursorVariant} />}
          />
          <Route
            path="/:courseId"
            element={<CourseDetail setCursorVariant={setCursorVariant} />}
          />
        </Routes>
      </AnimatePresence>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default CoursesIndex;

// do these changes

// Make the courses section have the Header.jsx and footer.jsx both in viewing the courses area and in the learn more section also
// make all the courses about engineering , mediacal and school ralted
// Use the given App.jsx instead of the one you are already using an in the App.jsx dont chage the import lcation of files
// and in the courses make the courses and different gradeient not the same gradient for all the courses
// when hovered over the Header.jsx tabs make it display it dropdown instead of clicking to reveal the dropdown

// better the overall quality and desing and animation and all
