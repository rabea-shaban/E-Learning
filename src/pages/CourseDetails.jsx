import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LessonCard from "../components/LessonCard.jsx";
import api from "../services/api.js";

const USER_ID = 1;

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, lessonsRes, enrollmentsRes] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/lessons?courseId=${courseId}`),
          api.get(`/enrollments?courseId=${courseId}&userId=${USER_ID}`)
        ]);

        setCourse(courseRes.data);
        setLessons(lessonsRes.data);
        setEnrolled(enrollmentsRes.data.length > 0);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchData();
  }, [courseId]);

  const introLesson = useMemo(() => lessons[0], [lessons]);

  const handleEnroll = async () => {
    try {
      await api.post("/enrollments", {
        userId: USER_ID,
        courseId: Number(courseId)
      });
      setEnrolled(true);
    } catch (error) {
      setEnrolled(true);
    }
  };

  if (status === "loading") {
    return <p className="text-sm text-slate-500">Loading course details...</p>;
  }

  if (status === "error" || !course) {
    return <p className="text-sm text-red-500">Unable to load this course.</p>;
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-brand-700">{course.category}</p>
          <h1 className="text-3xl font-semibold text-slate-900">{course.title}</h1>
          <p className="text-sm text-slate-600">{course.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
            {course.level}
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
            {course.duration} hrs
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
            {course.lessonsCount} lessons
          </span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Course overview</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {course.objectives.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-500"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          {introLesson && (
            <Link
              to={`/lessons/${introLesson.id}`}
              className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Start Learning
            </Link>
          )}
          <button
            type="button"
            onClick={handleEnroll}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300"
          >
            {enrolled ? "Enrolled" : "Enroll Now"}
          </button>
        </div>
      </div>
      <aside className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Lessons</h2>
          <p className="text-xs text-slate-500">Choose a lesson to continue.</p>
          <div className="mt-4 space-y-3">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
};

export default CourseDetails;
