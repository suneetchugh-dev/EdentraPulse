import React from "react";
import Lottie from "lottie-react";
import scanAnimation from "../assets/student-scan.json";
import "./StudentScan.css";

const StudentScan = () => {
  return (
    <div className="scan-container">
      <div className="scan-animation">
        <Lottie animationData={scanAnimation} loop={true} />
      </div>
      <div className="scan-overlay">
        <div className="scan-line"></div>
      </div>
      <p className="scan-status">
        Scanning Student...
      </p>
    </div>
  );
};

export default StudentScan;
