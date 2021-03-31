import { trainingOptions } from "../pages/Training/constant"
import { USER } from "../services/constant"

const setDefaults = () => {
    if (!localStorage.getItem(trainingOptions.showControls) ||
        !localStorage.getItem(trainingOptions.showTranslate))
        Object.values(trainingOptions)
            .forEach((option) => localStorage.setItem(option, true))
    if (!localStorage.getItem(USER.LAST_VISITED)) localStorage.setItem(USER.LAST_VISITED, 1)
}

export default setDefaults