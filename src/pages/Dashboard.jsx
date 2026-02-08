import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const USER_ID = 1;
const STORAGE_KEY = "lessonProgress";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, lessonsRes, enrollmentsRes] = await Promise.all([
          api.get("/courses"),
          api.get("/lessons"),
          api.get(`/enrollments?userId=${USER_ID}`)
        ]);

        setCourses(coursesRes.data);
        setLessons(lessonsRes.data);
        setEnrollments(enrollmentsRes.data);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  const progressMap = useMemo(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }, []);

  const enrolledCourses = useMemo(() => {
    return enrollments
      .map((enrollment) => courses.find((course) => course.id === enrollment.courseId))
      .filter(Boolean);
  }, [courses, enrollments]);

  const overallProgress = useMemo(() => {
    if (!enrolledCourses.length) return 0;
    const percents = enrolledCourses.map((course) => {
      const courseLessons = lessons.filter((lesson) => lesson.courseId === course.id);
      if (!courseLessons.length) return 0;
      const completed = courseLessons.filter(
        (lesson) => progressMap[lesson.id]?.completed
      ).length;
      return Math.round((completed / courseLessons.length) * 100);
    });
    const total = percents.reduce((sum, value) => sum + value, 0);
    return Math.round(total / percents.length);
  }, [enrolledCourses, lessons, progressMap]);

  if (status === "loading") {
    return <p className="text-sm text-slate-500">Loading dashboard...</p>;
  }

  if (status === "error") {
    return <p className="text-sm text-red-500">Unable to load dashboard.</p>;
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-700">Student Dashboard</p>
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back, Student</h1>
          <p className="text-sm text-slate-600">
            Track your enrolled courses and keep moving forward.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">Overall progress</p>
          <p className="text-2xl font-semibold text-slate-900">{overallProgress}%</p>
        </div>
      </header>

      {enrolledCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <p className="text-sm text-slate-600">No courses enrolled yet.</p>
          <Link
            to="/courses"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {enrolledCourses.map((course) => {
            const courseLessons = lessons.filter((lesson) => lesson.courseId === course.id);
            const completed = courseLessons.filter(
              (lesson) => progressMap[lesson.id]?.completed
            ).length;
            const percent = courseLessons.length
              ? Math.round((completed / courseLessons.length) * 100)
              : 0;

            return (
              <div key={course.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-700">
                      {course.category}
                    </p>
                    <h2 className="text-lg font-semibold text-slate-900">{course.title}</h2>
                    <p className="text-xs text-slate-500">{course.lessonsCount} lessons</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {percent}%
                  </span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{completed} completed</span>
                  <Link to={`/courses/${course.id}`} className="font-semibold text-brand-700">
                    View course
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
