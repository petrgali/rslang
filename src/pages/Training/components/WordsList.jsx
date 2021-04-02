import WordBox from "./WordBox/WordBox"
import { wordStatus } from "../constant"
import WordButtons from "./WordButtons"

function WordsList({ data, setWordStatus, recoverWord, showControl, showTranslate, showRecover }) {
    return (
        data.map(obj => <WordBox
            showTranslate={showTranslate}
            key={obj._id}
            word={obj}
            buttons={<WordButtons
                showControl={showControl}
                showRecover={showRecover}
                recoverWord={() => recoverWord(obj._id)}
                setWordHard={() => setWordStatus(obj._id, wordStatus.hard)}
                removeWord={() => setWordStatus(obj._id, wordStatus.deleted)}
            />} />
        )
    )
}
export default WordsList
