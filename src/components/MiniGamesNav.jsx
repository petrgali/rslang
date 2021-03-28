import React from "react";
import { Icon } from "rsuite";
import CardList from './CardList';

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
      link: "/mini-games/savanna",
    },
    {
      content: (
        <>
          <Icon icon="headphones" size="4x" />
          <h3 className="subtitle">Аудиовызов</h3>
        </>
      ),
      color: "#FF9800",
      link: "/mini-games/audiochallenge",
    },
    {
      content: (
        <>
          <Icon icon="rocket" size="4x" />
          <h3 className="subtitle">Спринт</h3>
        </>
      ),
      color: "#FFCA28",
      link: "/mini-games/sprint",
    },
    {
      content: (
        <>
          <Icon icon="bomb" size="4x" />
          <h3 className="subtitle">Своя игра</h3>
        </>
      ),
      color: "#4CAF50",
      link: "/mini-games/owngame",
    },
  ]
]

const MiniGamesNav = () => {
  return (
    <CardList cards={cards} />
  )
}

export default MiniGamesNav
