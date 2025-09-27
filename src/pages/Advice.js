import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/advice.css";

const allTips = {
  attendance: [
    "Build a morning routine to never miss early classes",
    "Set multiple alarms 10 minutes apart",
    "Keep your school bag ready the night before",
    "Track your attendance streaks for motivation",
  ],
  study: [
    "Review notes within 24 hours of the class",
    "Use the Pomodoro technique: 25 minutes study, 5 minutes break",
    "Create mind maps for complex topics",
    "Teach concepts to others to master them",
  ],
  health: [
    "Get 8 hours of sleep for better focus",
    "Stay hydrated during study sessions",
    "Take regular breaks to prevent eye strain",
    "Do light exercises between study sessions",
  ],
  motivation: [
    "Set small, achievable daily goals",
    "Reward yourself for completing tasks",
    "Join study groups for accountability",
    "Visualize your long-term academic goals",
  ]
};

export default function Advice() {
  const [currentTips, setCurrentTips] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(0);

  const getRandomTips = () => {
    const tips = [];
    Object.keys(allTips).forEach(category => {
      const randomIndex = Math.floor(Math.random() * allTips[category].length);
      tips.push({
        category,
        tip: allTips[category][randomIndex]
      });
    });
    return tips;
  };

  useEffect(() => {
    // Update tips every 30 seconds
    const interval = setInterval(() => {
      setCurrentTips(getRandomTips());
      setLastUpdated(Date.now());
    }, 30000);

    // Initial tips
    if (currentTips.length === 0) {
      setCurrentTips(getRandomTips());
      setLastUpdated(Date.now());
    }

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="page advice-page">
      <h2 className="page-title">Daily Advice & Tips</h2>
      <div className="advice-grid">
        {currentTips.map((item, index) => (
          <motion.div
            key={`${item.category}-${index}`}
            className={`advice-card ${item.category}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="advice-header">
              <h3 className="advice-category">{item.category.charAt(0).toUpperCase() + item.category.slice(1)} Tip</h3>
              <span className="category-icon">
                {item.category === 'attendance' ? '📅' : 
                 item.category === 'study' ? '📚' :
                 item.category === 'health' ? '🌿' : '⭐'}
              </span>
            </div>
            <p className="advice-content">{item.tip}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
