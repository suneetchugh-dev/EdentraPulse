import React from "react";

export default function SmallCard({ title, value, onClick, children }) {
  return (
    <div className="small-card card" onClick={onClick} role="button" tabIndex={0}>
      <div className="small-card-top">
        <strong>{title}</strong>
      </div>
      <div className="small-card-body">
        <div className="value">{value}</div>
        <div className="small-card-extra">{children}</div>
      </div>
    </div>
  );
}
