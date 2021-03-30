import { Icon } from "rsuite"
import { API_BASE_URL } from "../../../services/constant"
import playSound from "../../../utils/playMultipleSounds"
import 'rsuite/dist/styles/rsuite-default.css'
import "./WordBox.css"

function WordBox({ word, buttons, showTranslate }) {
    return (
        <div className="wordbox">
            <div className="image-container">
                <img className="word-image"
                    src={API_BASE_URL + word.image}
                    style={{ maxHeight: "10em" }}
                    alt={word.word} />
            </div>
            <div className="word-cover">
                <div className="en-word">
                    {word.word}
                    <span className="en-pron">
                        {word.transcription}
                    </span>
                    {showTranslate && <span className="en-translate">
                        {word.wordTranslate}
                    </span>}
                    <Icon
                        className="play-icon"
                        icon="volume-up"
                        size="2x"
                        onClick={() => playSound(
                            API_BASE_URL,
                            [word.audio, word.audioMeaning, word.audioExample]
                        )}
                    />
                </div>
                <div className="en-desc">
                    <div dangerouslySetInnerHTML={{ __html: word.textMeaning }}></div>
                    {showTranslate && <p>{word.textMeaningTranslate}</p>}
                </div>
                <div className="ex-exam">
                    <div dangerouslySetInnerHTML={{ __html: word.textExample }}></div>
                    {showTranslate && <p>{word.textExampleTranslate}</p>}
                </div>
            </div>
            <div className="buttons">
                {buttons}
            </div>
        </div>
    )
}

export default WordBox