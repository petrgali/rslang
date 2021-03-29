import React from "react";
import { useHistory } from "react-router";
import { Divider } from "rsuite";
import CardList from "../../components/CardList";
import { miniGamesData } from "../../navigation/CONSTANT";
import "./MiniGameLevels.css";

const MiniGameLevels = ({ name }) => {
  const history = useHistory()

  const handleAction = (level) => {
    history.push(`${miniGamesData[name.toLowerCase()].location}/${level}`)
  }

  const cards = [
    [
      {
        content: (
          <>
            <h2 className="title">1</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#F44336",
        action: handleAction,
      },
      {
        content: (
          <>
            <h2 className="title">2</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#FF9800",
        action: handleAction,
      },
      {
        content: (
          <>
            <h2 className="title">3</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#FFCA28",
        action: handleAction,
      },
    ],
    [
      {
        content: (
          <>
            <h2 className="title">4</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#4CAF50",
        action: handleAction,
      },
      {
        content: (
          <>
            <h2 className="title">5</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#00BCD4",
        action: handleAction,
      },
      {
        content: (
          <>
            <h2 className="title">6</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#673AB7",
        action: handleAction,
      },
    ]
  ]

  return (
    <div className="mini-games-levels">
      <h1 className="title">{ miniGamesData[name.toLowerCase()].name }</h1>
      <h2 className="subtitle">Об игре</h2>
      <Divider className="divider" />
      { miniGamesData[name.toLowerCase()].about.map((text, textKey) => (
        <p key={textKey} className="about-game">
          { text }
        </p>
      )) }
      <h2 className="subtitle">Уровни</h2>
      <Divider className="divider" />
      <CardList cards={cards} />
    </div>
  )
}

export default MiniGameLevels
