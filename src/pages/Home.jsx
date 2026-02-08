import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">
          E-Learning Platform
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
          Build skills with immersive courses and guided lessons.
        </h1>
        <p className="text-base text-slate-600">
          Explore curated programs, follow structured lesson paths, and track your
          progress from a personalized dashboard.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/courses"
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Browse Courses
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300"
          >
            Go to Dashboard
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Guided Paths", value: "30+" },
            { label: "Expert Instructors", value: "15" },
            { label: "Video Lessons", value: "150" }
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Learning Journey</h2>
        <p className="mt-2 text-sm text-slate-600">
          Pick a course, watch lessons, and keep track of your progress from anywhere.
        </p>
        <div className="mt-6 space-y-4">
          {[
            "Browse curated course collections",
            "Dive into lesson-by-lesson video content",
            "Track completion across your dashboard"
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                ✓
              </span>
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
