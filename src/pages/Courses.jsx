import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";
import api from "../services/api.js";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">All Courses</h1>
        <p className="text-sm text-slate-600">
          Choose a track and start learning with structured lessons.
        </p>
      </header>
      {status === "loading" && <p className="text-sm text-slate-500">Loading courses...</p>}
      {status === "error" && (
        <p className="text-sm text-red-500">Unable to load courses right now.</p>
      )}
      {status === "ready" && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Courses;
