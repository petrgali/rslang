import { useEffect, useState } from "react"
import { Alert } from "rsuite"
import { STATUS, MESSAGE } from "./constant"
import { TRAINING, USER } from "../services/constant"
import interactAPI from "../services/interfaceAPI"
import WordsList from "./WordsList"
import ListPlaceholder from "./ListPlaceholder/ListPlaceholder"
import Options from "./OptionsModal/Options"
import PageToggler from "./PageToggler"
import Sound from "../utils/playMultipleSounds"

const api = interactAPI

const Training = ({ group }) => {
    const [data, updateData] = useState()
    const [isLoaded, updateLoadedState] = useState(false)
    const [isEmpty, updateEmptyState] = useState(true)
    const [activePage, updateActivePage] = useState(+localStorage.getItem(USER.LAST_VISITED))
    const [showControl, updateControl] = useState(localStorage.getItem(TRAINING.showControls) === "true")
    const [showTranslate, updateTranslate] = useState(localStorage.getItem(TRAINING.showTranslate) === "true")

    const handlePageUpdate = (num) => {
        updateActivePage(num)
        localStorage.setItem(USER.LAST_VISITED, num)
    }
    const handleRawData = (rawData) => {
        let filteredData = rawData.filter(obj => !obj.userWord || obj.userWord.difficulty !== STATUS.DELETED)
        if (filteredData.length < 1) {
            updateLoadedState(true)
            updateEmptyState(true)
            return
        }
        updateData(filteredData)
        updateEmptyState(false)
        updateLoadedState(true)
    }
    const requestData = () => {
        api.getTrainingAggregatedWords(group, activePage - 1)
            .then((response) => {
                if (response.status === 200) {
                    handleRawData(response.payload[0].paginatedResults)
                }
            })
    }
    const updateOptions = (settings, mode) => {
        if (!!settings
            && !!settings.optional
            && mode === STATUS.DELETED)
            return {
                difficulty: mode,
                optional: { isLearning: false }
            }
        if (mode === STATUS.DELETED)
            return {
                difficulty: mode
            }
        return {
            difficulty: mode,
            optional: { isLearning: true }
        }
    }
    const setWordStatus = (id, settings, mode) => {
        let options = updateOptions(settings, mode)
        api.updateUserWordbyId(id, options)
            .then(response => {
                if (response.status === 200) {
                    Alert.info(MESSAGE.ADDED)
                    requestData()
                } else if (response.status === 404) {
                    api.addUserWord(id, options)
                        .then(response => {
                            if (response.status === 200) {
                                Alert.info(MESSAGE.ADDED)
                                requestData()
                            }
                        })
                }
            })
    }
    useEffect(() => {
        localStorage.setItem(TRAINING.showControls, showControl)
    }, [showControl])
    useEffect(() => {
        localStorage.setItem(TRAINING.showTranslate, showTranslate)
    }, [showTranslate])
    useEffect(() => {
        Sound.stop()
        updateLoadedState(false)
        requestData()
        // eslint-disable-next-line
    }, [activePage])
    return (
        <div>
            <PageToggler
                updatePage={handlePageUpdate}
                activePage={activePage}
                totalPages={30}
            />
            <Options
                showControl={showControl}
                showTranslate={showTranslate}
                toggleControl={() => updateControl(!showControl)}
                toggleTranslate={() => updateTranslate(!showTranslate)}
            />
            {!isLoaded && <ListPlaceholder />}
            {!isEmpty && <WordsList
                data={data}
                setWordStatus={setWordStatus}
                showControl={showControl}
                showTranslate={showTranslate} />
            }
            {isEmpty && isLoaded &&
                <div>all words have been deleted</div>
            }
        </div>
    )
}

export default Training