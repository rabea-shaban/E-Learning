const Auth = () => {
  return (
    <section className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-600">
          Sign in to continue your learning journey or create a new account.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Login</h2>
          <form className="mt-4 space-y-4">
            <label className="block text-xs font-semibold uppercase text-slate-500">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-semibold uppercase text-slate-500">
              Password
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
              />
            </label>
            <button
              type="button"
              className="w-full rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Create account</h2>
        <form className="mt-4 space-y-4">
          <label className="block text-xs font-semibold uppercase text-slate-500">
            Full name
            <input
              type="text"
              placeholder="Alex Johnson"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-slate-500">
            Email
            <input
              type="email"
              placeholder="alex@example.com"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-slate-500">
            Password
            <input
              type="password"
              placeholder="Create a password"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-xl border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
