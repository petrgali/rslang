import { Icon, IconButton, Tooltip, Whisper } from "rsuite"

const WordButtons = ({ setWordHard, isWordHard, removeWord, recoverWord, showRecover, showControl }) => {
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
            <IconButton icon={<Icon icon="ban" />} circle size="lg" onClick={recoverWord} />
          </Whisper>
        </>
      }
    </>
  )
}
export default WordButtons