import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard.layout";
import Register from "../pages/register";
import GeneralLayout from "../layouts/general.layout";
import MainDashboard from "../pages/main-dashboard";

const router = createBrowserRouter([
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MainDashboard />,
      },
    ],
  },
  {
    path: "/register",
    element: <GeneralLayout />,
    children: [
      {
        path: "",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <GeneralLayout />,
    children: [
      {
        path: "",
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);

export default router;
