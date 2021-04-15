import React, { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Divider, Icon, IconButton, Animation } from "rsuite";
import GameLoading from "../../components/GameLoading";
import GameResult from "../../components/GameResult/GameResult";
import useGameEngine from "../../hooks/hooks";
import { MINI_GAMES_DATA } from "../../navigation/CONSTANT";
import { API_BASE_URL } from "../../services/constant";
import "./OwnGame.css"

const OwnGame = ({ match }) => {
  const [{word, words}, {
    guess, forceGameOver, forceNextWord, isLoading, isGameOver, history,
  }] = useGameEngine({
    type: "own game", group: match.params.level - 1
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const [showNextBtn, setShowNextBtn] = useState(false)
  const [animationIn, setAnimationIn] = useState(true)
  const ownGameRef = useRef()
  const btnsRef = useRef()

  useHotkeys("1", () => btnsRef.current && btnsRef.current.children[0].click())

  useHotkeys("2", () => btnsRef.current && btnsRef.current.children[1].click())

  useHotkeys("3", () => btnsRef.current && btnsRef.current.children[2].click())

  useHotkeys("4", () => btnsRef.current && btnsRef.current.children[3].click())

  const handleFullScreen = () => {
    ownGameRef.current.requestFullscreen()
  }

  const handleClose = () => {
    forceGameOver()
  }

  return (
    <div ref={ownGameRef} className="own-game">
      <h1 className="title">{ MINI_GAMES_DATA["own game"].name }</h1>
      {!isPlaying ? (
        <>
          <h2 className="subtitle">Об игре</h2>
            <Divider className="divider" />
            { MINI_GAMES_DATA["own game"].about.map((text, textKey) => (
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
            <Animation.Bounce in={animationIn}>
              <div className="game">
                <h3 className="subtitle">
                  { word.word.toLowerCase() }
                </h3>
                <h3
                  className="subtitle"
                  style={{ fontSize: 18 }}
                  dangerouslySetInnerHTML={{ __html: word.textMeaning }}/>
                <div ref={btnsRef} className="btns">
                  {words.map((word, wordKey) => (
                    <div
                      key={wordKey}
                      className="btn"
                      onClick={(event) => {
                        if (word.color) return
                          guess(word)
                          setShowNextBtn(true)
                          event.currentTarget.blur()
                      }}>
                      {word.color && (
                        <>
                          <div className={`color-btn ${word.color}`} />
                          <h3 className="subtitle">
                            { word.word.toLowerCase() }
                          </h3>
                        </>
                      )}
                      <img
                        className="img"
                        style={{ borderColor: word.color }}
                        src={`${API_BASE_URL}${word.image}`}
                        alt="visualimage" />
                    </div>
                  ))}
                </div>
                {showNextBtn && (
                  <IconButton
                    appearance="primary"
                    icon={<Icon icon="long-arrow-right" />}
                    size="lg"
                    onClick={(event) => {
                      setShowNextBtn(false)
                      setAnimationIn(false)
                      event.currentTarget.blur()
                      setTimeout(() => {
                        forceNextWord()
                        setAnimationIn(true)
                      }, 500)
                    }}>
                      Дальше
                  </IconButton>
                )}
              </div>
            </Animation.Bounce>
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

export default OwnGame
