import { List } from "rsuite"
import WordBox from "../WordBox/WordBox"
import WordButtons from "../WordButtons"
import { STATUS } from "../constant"
import "./WordsList.css"

function WordsList({ data, setWordStatus, recoverWord, showControl, showTranslate, showRecover, showStats }) {
  return (
    <List className="words-list">
      {data.map((obj) =>
      (<List.Item key={obj._id}>
        <WordBox
          showTranslate={showTranslate}
          word={obj}
          buttons={setWordStatus ? (
            <WordButtons
              word={obj}
              showControl={showControl}
              isWordHard={obj.userWord && obj.userWord.difficulty === "hard"}
              showRecover={showRecover}
              recoverWord={() => recoverWord(obj._id)}
              setWordHard={() => setWordStatus(obj._id, obj.userWord, STATUS.HARD)}
              removeWord={() => setWordStatus(obj._id, obj.userWord, STATUS.DELETED)}
              showStats={showStats}
              />
          ) : (
            <WordButtons word={obj} />
          )}
        />
      </List.Item>)
      )}
    </List>
  )
}
export default WordsList
