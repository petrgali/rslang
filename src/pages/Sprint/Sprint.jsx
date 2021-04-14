import React, { useEffect, useRef, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { Divider, Icon, IconButton, Animation } from "rsuite"
import GameLoading from "../../components/GameLoading"
import GameResult from "../../components/GameResult/GameResult"
import Timer from "../../components/Timer"
import useGameEngine from "../../hooks/hooks"
import { MINI_GAMES_DATA } from "../../navigation/CONSTANT"
import "./Sprint.css"

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
  const [animationIn, setAnimationIn] = useState(false)
  const [animationBackground, setAnimationBackground] = useState("")
  const sprintRef = useRef()
  const btnsRef = useRef()

  useHotkeys("1", () => btnsRef.current && btnsRef.current.children[0].click())

  useHotkeys("2", () => btnsRef.current && btnsRef.current.children[1].click())

  useEffect(() => {
    if (countDownTime === 0) {
      forceGameOver()
      return
    }
  }, [countDownTime, forceGameOver])
  
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
                <Animation.Fade in={animationIn}>
                  <div className={animationBackground} />
                </Animation.Fade>
                <Timer
                  shouldStart={isPlaying}
                  countDownTime={countDownTime}
                  setCountDownTime={setCountDownTime} />
                {result === "correct" && (
                  <Icon icon="thumbs-up" size="2x" />
                )}
                {result === "incorrect" && (
                  <Icon icon="thumbs-down" size="2x" />
                )}
                {result === "" && (
                  <Icon icon="question-circle" size="2x" />
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
                        setAnimationIn(true)
                        setAnimationBackground("correct-background")
                      } else {
                        guess({ word: "" })
                        setResult("correct")
                        setAnimationIn(true)
                        setAnimationBackground("incorrect-background")
                      }
                      setTimeout(() => {
                        setAnimationIn(false)
                        setAnimationBackground("")
                      }, 900)
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
                        setAnimationIn(true)
                        setAnimationBackground("correct-background")
                      } else {
                        guess({ word: "" })
                        setResult("incorrect")
                        setAnimationIn(true)
                        setAnimationBackground("incorrect-background")
                      }
                      setTimeout(() => {
                        setAnimationIn(false)
                        setAnimationBackground("")
                      }, 900)
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
