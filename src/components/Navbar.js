import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, 
  FaUserGraduate, 
  FaSchool, 
  FaLightbulb, 
  FaFileAlt, 
  FaChartLine,
  FaBars,
  FaBook,
  FaGraduationCap,
  FaClipboardCheck
} from "react-icons/fa";
import "../styles/navbar.css";

const links = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard" },
  { to: "/attendance", icon: <FaUserGraduate />, label: "Attendance" },
  { to: "/curriculum", icon: <FaSchool />, label: "Curriculum" },
  { to: "/advice", icon: <FaLightbulb />, label: "Advice" },
  { to: "/reports", icon: <FaFileAlt />, label: "Reports" },
  { to: "/analytics", icon: <FaChartLine />, label: "Analytics" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileData = {
    name: "Suneet Chugh",
    class: "12th C"
  };

  const mobileLinks = [
    { to: "/dashboard", icon: <FaHome />, label: "Home" },
    { to: "/curriculum", icon: <FaBook />, label: "Learn" },
    { to: "/attendance", icon: <FaClipboardCheck />, label: "Attend" },
    { to: "/analytics", icon: <FaChartLine />, label: "Stats" },
    { to: "/profile", icon: <FaGraduationCap />, label: "Profile" },
  ];

  return (
    <>
      <header className="topnav">
        <div className="nav-left">
          <img src="/logo.png" alt="EdentraPulse" className="nav-logo" />
          <button 
            className="hamburger-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <FaBars />
          </button>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              title={l.label}
            >
              <motion.span whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} className="nav-icon">
                {l.icon}
              </motion.span>
            </NavLink>
          ))}
        </nav>

        <div className="nav-right">
          <NavLink to="/profile" className="profile-link" title="View Profile">
            <span className="profile-icon">👤</span>
          </NavLink>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="mobile-nav-items">
              {mobileLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    "mobile-nav-item" + (isActive ? " active" : "")
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
