import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Courses from "../pages/Courses.jsx";
import CourseDetails from "../pages/CourseDetails.jsx";
import Lesson from "../pages/Lesson.jsx";
import Auth from "../pages/Auth.jsx";
import Dashboard from "../pages/Dashboard.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route path="/lessons/:lessonId" element={<Lesson />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
