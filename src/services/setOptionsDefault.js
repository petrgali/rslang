import { TRAINING, USER } from "./constant"

const setDefaults = (hard) => {
    if (hard) {
        Object.values(TRAINING)
            .forEach((option) => localStorage.setItem(option, true))
        localStorage.setItem(USER.LAST_VISITED, 1)
        return
    }
    if (!localStorage.getItem(TRAINING.showControls) ||
        !localStorage.getItem(TRAINING.showTranslate))
        Object.values(TRAINING)
            .forEach((option) => localStorage.setItem(option, true))
    if (!localStorage.getItem(USER.LAST_VISITED)) localStorage.setItem(USER.LAST_VISITED, 1)
}

export default setDefaults