import React from "react";

export default function Header({ appName }) {
  return (
    <header className="header">
      <div className="logo">
        {/* put your logo image in public/logo.png or modify path */}
        <img src="/logo.png" alt={appName} />
        <div>
          <h1>{appName}</h1>
          <p className="tag">Smart Curriculum • Attendance • Gamified</p>
        </div>
      </div>
      <nav>
        <a href="#attendance">Attendance</a>
        <a href="#curriculum">Curriculum</a>
        <a href="#reports">Reports</a>
      </nav>
    </header>
  );
}
