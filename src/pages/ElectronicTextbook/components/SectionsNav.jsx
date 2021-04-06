import React from "react";
import { useHistory } from "react-router";
import CardList from "../../../components/CardList";
import { ELECTRONIC_TEXTBOOK_SECTION_ROUTE } from "../../../navigation/CONSTANT";

const SectionsNav = () => {
  const history = useHistory()

  const cards = [
    [
      {
        content: (
          <>
            <h2 className="title">1</h2>
            <h3 className="subtitle">раздел</h3>
          </>
        ),
        color: "#F44336",
        action: () => history.push(`${ELECTRONIC_TEXTBOOK_SECTION_ROUTE}/1`),
      },
      {
        content: (
          <>
            <h2 className="title">2</h2>
            <h3 className="subtitle">раздел</h3>
          </>
        ),
        color: "#FF9800",
        action: () => history.push(`${ELECTRONIC_TEXTBOOK_SECTION_ROUTE}/2`),
      },
      {
        content: (
          <>
            <h2 className="title">3</h2>
            <h3 className="subtitle">раздел</h3>
          </>
        ),
        color: "#FFCA28",
        action: () => history.push(`${ELECTRONIC_TEXTBOOK_SECTION_ROUTE}/3`),
      },
      {
        content: (
          <>
            <h2 className="title">4</h2>
            <h3 className="subtitle">раздел</h3>
          </>
        ),
        color: "#4CAF50",
        action: () => history.push(`${ELECTRONIC_TEXTBOOK_SECTION_ROUTE}/4`),
      },
      {
        content: (
          <>
            <h2 className="title">5</h2>
            <h3 className="subtitle">раздел</h3>
          </>
        ),
        color: "#00BCD4",
        action: () => history.push(`${ELECTRONIC_TEXTBOOK_SECTION_ROUTE}/5`),
      },
      {
        content: (
          <>
            <h2 className="title">6</h2>
            <h3 className="subtitle">раздел</h3>
          </>
        ),
        color: "#673AB7",
        action: () => history.push(`${ELECTRONIC_TEXTBOOK_SECTION_ROUTE}/6`),
      },
    ]
  ]

  return (
    <CardList cards={cards} />
  )
}

export default SectionsNav
