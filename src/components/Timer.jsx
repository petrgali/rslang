import React, { useEffect, useRef } from "react";
import { Progress } from "rsuite";

const Timer = ({ shouldStart, countDownTime, setCountDownTime }) => {
  const progressRef = useRef()
  const timerRef = useRef()

  useEffect(() => {
    if (!shouldStart) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      if (countDownTime === 0) {
        clearInterval(timerRef.current)
        return
      }
        setCountDownTime(countDownTime - 1)
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [shouldStart, countDownTime, setCountDownTime])

  useEffect(() => {
    if (!progressRef.current) return
    const progress = progressRef.current.querySelector("span")
    if (!progress) return
    progress.children[0].textContent = countDownTime
  }, [countDownTime])

  return (
    <div ref={progressRef} className="progress">
      <Progress.Circle
        percent={((60 - countDownTime) * 1.666666666)}
        showInfo={countDownTime === 60 ? false : true}
      />
    </div>
  )
}

export default Timer
