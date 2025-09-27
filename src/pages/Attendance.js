import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import StudentScan from "../components/StudentScan";
import "../styles/attendance.css";

export default function Attendance({ attendance, profile, onUpdateReports }) {
  const [isScanning, setIsScanning] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = { facingMode: "user" };
  const attendancePercentage = Math.round((attendance.present / Math.max(1, attendance.total)) * 100);

  useEffect(() => {
    if (attendancePercentage >= 90) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [attendancePercentage]);

  const handleStartScan = () => {
    setIsScanning(true);
    setMessage("Position your face and click Capture");
  };

  const handleCapture = () => {
    if (!webcamRef.current) return;
    webcamRef.current.getScreenshot();
    setMessage("Captured — Verifying...");

    // Simulate verification + animation
    setTimeout(() => {
      setMessage("Verification complete");
      setShowStamp(true);
      
      // Update reports when attendance is marked
      if (onUpdateReports) {
        onUpdateReports('attendance');
      }

      setTimeout(() => {
        setShowStamp(false);
        setIsScanning(false);
        setMessage(
          attendancePercentage >= 90 
            ? "🎉 Outstanding! You're a regular student!" 
            : attendancePercentage >= 75 
              ? "Great job maintaining good attendance!" 
              : "Keep improving your attendance!"
        );
      }, 1800);
    }, 2000);
  };

  return (
    <div className="page attendance-page">
      {showConfetti && <Confetti />}
      <h2 className="page-title">Attendance</h2>
      <div className="attendance-layout">
        <div className="camera-card card">
          {!isScanning ? (
            <>
              <div className="camera-placeholder">
                <div>Camera ready</div>
              </div>
              <button className="btn primary" onClick={handleStartScan}>
                <span>Start Scan</span>
                <span className="icon">📸</span>
              </button>
            </>
          ) : (
            <>
              <Webcam 
                audio={false} 
                ref={webcamRef} 
                screenshotFormat="image/jpeg" 
                videoConstraints={videoConstraints} 
                width="100%" 
              />
              {isScanning && <StudentScan />}
              <div className="camera-actions">
                <button className="btn primary" onClick={handleCapture}>
                  <span>Capture</span>
                  <span className="icon">✨</span>
                </button>
                <button 
                  className="btn ghost" 
                  onClick={() => { 
                    setIsScanning(false); 
                    setMessage(""); 
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        <div className="attendance-info card">
          <h3>{profile.name}</h3>
          <p>ID: {profile.id} • Class: {profile.class}</p>
          
          <div className="attendance-stats">
            <div className="progress">
              Present: <span className="highlight">{attendance.present}</span> / {attendance.total}
            </div>
            <div className="percentage">
              {attendancePercentage}%
            </div>
          </div>

          <div className="attendance-target">
            <span className="target-icon">🎯</span>
            <span>Target: 75% Attendance</span>
          </div>

          {attendancePercentage >= 90 && (
            <div className="achievement">
              <span className="crown">👑</span>
              <span>Regular Student Achievement</span>
            </div>
          )}

          <div className="message">{message}</div>

          <div className="animation-container">
            {isScanning && (
              <motion.div 
                className="scan-animation"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="scan-line"></div>
              </motion.div>
            )}
            {showStamp && (
              <motion.div 
                className="stamp"
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="stamp-text">Present</div>
                <div className="stamp-message">Attendance Marked</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
