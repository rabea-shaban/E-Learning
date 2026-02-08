import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-700">{course.category}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{course.title}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {course.level}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600 line-clamp-3">{course.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{course.duration} hrs</span>
        <span>{course.lessonsCount} lessons</span>
      </div>
      <Link
        to={`/courses/${course.id}`}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default CourseCard;
