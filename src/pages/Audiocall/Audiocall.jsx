import React, { useEffect, useRef, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { Button, Divider, Icon, IconButton } from "rsuite"
import GameLoading from "../../components/GameLoading"
import GameResult from "../../components/GameResult/GameResult"
import useGameEngine from "../../hooks/hooks"
import { MINI_GAMES_DATA } from "../../navigation/CONSTANT"
import { API_BASE_URL } from "../../services/constant"
import "./Audiocall.css"

const Audiocall = ({ match }) => {
  const [{word, words}, {
    guess, forceGameOver, forceNextWord, isLoading, isGameOver, history,
  }] = useGameEngine({
    type: "audiocall", group: match.params.level - 1
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [showWord, setShowWord] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const audiocallRef = useRef()
  const btnsRef = useRef()

  useHotkeys("1", () => btnsRef.current && btnsRef.current.children[0].click())

  useHotkeys("2", () => btnsRef.current && btnsRef.current.children[1].click())

  useHotkeys("3", () => btnsRef.current && btnsRef.current.children[2].click())

  useHotkeys("4", () => btnsRef.current && btnsRef.current.children[3].click())

  useHotkeys("5", () => btnsRef.current && btnsRef.current.children[4].click())

  useEffect(() => {
    if (!isPlaying) return
    soundWord(word)
    setShowWord(false)
  }, [isPlaying, word])

  const soundWord = (word) => {
    new Audio(
      `${API_BASE_URL}${word.audio}`
    ).play()
  }

  const handleFullScreen = () => {
    audiocallRef.current.requestFullscreen()
  }

  const handleClose = () => {
    forceGameOver()
  }

  return (
    <div ref={audiocallRef} className="audiocall">
      <h1 className="title">{ MINI_GAMES_DATA["audiocall"].name }</h1>
     {!isPlaying ? (
       <>
        <h2 className="subtitle">Об игре</h2>
        <Divider className="divider" />
        { MINI_GAMES_DATA["audiocall"].about.map((text, textKey) => (
          <p key={textKey} className="about-game">
            { text }
          </p>
        )) }
        <div className="game-content">
            <IconButton
              appearance="primary"
              icon={<Icon icon="play-circle" />}
              size="lg"
              onClick={() => {
                setIsGameLoading(true)
                setTimeout(() => {
                  setIsGameLoading(false)
                  setIsPlaying(true)
                }, 3000)
              }}
              loading={isLoading}>
              Начать мини-игру
            </IconButton>
          </div>
       </>
     ) : (
       <>
       {!isGameOver && (
         <>
         <div className="game-menu">
          <IconButton
            icon={<Icon icon="arrows-alt" />}
            circle size="lg"
            onClick={handleFullScreen} />

          <IconButton
            icon={<Icon icon="close" />}
            circle size="lg"
            onClick={handleClose} />
        </div>
         <div className="game">
          {!showWord ? (
            <IconButton
            className="play-audio"
            icon={<Icon className="icon" icon="volume-up" />}
            circle
            size="lg"
            onClick={() => soundWord(word)} />
          ) : (
            <>
              <img
                className="word-img"
                src={`${API_BASE_URL}${word.image}`}
                alt={word.word}
              />
              <IconButton
                icon={<Icon className="icon" icon="volume-up" />}
                circle
                size="lg"
                onClick={() => soundWord(word)} />
              <h3 className="subtitle" style={{ margin: 0 }}>{ word.word }</h3>
            </>
          )}
          <div ref={btnsRef} className="btns">
            {words.map((word, keyWord) => (
              <Button
                key={keyWord}
                color={word.color}
                size="lg"
                onClick={(event) => {
                  if (word.color) return
                  guess(word)
                  setShowWord(true)
                  event.currentTarget.blur()
                }}>
                  {word.wordTranslate.toLowerCase()}
              </Button>
            ))}
          </div>
          {!showWord ? (
            <Button
              appearance="primary"
              size="lg"
              onClick={(event) => {
                guess({ word: "" })
                setShowWord(true)
                event.currentTarget.blur()
              }}>
                Не знаю
            </Button>
          ) : (
            <IconButton
              appearance="primary"
              icon={<Icon icon="long-arrow-right" />}
              size="lg"
              onClick={(event) => {
                forceNextWord()
                event.currentTarget.blur()
              }}>
                Дальше
            </IconButton>
          )}
        </div>
        </>
       )}
        {isGameOver && (
          <GameResult history={history} />
        )}
       </>
     )}
     {isGameLoading && (
        <GameLoading />
      )}
    </div>
  )
}

export default Audiocall
