import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Divider, Icon, IconButton, List } from "rsuite"
import interfaceAPI from "../../services/interfaceAPI"
import "./GameResult.css"

const GameResult = ({ history }) => {
  const userId = useSelector(state => state.credentials.userId)

  const setOrUpdateUserWord = async (word, options) => {
    if (!word.userWord) {
      interfaceAPI.addUserWord(userId, word._id, options)
    } else {
      interfaceAPI.updateUserWordbyId(userId, word._id, options)
    }
  }

  const getCurrentDate = () => new Date().toJSON().slice(0,10).split('-').reverse().join('/')

  const setOrUpdateUserStats = async (status, data) => {
    if (![404, 200].includes(status)) return
    if (status === 404) {
      const optional = ["savannah", "audiocall", "sprint", "own game"].reduce((res, type) => {
        res[type] = { data: [] }
        return res
      }, {})
      optional[history.type].data[0] = {
        correctGuessNumber: history.correctGuessWords.length,
        incorrectGuessNumber: history.incorrectGuessWords.length,
        learnedWords: history.correctGuessWords.length + history.incorrectGuessWords.length,
        longCorrectGuessNumber: history.correctGuessWords.length,
        date: getCurrentDate(),
      }
      interfaceAPI.updateUserStat(userId, { learnedWords: 0, optional })
    } else {
      const stats = data.payload;
      delete stats.id
      const index = stats.optional[history.type].data.findIndex((stat) => stat.date === getCurrentDate())
      if (index === -1) {
        stats.optional[history.type].data.push({
          correctGuessNumber: history.correctGuessWords.length,
          incorrectGuessNumber: history.incorrectGuessWords.length,
          learnedWords: history.correctGuessWords.length + history.incorrectGuessWords.length,
          longCorrectGuessNumber: history.correctGuessWords.length,
          date: getCurrentDate(),
        })
      } else {
        const foundCurrentStat = stats.optional[history.type].data[index]
        stats.optional[history.type].data[index] = {
          correctGuessNumber: foundCurrentStat.correctGuessNumber + history.correctGuessWords.length,
          incorrectGuessNumber: foundCurrentStat.incorrectGuessNumber + history.incorrectGuessWords.length,
          learnedWords: foundCurrentStat.learnedWords + history.correctGuessWords.length + history.incorrectGuessWords.length,
          longCorrectGuessNumber: Math.max(foundCurrentStat.longCorrectGuessNumber, history.correctGuessWords.length),
          date: getCurrentDate()
        }
      }
      interfaceAPI.updateUserStat(userId, stats)
    }
  }

  useEffect(() => {
    if (history.incorrectGuessWords.length === 0 && history.correctGuessWords.length === 0) return
    history.incorrectGuessWords.forEach((word) => {
      setOrUpdateUserWord(word, {
        optional: {
          isLearning: true,
          correctGuessNumber: ((word.userWord && word.userWord.optional && word.userWord.optional.correctGuessNumber) || 0),
          incorrectGuessWords: ((word.userWord && word.userWord.optional && word.userWord.optional.incorrectGuessNumber) || 0) + 1,
        }
      })
    })

    history.correctGuessWords.forEach((word) => {
      setOrUpdateUserWord(word, {
        optional: {
          isLearning: true,
          correctGuessNumber: ((word.userWord && word.userWord.optional && word.userWord.optional.correctGuessNumber) || 0) + 1,
          incorrectGuessWords: ((word.userWord && word.userWord.optional && word.userWord.optional.incorrectGuessNumber) || 0),
        }
      })
    })
    
    interfaceAPI.getUserStat(userId)
      .then((data) => {
        setOrUpdateUserStats(data.status, data)
      })
  }, [])

  return (
    <div className="game-result">
      <h2 className="subtitle">Результат игры</h2>
      <Divider className="divider" />
      <div className="content">
        <div className="restart">
          <IconButton
            appearance="primary"
            icon={<Icon icon="play-circle" />}
            size="lg"
            onClick={() => window.location.reload()}>
            Повторить мини-игру
          </IconButton>
        </div>
        <h3 className="list-title">Неправильные ответы - { history.incorrectGuessWords.length }</h3>
        <List className="list" size="md">
          {history.incorrectGuessWords.map((word, wordKey) => (
            <List.Item className="list-item" key={wordKey} index={wordKey}>
              <span>{word.word} - {word.wordTranslate}</span>
            </List.Item>
          ))}
        </List>
        <h3 className="list-title">Правильные ответы - { history.correctGuessWords.length }</h3>
        <List className="list" size="md">
          {history.correctGuessWords.map((word, wordKey) => (
            <List.Item className="list-item" key={wordKey} index={wordKey}>
              <span>{word.word} - {word.wordTranslate}</span>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  )
}

export default GameResult
