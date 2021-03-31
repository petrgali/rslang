import React from "react"
import { Divider, Icon, IconButton, List } from "rsuite"
import "./GameResult.css"

const GameResult = ({ history }) => {
  return (
    <div className="game-result">
      <h2 className="subtitle">Результат игры</h2>
      <Divider className="divider" />
      <div className="restart">
        <IconButton
          appearance="primary"
          icon={<Icon icon="play-circle" />}
          size="lg"
          onClick={() => window.location.reload()}>
          Повторить мини-игру
        </IconButton>
      </div>
      <h3 className="subtitle">Неправильные ответы - { history.incorrectGuessWords.length }</h3>
      <List className="list" size="md">
        {history.incorrectGuessWords.map((word, wordKey) => (
          <List.Item className="list-item" key={wordKey} index={wordKey}>
            {word.word} - {word.wordTranslate}
          </List.Item>
        ))}
      </List>
      <h3 className="subtitle">Правильные ответы - { history.correctGuessWords.length }</h3>
      <List className="list" size="md">
        {history.correctGuessWords.map((word, wordKey) => (
          <List.Item className="list-item" key={wordKey} index={wordKey}>
            {word.word} - {word.wordTranslate}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default GameResult
