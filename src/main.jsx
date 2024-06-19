/** @format */

import React from "react";
import MyHome from "./pages/Home/Home";
import "./index.css";
import App from "./App";
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, } from "react-router-dom";
import MyHistory from "./pages/History/History";

import ReactDOM from "react-dom/client";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "history",
        element: <MyHistory />,
      },
      {
        path: "/",
        element: <MyHome />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(


  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
