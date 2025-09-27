import React, { useState } from "react";
import { motion } from "framer-motion";
import "./CurriculumWheel.css";

export default function CurriculumWheel({ data }) {
  const categories = Object.keys(data);
  const getTopicsForCategory = (category) => data[category].topics || [];
  const [angle, setAngle] = useState(0);
  const [activeCat, setActiveCat] = useState(null);
  const [subAngle, setSubAngle] = useState(0);
  const [subActive, setSubActive] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const deg = 2000 + Math.random() * 2000;
    setAngle((a) => a + deg);
    setTimeout(() => {
      const sectors = categories.length;
      const final = (angle + deg) % 360;
      const sectorSize = 360 / sectors;
      const landedIndex = Math.floor((360 - final + sectorSize / 2) / sectorSize) % sectors;
      setActiveCat(categories[landedIndex]);
      setIsSpinning(false);
    }, 2400);
  };

  const handleSpinSub = () => {
    if (isSpinning || !activeCat) return;
    setIsSpinning(true);
    const deg = 2000 + Math.random() * 2000;
    setSubAngle((a) => a + deg);
    setTimeout(() => {
      const subs = getTopicsForCategory(activeCat);
      const final = (subAngle + deg) % 360;
      const sectorSize = 360 / Math.max(1, subs.length);
      const landedIndex = Math.floor((360 - final + sectorSize / 2) / sectorSize) % subs.length;
      setSubActive(subs[landedIndex]);
      setIsSpinning(false);
    }, 2400);
  };

  return (
    <div id="curriculum" className="card wheel-card">
      <h2>Curriculum Wheel</h2>
      <div className="wheel-area">
        <div className="wheel-container">
          <motion.div
            className="wheel"
            animate={{ rotate: angle }}
            transition={{ duration: 2.4, ease: "easeOut" }}
            style={{ transformOrigin: "50% 50%" }}
          >
            {categories.map((cat, idx) => {
              const rotateDeg = (360 / categories.length) * idx;
              return (
                <div
                  key={cat}
                  className="sector"
                  style={{ transform: `rotate(${rotateDeg}deg) translateY(-50%)` }}
                >
                  <span>{cat}</span>
                </div>
              );
            })}
          </motion.div>

        </div>

        <div className="wheel-controls">
          <div className="wheel-buttons">
            <button className="wheel-btn" onClick={handleSpin}>
              Spin Main Wheel
            </button>
          </div>

          {activeCat && (
            <div className="subsection">
              <h3>Selected: {activeCat}</h3>
              <div className="sub-wheel-container">
                <motion.div
                  className="wheel sub"
                  animate={{ rotate: subAngle }}
                  transition={{ duration: 2.4, ease: "easeOut" }}
                >
                  {getTopicsForCategory(activeCat).map((topic, i) => {
                    const rotateDeg = (360 / getTopicsForCategory(activeCat).length) * i;
                    const progress = data[activeCat].progress[topic];
                    return (
                      <div 
                        className="sector sub" 
                        key={topic} 
                        style={{ 
                          transform: `rotate(${rotateDeg}deg) translateY(-40%)`,
                          transformOrigin: '50% 50%'
                        }}
                      >
                        <span style={{ transform: `rotate(${-subAngle}deg)` }}>{topic}</span>
                        <div className="progress-container" style={{ transform: `rotate(${-subAngle}deg)` }}>
                          <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
                <div className="wheel-buttons">
                  <button className="wheel-btn" onClick={handleSpinSub}>
                    Spin Sub-Wheel
                  </button>
                </div>
              </div>
              {subActive && (
                <div className="sub-selection">
                  Selected Topic: <strong>{subActive}</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
