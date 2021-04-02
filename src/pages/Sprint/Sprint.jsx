import React, { useEffect, useRef, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { Divider, Icon, IconButton, Progress } from "rsuite"
import GameLoading from "../../components/GameLoading"
import GameResult from "../../components/GameResult/GameResult"
import useGameEngine from "../../hooks/hooks"
import { MINI_GAMES_DATA } from "../../navigation/CONSTANT"
import "./Sprint.css"

let interval

const Sprint = ({ match }) => {
  const [{word, words}, {
    guess, forceGameOver, forceNextWord, isLoading, isGameOver, history,
  }] = useGameEngine({
    type: "sprint", group: match.params.level - 1
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const [countDownTime, setCountDownTime] = useState(60)
  const [result, setResult] = useState("")
  const sprintRef = useRef()
  const progressRef = useRef()
  const btnsRef = useRef()

  useHotkeys("1", () => btnsRef.current && btnsRef.current.children[0].click())

  useHotkeys("2", () => btnsRef.current && btnsRef.current.children[1].click())

  useEffect(() => {
    if (!isPlaying || isGameOver) {
      clearInterval(interval)
      return
    }
    interval = setInterval(() => {
      if (countDownTime === 0) {
        clearInterval(interval)
        forceGameOver()
        return
      }
      setCountDownTime(countDownTime - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [countDownTime, forceGameOver, isGameOver, isPlaying])

  useEffect(() => {
    if (!progressRef.current) return
    const progress = progressRef.current.querySelector("span")
    progress.children[0].textContent = countDownTime
  }, [countDownTime])
  
  const handleFullScreen = () => {
    sprintRef.current.requestFullscreen()
  }

  const handleClose = () => {
    forceGameOver()
  }

  return (
    <div ref={sprintRef} className="sprint">
      <h1 className="title">{ MINI_GAMES_DATA["sprint"].name }</h1>
      {!isPlaying ? (
        <>
          <h2 className="subtitle">Об игре</h2>
          <Divider className="divider" />
          { MINI_GAMES_DATA["sprint"].about.map((text, textKey) => (
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
                <div ref={progressRef} className="progress">
                  <Progress.Circle
                    percent={((60 - countDownTime) * 1.666666666)}
                    showInfo={countDownTime === 60 ? false : true}
                  />
                </div>
                {result === "correct" && (
                  <Icon icon="thumbs-up" size="2x" />
                )}
                {result === "incorrect" && (
                  <Icon icon="thumbs-down" size="2x" />
                )}
                <h3 className="subtitle" style={{ margin: 0 }}>
                  { word.word.toLowerCase() } - { words[0].wordTranslate.toLowerCase() }
                </h3>
                <div ref={btnsRef} className="btns">
                  <IconButton
                    color="red"
                    icon={<Icon icon="thumbs-down" />}
                    size="lg"
                    onClick={(event) => {
                      if (words[0].color) return
                      if (word.word !== words[0].word) {
                        guess(word)
                        setResult("incorrect")
                      } else {
                        guess({ word: "" })
                        setResult("correct")
                      }
                      setTimeout(() => {
                        forceNextWord()
                        setResult("")
                      }, 1000)
                      event.currentTarget.blur()
                    }}>
                    Неверно
                  </IconButton>
                  <IconButton
                    color="green"
                    icon={<Icon icon="thumbs-up" />}
                    size="lg"
                    onClick={(event) => {
                      if (words[0].color) return
                      if (word.word === words[0].word) {
                        guess(word)
                        setResult("correct")
                      } else {
                        guess({ word: "" })
                        setResult("incorrect")
                      }
                      setTimeout(() => {
                        forceNextWord()
                        setResult("")
                      }, 1000)
                      event.currentTarget.blur()
                    }}>
                    Верно
                  </IconButton>
                </div>
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

export default Sprint
