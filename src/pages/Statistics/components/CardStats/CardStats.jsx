import React from "react";
import "./CardStats.css";

const CardStats = ({ title, number }) => {
  return (
    <div className="card-stats">
      <span className="card-stats-title">{title}</span>
      <span className="card-stats-number">{number}</span>
    </div>
  )
}

export default CardStats
