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
import ForgetPassword from "./components/ForgetPassword";
import VerifierFilesPage from "./components/verifier/VerifierFilesPage";
import VerifierDetailsPage from "./components/verifier/VerifierDetailsPage";
import VerifierSideBar from "./components/verifier/VerifierSideBar";
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
        path: "forgetpassword", // Will resolve to "/auth/forgetpassword"
        element: <ForgetPassword />,
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
    children: [
      {
        path: "dashboard",
        element: <VerifierFilesPage />, // Display Verifier's files
      },
      {
        path: "fileDetails/:documentId", 
        element: <VerifierDetailsPage/>, // Verifier can view file details too
      },
        {
        path: "verifierdetails",
        element: <UserDetails />,
      },   {
      path: ":status", // single dynamic parameter
      element: (
        <div className="flex">
          <div className="w-1/4">
            <VerifierSideBar />
          </div>
          <div className="w-3/4">
            {/* Add the content based on the status */}
          </div>
        </div>
      ),
    },
    ],
    errorElement: <Error />,
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
