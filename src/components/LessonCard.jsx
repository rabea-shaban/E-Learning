import { Link } from "react-router-dom";

const LessonCard = ({ lesson, isActive }) => {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
        isActive
          ? "border-brand-500 bg-brand-50 text-brand-700"
          : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
      }`}
    >
      <div>
        <p className="font-semibold text-slate-900">{lesson.title}</p>
        <p className="text-xs text-slate-500">{lesson.duration} min</p>
      </div>
      <span className="text-xs font-medium">Watch</span>
    </Link>
  );
};

export default LessonCard;
