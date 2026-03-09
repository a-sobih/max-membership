import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCcw, Bug } from "lucide-react";

function RouteError() {
  const error = useRouteError();
  console.log(import.meta.env);

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";
  let status = null;

  // 1️⃣ React Router response errors (loader / action / 404)
  if (isRouteErrorResponse(error)) {
    status = error.status;

    if (error.status === 404) {
      title = "Page not found";
      message = "The page you’re looking for doesn’t exist or was moved.";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You don’t have permission to access this page.";
    } else if (error.status === 500) {
      title = "Server error";
      message = "Something went wrong on the server.";
    } else {
      title = error.statusText || title;
      message = error.data || message;
    }
  }

  // 2️⃣ JS runtime/render errors
  else if (error instanceof Error) {
    message = error.message;
  }

  // 3️⃣ Unknown errors
  else if (typeof error === "string") {
    message = error;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="max-w-xl w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="text-red-600" size={28} />
        </div>

        {/* Status code */}
        {status && (
          <div className="text-sm font-medium text-red-500 mb-2">
            Error {status}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-2">
          {title}
        </h1>

        {/* Message */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          {message}
        </p>

        {/* Dev error details */}
        {import.meta.env.DEV && error instanceof Error && (
          <div className="mb-6 text-left text-xs p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-red-600 overflow-auto">
            <div className="flex items-center gap-2 mb-2 font-semibold">
              <Bug size={14} />
              Error details
            </div>
            <pre className="whitespace-pre-wrap wrap-break-word">
              {error.stack}
            </pre>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition"
          >
            <RefreshCcw size={16} />
            Reload page
          </button>

          <Link
            to="/"
            replace
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RouteError;
