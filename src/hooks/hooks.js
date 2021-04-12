import { useEffect, useState } from "react"
import interfaceAPI from "../services/interfaceAPI"
import correctAudioSrc from "../assets/audio/correct.mp3"
import incorrectAudioSrc from "../assets/audio/error.mp3"
import { useSelector } from "react-redux"

const shuffle = (arr) => {
  if (arr.length <= 1) return arr
  const result = arr.slice()
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result
}

const generateGuessWords = (words, wordIndex, limit) => {
  const generatedIndexes = [wordIndex]
  while (generatedIndexes.length < limit) {
    const randomIndex = Math.floor(Math.random() * words.length)
    if (!generatedIndexes.includes(randomIndex)) {
      generatedIndexes.push(randomIndex)
    }
  }
  return shuffle(generatedIndexes).map((index) => ({ ...words[index], color: null }))
}

const sizes = {
  "savannah": 4,
  "audiocall": 5,
  "sprint": 2,
  "own game": 4,
}

const sound = (type) => {
  const audioSrc = type === "correct" ? correctAudioSrc : incorrectAudioSrc
  new Audio(audioSrc).play()
}

const useGameEngine = ({ type, group }) => {
  const userId = useSelector(state => state.credentials.userId)
  const [words, setWords] = useState([])
  const [wordIndex, setWordIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [guessWords, setGuessWords] = useState([])
  const [history, setHistory] = useState({
    type,
    correctGuessWords: [],
    incorrectGuessWords: [],
  })

  useEffect(() => {
    if (!userId) return
    setIsLoading(true)
    interfaceAPI.getHardOrIsLearningOrRegularWords(userId, group, page)
      .then((data) => {
        setWords([...words, ...data.payload[0].paginatedResults])
        setGuessWords(generateGuessWords(data.payload[0].paginatedResults, wordIndex, sizes[type.toLowerCase()]))
        setIsLoading(false)
        return data
      })
      .catch(() => { })
  }, [userId])

  useEffect(() => {
    if (wordIndex === words.length - 11) {
      interfaceAPI.getHardOrIsLearningOrRegularWords(userId, group, page + 1)
        .then((data) => {
          setWords([...words, ...data.payload[0].paginatedResults])
          setPage(page + 1)
        })
        .catch(() => { })
    }
  }, [wordIndex])

  const guess = (word) => {
    setGuessWords(guessWords.map((element) => ({
      ...element,
      color: element.word === words[wordIndex].word ? "green" : "red"
    })))
    if (words[wordIndex].word === word.word) {
      setHistory({ ...history, correctGuessWords: [...history.correctGuessWords, words[wordIndex]] })
      sound("correct")
    } else {
      setHistory({ ...history, incorrectGuessWords: [...history.incorrectGuessWords, words[wordIndex]] })
      sound("incorrect")
    }
    return words[wordIndex].word === word.word
  }

  const forceNextWord = () => {
    if (wordIndex + 1 >= words.length) {
      setIsGameOver(true)
    } else {
      setWordIndex(wordIndex + 1)
      setGuessWords(generateGuessWords(words, wordIndex + 1, sizes[type.toLowerCase()]))
    }
  }

  const forceRestart = () => {
    setPage(-1)
    setPage(0)
    setWords([])
    setGuessWords([])
    setWordIndex(0)
    setHistory({ type, correctGuessWords: [], incorrectGuessWords: [] })
    setIsGameOver(false)
    setIsLoading(false)
  }

  return [{
    word: words[wordIndex],
    words: guessWords
  }, {
    guess,
    history,
    isGameOver,
    isLoading,
    forceGameOver: () => setIsGameOver(true),
    forceRestart,
    forceNextWord,
  }]
}

export default useGameEngine