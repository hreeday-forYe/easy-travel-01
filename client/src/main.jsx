import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Register, Activate, Journal, Group } from "./components";
import { Provider } from "react-redux";

import {
  HomePage,
  DashBoardPage,
  EditJournalPage,
  JournalDetailPage,
  SingleJournalPage,
} from "./pages";
import AuthLayout from "./routes/AuthLayout";
import SingleGroupPage from "./pages/SingleGroupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: "/activate",
        element: (
          <AuthLayout authentication={false}>
            <Activate />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <DashBoardPage />
          </AuthLayout>
        ),
      },

      {
        path: "/groups",
        element: (
          <AuthLayout authentication={true}>
            <Group />
          </AuthLayout>
        ),
      },
      {
        path: "/groups/:id",
        element: (
          <AuthLayout authentication={true}>
            <SingleGroupPage />
          </AuthLayout>
        ),
      },

      {
        path: "/journal",
        element: (
          <AuthLayout authentication={true}>
            <JournalDetailPage />
          </AuthLayout>
        ),
      },
      {
        path: "/journal/:id",
        element: (
          <AuthLayout authentication={true}>
            <SingleJournalPage />
          </AuthLayout>
        ),
      },
      {
        path: "/journal/edit/:id",
        element: (
          <AuthLayout authentication={true}>
            <EditJournalPage />
          </AuthLayout>
        ),
      },

      // TODO: THis should be a journal Page where the User will see his journals based in pages directory...
      // TODO: The sidebar of the DASHBOARD should be a seperate component making it reusable
      // TODO: LOGOUT BUTTON SHOULD BE its seperate component that can be placed inside the DASHBOARD OR HEADER FOLDER INSIDE COMPONENTS
      // TODO: Dashboard Should not be inside the Header directory it should be standalone directory inside COMPONENTS FOLDER
      // TODO: NAVIGATION MENU SHOULD WORK PROPERLY DIRECTING TO THE SAME PAGE BUT THE ABOUT SECTION OF THE HOME PAGE
      // TODO: THERE IS Seperate folder header and nav as of now Make it one. Utilize the header as a navigation bar NO need of navigation file...
      // TODO: IMPROVE THE UI OF THE DASHBOARD SIDEBAR, LANDING PAGE LOGIN PAGE, REGISTER PAGE ETC.
      {
        path: "/journal",
        element: (
          <AuthLayout authentication={true}>
            <Journal />
          </AuthLayout>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
