import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coachTips from "../services/coachTips";
import "../styles/sidebar.css";

export default function Sidebar({ profile, attendance }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const percentage = Math.round((attendance.present / Math.max(1, attendance.total)) * 100);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % coachTips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.aside
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      animate={{ width: isCollapsed ? '80px' : '260px' }}
      transition={{ duration: 0.3 }}
    >
      <button 
        className="collapse-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <motion.div 
        className="profile-card card"
        animate={{ opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <img 
          src={profile.photo || "👨‍🎓"} 
          className="profile-img" 
          alt={profile.name}
        />
        {!isCollapsed && (
          <div className="profile-info">
            <strong>{profile.name}</strong>
            <small>{profile.id}</small>
            <div className="att-mini">
              Attendance: <strong>{percentage}%</strong>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-filled" 
                style={{ width: `${percentage}%` }} 
              />
            </div>
          </div>
        )}
      </motion.div>

      {!isCollapsed && (
        <>
          <motion.div 
            className="badges card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h4>Badges</h4>
            <div className="badge-list">
              <div className={`badge ${percentage >= 75 ? "unlocked" : ""}`}>
                75%+ Attendance
              </div>
              <div className="badge unlocked">
                Top Consistent
              </div>
              <div className="badge">
                Top Participant
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="coach card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4>Coach Tip</h4>
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="coach-tip"
            >
              {coachTips[currentTip]}
            </motion.p>
          </motion.div>
        </>
      )}
    </motion.aside>
  );
}
