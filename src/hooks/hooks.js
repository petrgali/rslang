import { useEffect, useState } from "react"
import interfaceAPI from "../services/interfaceAPI"

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
  while(generatedIndexes.length < limit) {
    const randomIndex = Math.floor(Math.random() * words.length)
    if (!generatedIndexes.includes(randomIndex)) {
      generatedIndexes.push(randomIndex)
    }
  }
  return shuffle(generatedIndexes).map((index) => ({ ...words[index], color: null }))
}

const useGameEngine = ({ type, group }) => {
  const [words, setWords] = useState([])
  const [wordIndex, setWordIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [guessWords, setGuessWords] = useState([])

  useEffect(() => {
    setIsLoading(true)
    interfaceAPI.getHardOrIsLearningOrRegularWords(group, page)
      .then((data) => {
        setWords([...words, ...data.payload[0].paginatedResults])
        setGuessWords(generateGuessWords(data.payload[0].paginatedResults, wordIndex, 4))
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (wordIndex === words.length - 11) {
      interfaceAPI.getHardOrIsLearningOrRegularWords(group, page + 1)
      .then((data) => {
        setWords([...words, ...data.payload[0].paginatedResults])
      })
      .catch(() => setIsGameOver(true))
      setPage(page + 1)
    }
  }, [wordIndex])

  const guess = (word) => {
    setGuessWords(guessWords.map((element) => ({
      ...element,
      color: element.word === words[wordIndex].word ? "green" : "red"
    })))
    setTimeout(() => {
      setWordIndex(wordIndex + 1)
      setGuessWords(generateGuessWords(words, wordIndex + 1, 4))
    }, 1000)
    return words[wordIndex].word === word.word
  }
  
  const history = {
    correctGuesses: [],
    incorrectGuesses: [],
  }

  return [{ word: words[wordIndex], words: guessWords }, { guess, history, isGameOver, isLoading, forceGameOver: () => setIsGameOver(true) }]
}

export default useGameEngine