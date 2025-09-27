import React from "react";
import SmallCard from "../components/widgets/SmallCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ attendance, curriculum, profile }) {
  const nav = useNavigate();
  const percent = Math.round((attendance.present / Math.max(1, attendance.total)) * 100);

  return (
    <div className="page dashboard-page">
      <h2 className="page-title">Dashboard</h2>

      <div className="grid-two">
        <SmallCard title="Attendance" value={`${percent}%`} onClick={() => nav("/attendance")}>
          <div>Present: {attendance.present} / {attendance.total}</div>
        </SmallCard>

        <SmallCard title="Curriculum" value={`${Object.keys(curriculum).length} categories`} onClick={() => nav("/curriculum")}>
          <div>Click to explore topics</div>
        </SmallCard>
      </div>

      <div className="grid-three">
        <SmallCard title="Advice" value="Daily Tip" onClick={() => nav("/advice")}>
          <div>Keep 75%+ attendance for rewards</div>
        </SmallCard>

        <SmallCard title="Reports" value="View" onClick={() => nav("/reports")}>
          <div>Exportable CSV (demo)</div>
        </SmallCard>

        <SmallCard title="Analytics" value="Trends" onClick={() => nav("/analytics")}>
          <div>Attendance trend & progress</div>
        </SmallCard>
      </div>

      <div className="banner card">
        <div className="banner-text">
          <h3>🎯 Maintain 75%+ Attendance</h3>
          <p>✨ Keep your streak to unlock achievements and rewards! 🏆</p>
        </div>
      </div>
    </div>
  );
}
