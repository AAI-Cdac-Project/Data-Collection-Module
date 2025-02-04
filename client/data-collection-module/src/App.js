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
import SearchResults from "./components/User/SearchResults";

const approuter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute roles={["USER"]}>
        <UserDashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,  // Moved here for better error handling
    children: [
      {
        index: true, // Correct way to set default child route
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
  },
  {
    path: "/signin",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Registration />,
    errorElement: <Error />,
  },
  {
    path: "/verifier",
    element: (
      <ProtectedRoute roles={["VERIFIER"]}>
        <VerifierDashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
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
