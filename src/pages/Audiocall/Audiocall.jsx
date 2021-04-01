import React, { useEffect, useRef, useState } from "react"
import { Button, Divider, Icon, IconButton } from "rsuite"
import GameLoading from "../../components/GameLoading"
import GameResult from "../../components/GameResult/GameResult"
import useGameEngine from "../../hooks/hooks"
import { MINI_GAMES_DATA } from "../../navigation/CONSTANT"
import "./Audiocall.css"

const Audiocall = ({ match }) => {
  const [{word, words}, {
    guess, forceGameOver, isLoading, isGameOver, history,
  }] = useGameEngine({
    type: "audiocall", group: match.params.level - 1
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const audiocallRef = useRef()
  const btnsRef = useRef()

  useEffect(() => {
    if (!isPlaying) return
    soundWord(word)
  }, [isPlaying, word])

  const soundWord = (word) => {
    new Audio(
      `https://enthusiast17-rslang-api.herokuapp.com/${word.audio}`
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
          <IconButton
            className="play-audio"
            icon={<Icon className="icon" icon="volume-up" />}
            circle
            size="lg"
            onClick={() => soundWord(word)} />
          <div ref={btnsRef} className="btns">
            {words.map((word, keyWord) => (
              <Button
                key={keyWord}
                color={word.color}
                size="lg"
                onClick={(event) => {
                  if (word.color) return
                  guess(word)
                  event.currentTarget.blur()
                }}>
                  {word.wordTranslate.toLowerCase()}
              </Button>
            ))}
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

export default Audiocall
