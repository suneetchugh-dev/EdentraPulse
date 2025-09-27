import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Curriculum from "./pages/Curriculum";
import Advice from "./pages/Advice";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
