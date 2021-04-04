import React from "react";
import { Divider } from "rsuite";
import MiniGamesNav from "../../components/MiniGamesNav";
import SectionWordsList from "./components/SectionWordsList/SectionWordsList";
import "./Section.css"

const Section = ({ match }) => {

  return (
    <div className="section">
      <h1 className="title">{match.params.section} раздел</h1>
      <h2 className="subtitle">Мини-игры</h2>
      <Divider className="divider" />
      <MiniGamesNav section={match.params.section}/>
      <SectionWordsList group={match.params.section} />
    </div>
  )
}

export default Section
