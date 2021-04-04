import { Icon, IconButton, Tooltip, Whisper } from "rsuite"

const WordButtons = ({ setWordHard, removeWord, recoverWord, showRecover, showControl }) => {
  const tooltip = (text) => (
    <Tooltip>
      { text }
    </Tooltip>
  )
  return (
    <>
      {/* <Whisper placement="auto" trigger="hover" speaker={tooltip("Информация о слове")}>
        <IconButton icon={<Icon icon="info" />} circle />
      </Whisper> */}
      { showControl &&
        <>
          <Whisper placement="auto" trigger="hover" speaker={tooltip("В сложные")}>
            <IconButton icon={<Icon icon="question-circle" />} circle size="lg" onClick={setWordHard} />
          </Whisper>
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