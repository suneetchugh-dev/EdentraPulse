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
import { sampleProfile, sampleAttendance, sampleCurriculum } from "./services/mockData";
import "./styles/layout.css";

const App = () => {
  return (
    <div className="app-container">
      <Sidebar profile={sampleProfile} attendance={sampleAttendance} />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard attendance={sampleAttendance} curriculum={sampleCurriculum} profile={sampleProfile} />} />
            <Route path="/attendance" element={<Attendance attendance={sampleAttendance} profile={sampleProfile} />} />
            <Route path="/curriculum" element={<Curriculum curriculum={sampleCurriculum} />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/reports" element={<Reports attendance={sampleAttendance} />} />
            <Route path="/analytics" element={<Analytics attendance={sampleAttendance} />} />
            <Route path="/profile" element={<Profile profile={sampleProfile} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
