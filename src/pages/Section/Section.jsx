import React from "react";
import { Divider } from "rsuite";
import MiniGamesNav from "../../components/MiniGamesNav";
import "./Section.css"

const Section = ({ match }) => {

  return (
    <div className="section">
      <h1 className="title">{match.params.section} раздел</h1>
      <h2 className="subtitle">Мини-игры</h2>
      <Divider className="divider" />
      <MiniGamesNav section={match.params.section}/>
      <h2 className="subtitle">Список слов</h2>
      <Divider className="divider" />
    </div>
  )
}

export default Section
