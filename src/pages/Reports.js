import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFileDownload, FaClipboardCheck, FaUserCheck } from "react-icons/fa";
import "../styles/reports.css";

export default function Reports({ attendance }) {
  const [activeTab, setActiveTab] = useState("attendance");

  const attendanceRows = [
    { date: "2025-09-01", status: "Present", time: "09:00 AM" },
    { date: "2025-09-02", status: "Absent", time: "-" },
    { date: "2025-09-03", status: "Present", time: "08:55 AM" },
  ];

  const assignmentRows = [
    { date: "2025-09-01", assignment: "Math Quiz 1", status: "Submitted", submittedAt: "2025-09-01 14:30" },
    { date: "2025-09-02", assignment: "Physics Lab Report", status: "Submitted", submittedAt: "2025-09-02 16:45" },
    { date: "2025-09-03", assignment: "Chemistry Homework", status: "Pending", submittedAt: "-" },
  ];

  const exportToCSV = (data, filename) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    const headers = Object.keys(data[0]);
    csvContent += headers.join(",") + "\\n";
    
    // Add rows
    data.forEach(row => {
      const values = headers.map(header => `"${row[header]}"`);
      csvContent += values.join(",") + "\\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page reports-page">
      <div className="reports-header">
        <h2 className="page-title">Reports</h2>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "attendance" ? "active" : ""}`}
            onClick={() => setActiveTab("attendance")}
          >
            <FaUserCheck /> Attendance
          </button>
          <button
            className={`tab-button ${activeTab === "assignments" ? "active" : ""}`}
            onClick={() => setActiveTab("assignments")}
          >
            <FaClipboardCheck /> Assignments
          </button>
        </div>
      </div>

      <motion.div
        className="card report-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "attendance" ? (
          <>
            <div className="report-actions">
              <button
                className="export-button"
                onClick={() => exportToCSV(attendanceRows, "attendance_report")}
              >
                <FaFileDownload /> Export to CSV
              </button>
            </div>
            <table className="report-table" role="table" aria-label="Attendance report">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.time}</td>
                    <td className={`status ${row.status.toLowerCase()}`}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="report-actions">
              <button
                className="export-button"
                onClick={() => exportToCSV(assignmentRows, "assignments_report")}
              >
                <FaFileDownload /> Export to CSV
              </button>
            </div>
            <table className="report-table" role="table" aria-label="Assignments report">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Assignment</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {assignmentRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.assignment}</td>
                    <td className={`status ${row.status.toLowerCase()}`}>{row.status}</td>
                    <td>{row.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </motion.div>
    </div>
  );
}
