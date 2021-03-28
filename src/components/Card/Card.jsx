import React from "react";
import { useHistory } from "react-router";
import { Icon, IconButton } from "rsuite";
import "./Card.css";

const Card = ({ content, link, color }) => {
  const history = useHistory()

  const handleLink = () => history.push(link)

  return (
    <div className="card">
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