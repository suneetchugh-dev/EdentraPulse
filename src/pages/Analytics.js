import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../styles/analytics.css";

export default function Analytics({ attendance }) {
  const currentAttendance = Math.round((attendance.present/Math.max(1,attendance.total))*100);
  const attendanceData = [
    { day: "Week1", percent: 70, performance: 75 },
    { day: "Week2", percent: 75, performance: 78 },
    { day: "Week3", percent: 80, performance: 82 },
    { day: "Week4", percent: currentAttendance, performance: 85 }
  ];

  const subjectData = [
    { subject: "Mathematics", score: 85, average: 78 },
    { subject: "Science", score: 92, average: 80 },
    { subject: "English", score: 78, average: 75 },
    { subject: "History", score: 88, average: 82 }
  ];

  const participationData = [
    { month: "Jan", activities: 12, contributions: 8 },
    { month: "Feb", activities: 15, contributions: 10 },
    { month: "Mar", activities: 18, contributions: 14 },
    { month: "Apr", activities: 20, contributions: 16 }
  ];

  return (
    <div className="page analytics-page">
      <h2 className="page-title">Analytics Dashboard</h2>
      <div className="analytics-container">
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Current Attendance</h3>
            <p>{currentAttendance}%</p>
            <div className="trend up">
              <span>↑</span>
              <span>5% from last week</span>
            </div>
          </div>
          
          <div className="analytics-card">
            <h3>Performance Score</h3>
            <p>85%</p>
            <div className="trend up">
              <span>↑</span>
              <span>3% from last month</span>
            </div>
          </div>
          
          <div className="analytics-card">
            <h3>Participation Rate</h3>
            <p>78%</p>
            <div className="trend down">
              <span>↓</span>
              <span>2% from last week</span>
            </div>
          </div>

        <div className="analytics-card">
          <h3>Attendance & Performance Trend</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#94a3b8' }}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  domain={[50,100]} 
                  tick={{ fill: '#94a3b8' }}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="percent" 
                  stroke="#60a5fa" 
                  strokeWidth={3}
                  dot={{ fill: '#1e293b', stroke: '#60a5fa', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#1e293b', stroke: '#60a5fa', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#4ade80" 
                  strokeWidth={3}
                  dot={{ fill: '#1e293b', stroke: '#4ade80', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#1e293b', stroke: '#4ade80', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Subject Performance</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subjectData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fill: '#94a3b8' }}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  domain={[0,100]} 
                  tick={{ fill: '#94a3b8' }}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#60a5fa" 
                  strokeWidth={2}
                  dot={{ fill: '#60a5fa', stroke: '#1e293b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#1e293b', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#94a3b8', stroke: '#1e293b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#1e293b', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Monthly Participation</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#94a3b8' }}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  tick={{ fill: '#94a3b8' }}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="activities" 
                  stroke="#60a5fa" 
                  strokeWidth={2}
                  dot={{ fill: '#60a5fa', stroke: '#1e293b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#1e293b', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="contributions" 
                  stroke="#4ade80" 
                  strokeWidth={2}
                  dot={{ fill: '#4ade80', stroke: '#1e293b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#1e293b', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
