import React from "react";
import { Divider } from "rsuite";
import { miniGamesData } from "../../navigation/CONSTANT";
import "./Savannah.css";

const Savannah = ({ match }) => {
  return (
    <div className="savannah">
      <h1 className="title">{ miniGamesData["savannah"].name }</h1>
      <h2 className="subtitle">Об игре</h2>
      <Divider className="divider" />
      { miniGamesData["savannah"].about.map((text, textKey) => (
        <p key={textKey} className="about-game">
          { text }
        </p>
      )) }
      { match.params.level }
    </div>
  )
}

export default Savannah
