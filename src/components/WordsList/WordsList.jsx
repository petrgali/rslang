import { List } from "rsuite"
import WordBox from "../WordBox/WordBox"
import WordButtons from "../WordButtons"
import { STATUS } from "../constant"
import "./WordsList.css"

function WordsList({ data, setWordStatus, recoverWord, showControl, showTranslate, showRecover }) {
  return (
    <List className="words-list">
      {data.map((obj) =>
        (<List.Item key={obj._id}>
          <WordBox
            showTranslate={showTranslate}
            word={obj}
            buttons={<WordButtons
              showControl={showControl}
              isWordHard={obj.userWord && obj.userWord.difficulty === "hard"}
              showRecover={showRecover}
              recoverWord={() => recoverWord(obj._id)}
              setWordHard={() => setWordStatus(obj._id, STATUS.HARD)}
              removeWord={() => setWordStatus(obj._id, STATUS.DELETED)} />}
            />
        </List.Item>)
      )}
    </List>
  )
}
export default WordsList
