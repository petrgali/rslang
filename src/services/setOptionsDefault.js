import { trainingOptions } from "../pages/Training/constant"

const setDefaults = () => {
    if (!localStorage.getItem(trainingOptions.showControls) &&
        !localStorage.getItem(trainingOptions.showTranslate))
        Object.values(trainingOptions)
            .forEach((option) => localStorage.setItem(option, true))
}

export default setDefaults