import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import VerifierDashboard from "./pages/VerifierDashBoard";
import AdminDashboard from "./pages/AdminDashboard";
import FileUploadPage from "./components/User/FileUploadPage";
import UserFilesPage from "./components/User/UserFilesPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Registration from "./pages/Registration";
import FileDetailsPage from "./components/User/FileDetailsPage";
import Error from "./components/Error";
import UserDetails from "./components/User/UserDetails";
import AuthContainer from "./pages/AuthContainer";
import SearchResults from "./components/User/SearchResults";
import ForgetPassword from "./components/ForgetPassword"

const approuter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute roles={["USER"]}>
        <UserDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <UserFilesPage />,
      },
      {
        path: "fileDetails/:documentId",
        element: <FileDetailsPage />,
      },
      {
        path: "upload",
        element: <FileUploadPage />,
      },
      {
        path: "userdetails",
        element: <UserDetails />,
      },
      {
        path: "search",
        element: <SearchResults />, // Removed leading '/'
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/auth",
    element: <AuthContainer />,
    children: [
      {
        path: "", // Default route ("/auth")
        element: <Login />,
      },
      {
        path: "signup", // Will resolve to "/auth/signup"
        element: <Registration />,
      },
      {
        path: "forgetpassword", // Will resolve to "/auth/signup"
        element: <ForgetPassword/>,
      },
    ],
  },
  {
    path: "/verifier",
    element: (
      <ProtectedRoute roles={["VERIFIER"]}>
        <VerifierDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <RouterProvider router={approuter} />
    </div>
  );
}

export default App;
