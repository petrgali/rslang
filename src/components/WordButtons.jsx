import { Button, Icon, IconButton, Tooltip, Whisper } from "rsuite"

const WordButtons = ({ word, setWordHard, isWordHard, removeWord, recoverWord, showRecover, showControl, showStats }) => {
  console.log(showStats)
  const tooltip = (text) => (
    <Tooltip>
      { text }
    </Tooltip>
  )
  return (
    <>
      { showControl &&
        <>
          {!isWordHard ? (
            <Whisper placement="auto" trigger="hover" speaker={tooltip("В сложные")}>
              <IconButton icon={<Icon icon="question-circle" />} circle size="lg" onClick={setWordHard} />
            </Whisper>
          ) : (
            <Whisper placement="auto" trigger="hover" speaker={tooltip("Это слово относится к сложным словам")}>
              <IconButton icon={<Icon icon="question-circle" />} circle color="orange" size="lg" disabled />
            </Whisper>
          )}
          <Whisper placement="auto" trigger="hover" speaker={tooltip("В удаленные")}>
            <IconButton icon={<Icon icon="ban" />} circle size="lg" onClick={removeWord} />
          </Whisper>
        </>
      }
      {showRecover &&
        <>
          <Whisper placement="auto" trigger="hover" speaker={tooltip("Восcтановить")}>
            <IconButton icon={<Icon icon="undo" />} circle size="lg" onClick={recoverWord} />
          </Whisper>
        </>
      }
      {showStats && (
        <>
          <Whisper placement="auto" trigger="hover" speaker={tooltip("Количество правильных ответов")}>
            <IconButton icon={(
              (word.userWord && word.userWord.optional && word.userWord.optional.correctGuessNumber) || 0
            )} circle size="lg" color="green" />
          </Whisper>
          <Whisper placement="auto" trigger="hover" speaker={tooltip("Количество неправильных ответов")}>
            <IconButton icon={
              (word.userWord && word.userWord.optional && word.userWord.optional.incorrectGuessNumber) || 0
            } circle size="lg" color="red" />
          </Whisper>
        </>
      )}
    </>
  )
}
export default WordButtons