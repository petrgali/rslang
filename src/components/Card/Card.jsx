import React from "react";
import { Icon, IconButton } from "rsuite";
import "./Card.css";

const Card = ({ content, action, color }) => {
  const handleLink = (event) => {
    action()
    event.stopPropagation()
  }

  return (
    <div className="card" onClick={handleLink}>
      <div className="content">
        { content }
      </div>
      <div className="quarter-circle" style={{ background: color }}>
        <IconButton
          icon={<Icon icon="chevron-circle-right" />}
          circle
          size="lg"
          onClick={handleLink}
        />
      </div>
    </div>
  )
}

export default Card
