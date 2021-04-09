// import WordBox from "./WordBox/WordBox"
// import WordButtons from "./WordButtons"
// import { STATUS } from "./constant"

// function WordsList({ data, setWordStatus, recoverWord, showControl, showTranslate, showRecover }) {
//     return (
//         data.map(obj => <WordBox
//             showTranslate={showTranslate}
//             key={obj._id}
//             word={obj}
//             buttons={<WordButtons
//                 showControl={showControl}
//                 showRecover={showRecover}
//                 recoverWord={() => recoverWord(obj._id)}
//                 setWordHard={() => setWordStatus(obj._id, obj.userWord, STATUS.HARD)}
//                 removeWord={() => setWordStatus(obj._id, obj.userWord, STATUS.DELETED)}
//             />} />
//         )
//     )
// }
// export default WordsList
