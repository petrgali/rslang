import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Icon, IconButton } from "rsuite";
import GameLoading from "../../components/GameLoading";
import GameResult from "../../components/GameResult/GameResult";
import useGameEngine from "../../hooks/hooks";
import { miniGamesData } from "../../navigation/CONSTANT";
import "./Savannah.css";

let interval

const Savannah = ({ match }) => {
  const [{word, words}, {
    guess, forceGameOver, isLoading, isGameOver, history,
  }] = useGameEngine({
    type: "Savannah", group: match.params.level - 1
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const [top, setTop] = useState(150)
  const [lives, setLives] = useState([...Array(5)])
  const savannaRef = useRef()
  const wordRef = useRef()
  const btnsRef = useRef()

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

  const handleFullScreen = (event) => {
    savannaRef.current.requestFullscreen()
  }

  return (
    <div ref={savannaRef} className="savannah">
      <h1 className="title">{ miniGamesData["savannah"].name }</h1>
      {!isPlaying ? (
        <>
          <h2 className="subtitle">Об игре</h2>
          <Divider className="divider" />
          { miniGamesData["savannah"].about.map((text, textKey) => (
            <p key={textKey} className="about-game">
              { text }
            </p>
          )) }
          <div className="content">
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
              <IconButton
                className="full-screen-btn"
                icon={<Icon icon="arrows-alt" />}
                circle size="lg"
                onClick={handleFullScreen} />
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
