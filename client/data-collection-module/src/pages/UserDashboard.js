import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/User/UserNavbar";
import Navbar from "../components/Navbar";
import FileList from "../components/User/FileList";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Section */}
      <div className="flex flex-grow pt-16">
        {/* Sidebar Section */}
        <aside className="w-1/4 p-6 bg-white shadow-lg border-r border-gray-200">
          <FileList />
        </aside>

        {/* Content Section */}
        <main className="flex-grow p-8 space-y-8">
          {/* User-Specific Navigation */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserNavbar />
          </div>

          {/* Dynamic Content */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
