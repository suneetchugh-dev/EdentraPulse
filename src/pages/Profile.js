import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';

const achievements = [
  {
    id: 'regular',
    title: 'Regular Student',
    description: 'Maintain 90%+ attendance',
    points: 100,
    icon: '👑',
    category: 'attendance'
  },
  {
    id: 'consistent',
    title: 'Consistent Learner',
    description: 'Complete all assignments for a month',
    points: 150,
    icon: '📚',
    category: 'assignments'
  },
  {
    id: 'improver',
    title: 'Great Improver',
    description: 'Improve test scores by 20%',
    points: 200,
    icon: '📈',
    category: 'academic'
  },
  {
    id: 'helper',
    title: 'Helpful Peer',
    description: 'Help 5 classmates with studies',
    points: 100,
    icon: '🤝',
    category: 'social'
  },
  {
    id: 'early',
    title: 'Early Bird',
    description: 'Submit 5 assignments before deadline',
    points: 75,
    icon: '⏰',
    category: 'assignments'
  }
];

export default function Profile({ profile }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const totalPoints = achievements.reduce((sum, a) => sum + a.points, 0);
  const earnedPoints = achievements
    .filter(a => profile.achievements?.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);

  const handleAchievementHover = (achieved) => {
    if (achieved) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <div className="page profile-page">
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} />}
      
      <h2 className="page-title">Profile</h2>
      
      <div className="profile-layout">
        <div className="card profile-detail">
          <div className="profile-header">
            <div className="profile-avatar">
              {profile.photo ? (
                <img src={profile.photo} alt="profile" className="profile-img" />
              ) : (
                <span className="profile-emoji">�‍🎓</span>
              )}
            </div>
            <div className="profile-info">
              <h3>Suneet Chugh</h3>
              <p>ID: STU2025098</p>
              <p>Class: 12th C</p>
            </div>
          </div>

          <div className="points-summary">
            <div className="points-card">
              <span className="points-value">{earnedPoints}</span>
              <span className="points-label">Points Earned</span>
            </div>
            <div className="points-card">
              <span className="points-value">{totalPoints}</span>
              <span className="points-label">Total Available</span>
            </div>
          </div>
        </div>

        <div className="card achievements-section">
          <h3>Achievements</h3>
          <div className="achievements-grid">
            {achievements.map(achievement => {
              const isAchieved = profile.achievements?.includes(achievement.id);
              return (
                <motion.div
                  key={achievement.id}
                  className={`achievement-card ${isAchieved ? 'achieved' : ''}`}
                  onHoverStart={() => handleAchievementHover(isAchieved)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="achievement-icon">
                    {achievement.icon}
                    {!isAchieved && <span className="lock-icon">🔒</span>}
                  </div>
                  <div className="achievement-info">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    <div className="achievement-points">
                      <span className="points-icon">⭐</span>
                      {achievement.points} points
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
