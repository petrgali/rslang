import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Divider, Icon } from "rsuite";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import interfaceAPI from "../../services/interfaceAPI";
import CardStatsList from "./components/CardStatsList";
import UnAuth from "../../components/UnAuth/UnAuth";
import "./Statistics.css";

const initialCurrentMiniGameStats = Object.freeze([
  { title: "Количество изученных слов", number: 0 },
  { title: "Процент правильных ответов", number: "0%" },
  { title: "Cамая длинная серия правильных ответов", number: 0 }
])

const initialCurrentMiniGameTotalStats = Object.freeze([
  { title: "Количество изученных слов", number: 0 },
  { title: "Процент правильных ответов", number: "0%" },
])

const initialTotalStats = Object.freeze([
  { title: "Количество изученных слов", number: 0 },
])

const getCurrentDate = () => new Date().toJSON().slice(0,10).split('-').reverse().join('/')

const Statistics = () => {
  const userId = useSelector(state => state.credentials.userId)
  const [currentTotalMiniGamesStats, setCurrentTotalMiniGamesStats] = useState(initialCurrentMiniGameTotalStats)
  const [savannahStats, setSavannahStats] = useState(initialCurrentMiniGameStats)
  const [audiocallStats, setAudiocallStats] = useState(initialCurrentMiniGameStats)
  const [sprintStats, setSprintStats] = useState(initialCurrentMiniGameStats)
  const [owngameStats, setOwngameStats] = useState(initialCurrentMiniGameStats)
  const [totalStats, setTotalStats] = useState(initialTotalStats)
  const [everydayStats, setEverydayStats] = useState([{
    "Дата": getCurrentDate(),
    "Количество изученных слов": 0,
  }])

  const setOrUpdateCurrentMiniGameStats = (stats, setterOrUpdater) => {
    const currentDateStat = stats.find((element) => element.date === getCurrentDate())
    if (!currentDateStat) return
    const percentCorrectGuessedNumber = (100 / (currentDateStat.learnedWords / currentDateStat.correctGuessNumber)).toFixed(1)
    setterOrUpdater([
      { title: "Количество изученных слов", number: currentDateStat.learnedWords },
      { title: "Процент правильных ответов", number: `${
        isNaN(percentCorrectGuessedNumber) ? 0 : percentCorrectGuessedNumber
      }%` },
      { title: "Cамая длинная серия правильных ответов", number: currentDateStat.longCorrectGuessNumber }
    ])
  }

  const setOrUpdateCurrentMiniGamesTotalStats = (stats) => {
    const currentTotalLearnedWords = Object.entries(stats).reduce((sum, [, value]) => {
      const currentDateStat = value.data.find((element) => element.date === getCurrentDate())
      if (!currentDateStat) return sum
      return sum + currentDateStat.learnedWords 
    }, 0)

    const currentTotalCorrectGuessedNumber = Object.entries(stats).reduce((sum, [, value]) => {
      const currentDateStat = value.data.find((element) => element.date === getCurrentDate())
      if (!currentDateStat) return sum
      return sum + currentDateStat.correctGuessNumber 
    }, 0)

    const percentTotalCorrectGuessedNumber = (100 / (currentTotalLearnedWords / currentTotalCorrectGuessedNumber)).toFixed(1)

    setCurrentTotalMiniGamesStats([
      { title: "Количество изученных слов", number: currentTotalLearnedWords },
      { title: "Процент правильных ответов", number: `${
        isNaN(percentTotalCorrectGuessedNumber) ? 0 : percentTotalCorrectGuessedNumber
      }%` },
    ])
  }

  const setOrUpdateTotalStats = (stats) => {
    const totalLearnedWords = Object.entries(stats).reduce((sum, [, value]) => {
      const sumFromMiniGame = value.data.reduce((sumFromData, element) => sumFromData + element.learnedWords, 0)
      return sum + sumFromMiniGame
    }, 0)

    setTotalStats([
      { title: "Количество изученных слов", number: totalLearnedWords },
    ])
  }

  const setOrUpdateEverydayStats = (stats) => {
    const everydayLearnedStats = Object.entries(stats).reduce((obj, [, value]) => {
      value.data.forEach((element) => {
        if (!obj[element.date]) {
          obj[element.date] = element.learnedWords
        } else {
          obj[element.date] += element.learnedWords
        }
      })
      return obj
    }, {})

    const toMonthDayYear = (dateString) => {
      const dateParts = dateString.split("/")
      return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
    }

    setEverydayStats(
      Object.entries(everydayLearnedStats)
      .sort(([a], [b]) => toMonthDayYear(a) - toMonthDayYear(b))
      .map(([date, learnedWords]) => ({
        "Дата": date,
        "Количество изученных слов": learnedWords,
      }))
    )
  }

  useEffect(() => {
    if (!userId) return
    interfaceAPI.getUserStat(userId).then((data) => {
      if (!data.payload.optional) return
      setOrUpdateCurrentMiniGameStats(data.payload.optional.savannah.data, setSavannahStats)
      setOrUpdateCurrentMiniGameStats(data.payload.optional.audiocall.data, setAudiocallStats)
      setOrUpdateCurrentMiniGameStats(data.payload.optional.sprint.data, setSprintStats)
      setOrUpdateCurrentMiniGameStats(data.payload.optional["own game"].data, setOwngameStats)
      setOrUpdateCurrentMiniGamesTotalStats(data.payload.optional)
      setOrUpdateTotalStats(data.payload.optional)
      setOrUpdateEverydayStats(data.payload.optional)
    })
  }, [userId])

  return (
    <div className="statistics">
      <h1 className="title">Статистика</h1>
      <h2 className="subtitle">Краткосрочная статистика</h2>
      <Divider className="divider" />
      {userId ? (
        <>
          <div className="mini-game-title">
            <h2 className="subtitle">Общая статистика по мини-игр за сегодняшний день</h2>
          </div>
          <CardStatsList data={currentTotalMiniGamesStats} />
          <div className="mini-game-title">
            <Icon icon="globe" size="3x" /> 
            <h2 className="subtitle">Саванна</h2>
          </div>
          <CardStatsList data={savannahStats} />
          <div className="mini-game-title">
            <Icon icon="headphones" size="3x" /> 
            <h2 className="subtitle">Аудиовызов</h2>
          </div>
          <CardStatsList data={audiocallStats} />
          <div className="mini-game-title">
            <Icon icon="rocket" size="3x" /> 
            <h2 className="subtitle">Спринт</h2>
          </div>
          <CardStatsList data={sprintStats} />
          <div className="mini-game-title">
            <Icon icon="bomb" size="3x" /> 
            <h2 className="subtitle">Своя игра</h2>
          </div>
          <CardStatsList data={owngameStats} />
        </>
      ) : (
        <UnAuth />
      )}
      <h2 className="subtitle">Долгосрочная статистика</h2>
      <Divider className="divider" />
      {userId ? (
        <>
          <div className="mini-game-title">
            <h2 className="subtitle">Общая статистика по мини-игр за каждый день</h2>
          </div>
          <CardStatsList data={totalStats} />
          <div className="line-chart">
            <ResponsiveContainer width="95%">
              <LineChart
                data={everydayStats}
                margin={{
                  top: 10,
                  right: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Дата" />
                <YAxis dataKey="Количество изученных слов" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Количество изученных слов"
                  stroke="#4CAF50"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <UnAuth />
      )}
    </div>
  )
}

export default Statistics
