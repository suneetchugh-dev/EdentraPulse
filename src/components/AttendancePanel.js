import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/*
Props:
 - attendance: { present, total }
 - onMark(deltaPresent, deltaTotal)
*/
export default function AttendancePanel({ attendance, onMark }) {
  const [isMarking, setIsMarking] = useState(false);
  const [showAnim, setShowAnim] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const [message, setMessage] = useState("");

  const percentage = Math.round((attendance.present / Math.max(1, attendance.total)) * 100);

  useEffect(() => {
    // update encouragement or tip when attendance changes
    if (percentage >= 75) setMessage("Great job! Keep your attendance above 75% 🎉");
    else setMessage("Aim for 75%+ to unlock special achievements!");
  }, [percentage]);

  const handleMarkAttendance = async () => {
    setIsMarking(true);
    setMessage("Scanning student...");

    // simulate scan delay and face detection
    setTimeout(() => {
      const faceDetected = Math.random() > 0.2; // Simulate face detection
      const isClear = Math.random() > 0.2; // Simulate image clarity check
      
      if (!faceDetected) {
        setMessage("⚠️ No face detected. Please look at the camera and try again.");
        setIsMarking(false);
        return;
      }
      
      if (!isClear) {
        setMessage("⚠️ Image is blurry. Please ensure proper lighting and try again.");
        setIsMarking(false);
        return;
      }

      setShowAnim(true);
      setMessage("✓ Face detected! Verifying...");
      
      // animation lasts 2.8s
      setTimeout(() => {
        setShowStamp(true);
        onMark(1, 1); // mark present, increment total
        setMessage("🎉 Attendance marked successfully!");
        setShowAnim(false);
        
        // after stamp, check achievement
        setTimeout(() => {
          setShowStamp(false);
          setIsMarking(false);
        }, 2000);
      }, 2800);
    }, 800);
  };

  // quick absent mark (for teacher)
  const handleMarkAbsent = () => {
    onMark(0, 1);
  };

  return (
    <div id="attendance" className="card attendance-card">
      <div className="attendance-header">
        <div className="student-info">
          <div className="student-avatar">�‍🎓</div>
          <div className="student-details">
            <h3>Suneet Chugh</h3>
            <span>12th C</span>
          </div>
        </div>
        <div className="attendance-summary">
          <div className="big-percentage">
            <strong>{percentage}%</strong>
            <span>Attendance</span>
          </div>
          <div className="counts">
            <div>Present: <strong>{attendance.present}</strong></div>
            <div>Total: <strong>{attendance.total}</strong></div>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn primary" onClick={handleMarkAttendance} disabled={isMarking}>
          {isMarking ? "Processing..." : "Mark Attendance (Scan)"}
        </button>
        <button className="btn ghost" onClick={handleMarkAbsent} disabled={isMarking}>
          Mark Absent
        </button>
      </div>

      <div className="encourage">
        <div className={`encircle ${percentage >= 75 ? "good" : "warn"}`}>
          {percentage >= 75 ? (
            <div className="cheer">🎉 Keep it up — Above 75%!</div>
          ) : (
            <div className="cheer">💪 Aim for 75%+</div>
          )}
        </div>
      </div>

      <div className="anim-area">
        {/* Student scan animation */}
        {showAnim && (
          <div className="scan-area">
            <div className="door">
              <div className="door-inner" />
            </div>
            <div className="student">
              <div className="head" />
              <div className="body" />
            </div>
            <div className="scan-rays" />
          </div>
        )}

        {/* Stamp animation */}
        {showStamp && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="stamp"
          >
            <div className="stamp-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="stamp-text">Verified!</div>
            <div className="stamp-message">Achievement Unlocked 🎉</div>
          </motion.div>
        )}
      </div>

      <div className="hint">
        <small>{message}</small>
      </div>
    </div>
  );
}
