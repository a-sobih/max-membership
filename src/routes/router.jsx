import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RouteError from "./RouteError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteError />,
  },
]);

export default router;
