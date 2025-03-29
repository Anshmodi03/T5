import "./App.css";
import CoursePage from "./components/Courses/CoursePage";
import MainCourse from "./components/Courses/MainCourse";
import Acheivement from "./components/Frontpage/Acheivement";
import AuthBanner from "./components/Frontpage/AuthBanner";
import { Course } from "./components/Frontpage/Course";
import FAQSection from "./components/Frontpage/FAQSection";
import Footer from "./components/Frontpage/Footer";
import Header from "./components/Frontpage/Header";
import Navbar from "./components/Frontpage/Navbar";
import Subscribe from "./components/Frontpage/Subscribe";
import Teacher from "./components/Frontpage/Teacher";
import Testimonial from "./components/Frontpage/Testimonial";

function App() {
  return (
    <>
      {/* <AuthBanner />
      <Header />
      <Navbar />
      <Course />
      <Teacher />
      <Acheivement />
      <Testimonial />
      <FAQSection />
      <Footer />
      <Subscribe /> */}
      <Header />
      <CoursePage />
      <Footer />
    </>
  );
}

export default App;
