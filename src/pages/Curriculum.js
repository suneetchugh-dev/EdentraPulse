import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/curriculum.css";

export default function Curriculum({ curriculum }) {
  const categories = Object.keys(curriculum);
  const [selected, setSelected] = useState(null);
  const [subSelected, setSubSelected] = useState(null);

  const handleCategorySelect = (category) => {
    setSelected(category);
    setSubSelected(null);
  };

  const handleSubtopicSelect = (subtopic) => {
    setSubSelected(subtopic);
  };

  return (
    <div className="page curriculum-page">
      <div className="curriculum-header">
        <h2 className="page-title">
          <span className="target-icon">🎯</span>
          {selected ? selected : "Curriculum"}
        </h2>
        {selected && (
          <motion.button
            className="back-button"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ← Back to Main Subjects
          </motion.button>
        )}
      </div>
      
      <div className="curriculum-grid">
        {!selected ? (
          <>
            {categories.map((category, index) => (
              <motion.div
                key={category}
                className="curriculum-card"
                onClick={() => handleCategorySelect(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>{category}</h3>
                <div className="curriculum-progress">
                  <div className="progress-bar">
                    <div className="progress-filled" style={{ width: '60%' }}></div>
                  </div>
                  <span className="progress-text">60% Complete</span>
                </div>
              </motion.div>
            ))}
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={`coming-soon-${index}`}
                className="curriculum-card coming-soon"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (categories.length + index) * 0.1 }}
              >
                <h3>Coming Soon</h3>
                <div className="coming-soon-label">New content arriving soon!</div>
              </motion.div>
            ))}
          </>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            className="subtopics-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="subtopics-grid">
              {curriculum[selected].map((subtopic, index) => (
                <motion.div
                  key={subtopic}
                  className={`subtopic-card ${subSelected === subtopic ? 'selected' : ''}`}
                  onClick={() => handleSubtopicSelect(subtopic)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="subtopic-name">{subtopic}</span>
                  <motion.div 
                    className="subtopic-status"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    🎯
                  </motion.div>
                </motion.div>
              ))}
              {[1, 2].map((_, index) => (
                <motion.div
                  key={`subtopic-coming-soon-${index}`}
                  className="subtopic-card coming-soon"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (curriculum[selected].length + index) * 0.1 }}
                >
                  <span className="subtopic-name">Coming Soon</span>
                  <div className="coming-soon-label">Stay tuned!</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
