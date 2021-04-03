import React from "react";
import { Divider } from "rsuite";
import MiniGamesNav from "../../components/MiniGamesNav";
import "./MiniGames.css";

const MiniGames = () => {
  return (
    <div className="mini-games">
      <h1 className="title">Мини-игры</h1>
      <h2 className="subtitle">Виды мини-игр</h2>
      <Divider className="divider" />
      <MiniGamesNav />
    </div>
  )
}

export default MiniGames
