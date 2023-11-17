import App from "@/app/App";
import { Routes } from "@/app/lib/routes";
import MainLayout from "@/layouts/MainLayout";
import { LoginPage } from "@/pages/login";
import { MessagesPage } from "@/pages/messages";
import UsersPage from "@/pages/users";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: Routes.NEWS,
    element: <App />,
    children: [
      {
        path: Routes.NEWS,
        element: <MainLayout />,
        children: [
          { path: Routes.USERS, element: <UsersPage /> },
          { path: Routes.Login, element: <LoginPage /> },
          { path: Routes.Messages, element: <MessagesPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
