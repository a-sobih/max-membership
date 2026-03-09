// 1 =>  React Router(Declarative) هنستخدم الكومبوننت ده لو مستخدمين
// 2 =>   App حوالين ال  Error Boundary Component ساعتها هنحط
// 3 => watch this video => https://www.youtube.com/watch?v=OQQAv8t3bfc

import { RefreshCcw, Home } from "lucide-react";

function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  const message =
    error?.error?.message ||
    error?.message ||
    error?.statusText ||
    (typeof error === "string" ? error : null) ||
    "Unexpected error occurred";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg p-8 text-center">
        {/* icon */}
        <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30">
          <span className="text-red-600 text-xl font-bold">!</span>
        </div>

        {/* title */}
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-2">
          Something went wrong
        </h2>

        {/* description */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          An unexpected error occurred. Try refreshing the page or go back home.
        </p>

        {/* error message */}

        <div className="mb-6 p-3 text-center text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 text-red-600 wrap-break-word">
          {message}
        </div>

        {/* actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition"
          >
            <RefreshCcw size={16} />
            Try again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <Home size={16} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
