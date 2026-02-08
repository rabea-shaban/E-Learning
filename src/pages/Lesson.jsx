import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LessonCard from "../components/LessonCard.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import api from "../services/api.js";

const STORAGE_KEY = "lessonProgress";

const getStoredProgress = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
};

const setStoredProgress = (progress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

const Lesson = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data: lessonData } = await api.get(`/lessons/${lessonId}`);
        const [courseRes, lessonsRes] = await Promise.all([
          api.get(`/courses/${lessonData.courseId}`),
          api.get(`/lessons?courseId=${lessonData.courseId}`)
        ]);

        setLesson(lessonData);
        setCourse(courseRes.data);
        setLessons(lessonsRes.data);
        const stored = getStoredProgress();
        setProgress(stored[lessonId]?.percent || 0);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchLesson();
  }, [lessonId]);

  const nextLesson = useMemo(() => {
    if (!lessons.length) return null;
    const index = lessons.findIndex((item) => item.id === Number(lessonId));
    return lessons[index + 1] || null;
  }, [lessons, lessonId]);

  const handleProgress = (state) => {
    const percent = Math.min(100, Math.round(state.played * 100));
    setProgress(percent);
    const stored = getStoredProgress();
    stored[lessonId] = { percent, completed: percent === 100 };
    setStoredProgress(stored);
  };

  const handleEnded = () => {
    const stored = getStoredProgress();
    stored[lessonId] = { percent: 100, completed: true };
    setStoredProgress(stored);
    setProgress(100);
  };

  if (status === "loading") {
    return <p className="text-sm text-slate-500">Loading lesson...</p>;
  }

  if (status === "error" || !lesson) {
    return <p className="text-sm text-red-500">Unable to load this lesson.</p>;
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-700">{course?.title}</p>
          <h1 className="text-2xl font-semibold text-slate-900">{lesson.title}</h1>
          <p className="text-sm text-slate-600">{lesson.summary}</p>
        </div>
        <VideoPlayer url={lesson.videoUrl} onProgress={handleProgress} onEnded={handleEnded} />
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">Lesson progress</p>
            <p className="text-sm text-slate-500">{progress}%</p>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          {nextLesson && (
            <Link
              to={`/lessons/${nextLesson.id}`}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-300"
            >
              Next Lesson: {nextLesson.title}
            </Link>
          )}
        </div>
      </div>
      <aside className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Lesson list</h2>
          <div className="mt-4 space-y-3">
            {lessons.map((item) => (
              <LessonCard key={item.id} lesson={item} isActive={item.id === Number(lessonId)} />
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Lesson;
