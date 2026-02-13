import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import Home from "./components/Home.jsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import Register from "./pages/Users/Register.jsx";
import Login from "./pages/Users/Login.jsx";
import AccountInfo from "./pages/Users/AccountInfo.jsx";
import UpdateInfo from "./pages/Users/UpdateInfo.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import UpdateByAdmin from "./pages/Admin/UpdateByAdmin.jsx";
import CreateCategory from "./pages/Category/CreateCategory.jsx";
import CategoryList from "./pages/Category/CategoryList.jsx";
import TasksByCat from "./pages/Category/TasksByCat.jsx";
import TaskDetail from "./pages/Tasks/TaskDetail.jsx";
import TaskDetail2 from "./pages/Tasks/TaskDetail2.jsx";
import CreateTask from "./pages/Tasks/CreateTask.jsx";
import VitalTask from "./pages/Tasks/VitalTask.jsx";
import TaskSummary from "./pages/Tasks/TaskSmmary.jsx";
import Dashboard from "./components/Dashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // { path: "nav", element: <Nav /> },
      // { path: "sidebar", element: <Sidebar /> },
      {
        path: "register",
        element: <Register />,
      },
      { path: "login", element: <Login /> },
      {
        path: "userInfo",
        element: <AccountInfo />,
        children: [{ path: "update-user", element: <UpdateInfo /> }],
      },
      {
        path: "admin-menu",
        element: <AdminDashboard />,
      },
      {
        path: "category",
        element: <CreateCategory />,
      },
      {
        path: "category-list",
        element: <CategoryList />,
      },
      { path: "task-by-cat", element: <TasksByCat /> },
      {
        path: "tasks",
        element: <TaskDetail />,
        children: [{ index: true, element: <TaskDetail2 /> }],
      },
      { path: "create-task", element: <CreateTask /> },
      {
        path: "vital-task",
        element: <VitalTask />,
        children: [{ index: true, element: <TaskDetail2 /> }],
      },
      { path: "task-summary", element: <TaskSummary /> },
      { index: true, element: <Dashboard /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
