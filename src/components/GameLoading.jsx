import React, { useEffect, useState } from "react"
import { Loader } from "rsuite"

let interval

const GameLoading = () => {
  const [time, setTime] = useState(3)
  useEffect(() => {
    if (time === 0) {
      clearInterval(interval)
      return
    }
    interval = setInterval(() => {
      setTime(time - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

  return (
    <Loader size="lg" backdrop content={time} vertical />
  )
}

export default GameLoading
