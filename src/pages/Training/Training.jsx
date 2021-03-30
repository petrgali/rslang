import { useEffect, useState } from "react"
import WordsList from "./components/WordsList"
import { trainingOptions } from "./constant"
import Options from "./components/OptionsModal"

const Training = () => {
    const [showControl, updateControl] = useState(localStorage.getItem(trainingOptions.showControls) === "true")
    const [showTranslate, updateTranslate] = useState(localStorage.getItem(trainingOptions.showTranslate) === "true")

    useEffect(() => {
        localStorage.setItem(trainingOptions.showControls, showControl)
    }, [showControl])
    useEffect(() => {
        localStorage.setItem(trainingOptions.showTranslate, showTranslate)
    }, [showTranslate])
    return (
        <div>
            <Options
                showControl={showControl}
                showTranslate={showTranslate}
                toggleControl={() => updateControl(!showControl)}
                toggleTranslate={() => updateTranslate(!showTranslate)}
            />
            <WordsList
                showControl={showControl}
                showTranslate={showTranslate} />
        </div>
    )
}

export default Training