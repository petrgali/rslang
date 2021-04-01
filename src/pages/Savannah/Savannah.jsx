import React, { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button, Divider, Icon, IconButton } from "rsuite";
import GameLoading from "../../components/GameLoading";
import GameResult from "../../components/GameResult/GameResult";
import useGameEngine from "../../hooks/hooks";
import { MINI_GAMES_DATA } from "../../navigation/CONSTANT";
import "./Savannah.css";

let interval

const Savannah = ({ match }) => {
  const [{word, words}, {
    guess, forceGameOver, isLoading, isGameOver, history,
  }] = useGameEngine({
    type: "savannah", group: match.params.level - 1
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const [top, setTop] = useState(150)
  const [lives, setLives] = useState([...Array(5)])
  const savannaRef = useRef()
  const wordRef = useRef()
  const btnsRef = useRef()

  useHotkeys("1", () => btnsRef.current && btnsRef.current.children[0].click())

  useHotkeys("2", () => btnsRef.current && btnsRef.current.children[1].click())

  useHotkeys("3", () => btnsRef.current && btnsRef.current.children[2].click())

  useHotkeys("4", () => btnsRef.current && btnsRef.current.children[3].click())

  useEffect(() => {
    if (!isPlaying || isGameOver) {
      clearInterval(interval)
      return
    }
    interval = setInterval(() => {
      if (btnsRef.current.getBoundingClientRect().top < top) {
        clearInterval(interval)
        guess({ word: "" })
        setLives(lives.slice(1))
      } else {
        setTop(top + 1)
      }
    }, 5)
    return () => clearInterval(interval)
  }, [isPlaying, isGameOver, top])

  useEffect(() => {
    setTop(150)
  }, [word])

  useEffect(() => {
    if (lives.length === 0) {
      forceGameOver()
    }
  }, [lives])

  const handleFullScreen = () => {
    savannaRef.current.requestFullscreen()
  }

  const handleClose = () => {
    forceGameOver()
  }

  return (
    <div ref={savannaRef} className="savannah">
      <h1 className="title">{ MINI_GAMES_DATA["savannah"].name }</h1>
      {!isPlaying ? (
        <>
          <h2 className="subtitle">Об игре</h2>
          <Divider className="divider" />
          { MINI_GAMES_DATA["savannah"].about.map((text, textKey) => (
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
              <div className="lives">
                {lives.map((_, liveKey) => <Icon key={liveKey} icon="heart" size="2x" />)}
              </div>
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
                <p
                  className="word"
                  ref={wordRef}
                  style={{
                    top,
                  }}>{ word.word.toLowerCase() }</p>
                <div ref={btnsRef} className="btns">
                  {words.map((word, keyWord) => (
                    <Button
                      key={keyWord}
                      color={word.color}
                      size="lg"
                      onClick={(event) => {
                        if (word.color) return
                        clearInterval(interval)
                        !guess(word) && setLives(lives.slice(1))
                        event.currentTarget.blur()
                      }}>
                        {word.wordTranslate.toLowerCase()}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="game-icon">
                <Icon icon="globe" size={(
                  history.correctGuessWords.length <= 10 ? "3x" : history.correctGuessWords.length <= 20 ? "4x" : "5x"
                )}/>
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

export default Savannah
