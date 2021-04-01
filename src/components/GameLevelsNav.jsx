import React from "react";
import CardList from "./CardList";

const GameLevelsNav = ({ action }) => {
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
        action,
      },
      {
        content: (
          <>
            <h2 className="title">2</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#FF9800",
        action,
      },
      {
        content: (
          <>
            <h2 className="title">3</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#FFCA28",
        action,
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
        action,
      },
      {
        content: (
          <>
            <h2 className="title">5</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#00BCD4",
        action,
      },
      {
        content: (
          <>
            <h2 className="title">6</h2>
            <h3 className="subtitle">уровень</h3>
          </>
        ),
        color: "#673AB7",
        action,
      },
    ]
  ]

  return (
    <CardList cards={cards} />
  )
}

export default GameLevelsNav
