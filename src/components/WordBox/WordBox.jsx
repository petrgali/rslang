import { Icon, IconButton, Tooltip, Whisper } from "rsuite"
import { API_BASE_URL } from "../../services/constant"
import Sound from "../../utils/playMultipleSounds"
import 'rsuite/dist/styles/rsuite-default.css'
import "./WordBox.css"
import { useState } from "react"
import CustomDrawer from "../CustomDrawer/CustomDrawer"

function WordBox({ word, buttons, showTranslate }) {
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <div className="wordbox">
      <div className="word-sound">
        <IconButton
          icon={<Icon icon="volume-up" />}
          circle
          size="lg"
          onClick={() =>  Sound.play(
            API_BASE_URL,
            [word.audio]
          )}
        />
      </div>
      <Whisper placement="top" trigger="hover" speaker={
        <Tooltip>Информация о слове</Tooltip>
      }>
        <div
          className="word-info"
          onClick={() => setShowDrawer(true)}
        >
          <span className="word-title">
            {word.word.toLowerCase()}
          </span>
          {showTranslate && (
            <span>
              {word.wordTranslate.toLowerCase()}
            </span>
          )}
        </div>
      </Whisper>
      <div className="buttons">
          {buttons}
      </div>
      <CustomDrawer show={showDrawer} handleShow={(status) => {
        if (!status) Sound.stop()
        setShowDrawer(status)
      }} content={
        <>
          <img
            src={API_BASE_URL + word.image}
            alt={word.word} />
          <div>
            <IconButton
              icon={<Icon icon="volume-up" />}
              circle
              size="lg"
              onClick={() =>  Sound.play(
                API_BASE_URL,
                [word.audio, word.audioMeaning, word.audioExample]
              )}
            />
          </div>
          <span className="word-title">{word.word.toLowerCase()} - {word.wordTranslate.toLowerCase()}</span>
          <span>{word.transcription}</span>
          <span dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
          <span>{word.textMeaningTranslate}</span>
          <span dangerouslySetInnerHTML={{ __html: word.textExample }} />
          <span>{word.textExampleTranslate}</span>
        </>
      } />
  </div>
  )
}

export default WordBox