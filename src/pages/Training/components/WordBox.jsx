import { Icon } from "rsuite"
import { API_BASE_URL } from "../../../services/constant"
import playSound from "../../../utils/playMultipleSounds"
import 'rsuite/dist/styles/rsuite-default.css'
import "./WordBox.css"

// const wordInfo = {
//     id: "5e9f5ee35eb9e72bc21af4a0",
//     group: 0,
//     page: 0,
//     word: "alcohol",
//     image: "files/01_0002.jpg",
//     audio: "files/01_0002.mp3",
//     audioMeaning: "files/01_0002_meaning.mp3",
//     audioExample: "files/01_0002_example.mp3",
//     textMeaning: "<i>Alcohol</i> is a type of drink that can make people drunk.",
//     textExample: "A person should not drive a car after he or she has been drinking <b>alcohol</b>.",
//     transcription: "[ǽlkəhɔ̀ːl]",
//     textExampleTranslate: "Человек не должен водить машину после того, как он выпил алкоголь",
//     textMeaningTranslate: "Алкоголь - это тип напитка, который может сделать людей пьяными",
//     wordTranslate: "алкоголь"
// }

function WordBox({ word }) {
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
                    {word.wordTranslate}
                    <Icon
                        icon="volume-up"
                        size="2x"
                        onClick={() => playSound(
                            API_BASE_URL,
                            [word.audio, word.audioMeaning, word.audioExample]
                        )}
                    />
                </div>
                <div className="en-desc">
                    {word.textMeaning}
                    {word.textMeaningTranslate}
                </div>
                <div className="ex-exam">
                    {word.textExample}
                    {word.textExampleTranslate}
                </div>
            </div>
        </div>
    )
}

export default WordBox