import React from "react";
import { useHistory } from "react-router";
import { Icon } from "rsuite";
import { AUDIOCALL_ROUTE, OWN_GAME_ROUTE, SAVANNAH_ROUTE, SPRINT_ROUTE } from "../navigation/CONSTANT";
import CardList from './CardList';

const MiniGamesNav = () => {
  const history = useHistory()

  const cards = [
    [
      {
        content: (
          <>
            <Icon icon="globe" size="4x" />
            <h3 className="subtitle">Саванна</h3>
          </>
        ),
        color: "#F44336",
        action: () => history.push(SAVANNAH_ROUTE),
      },
      {
        content: (
          <>
            <Icon icon="headphones" size="4x" />
            <h3 className="subtitle">Аудиовызов</h3>
          </>
        ),
        color: "#FF9800",
        action: () => history.push(AUDIOCALL_ROUTE),
      },
      {
        content: (
          <>
            <Icon icon="rocket" size="4x" />
            <h3 className="subtitle">Спринт</h3>
          </>
        ),
        color: "#FFCA28",
        action: () => history.push(SPRINT_ROUTE),
      },
      {
        content: (
          <>
            <Icon icon="bomb" size="4x" />
            <h3 className="subtitle">Своя игра</h3>
          </>
        ),
        color: "#4CAF50",
        action: () => history.push(OWN_GAME_ROUTE),
      },
    ]
  ]

  return (
    <CardList cards={cards} />
  )
}

export default MiniGamesNav
