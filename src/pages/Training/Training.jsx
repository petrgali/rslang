import { useEffect, useState } from "react"
import { Loader } from "rsuite"
import interactAPI from "../../services/interfaceAPI"
import WordsList from "./components/WordsList"
import Options from "./components/OptionsModal/Options"
import PageToggler from "./components/PageToggler"
import { wordStatus, trainingOptions } from "./constant"
import { USER } from "../../services/constant"

const api = interactAPI

const Training = ({ group }) => {
    const [data, updateData] = useState()
    const [isLoaded, updateLoadedState] = useState(false)
    const [isEmpty, updateEmptyState] = useState(true)
    const [activePage, updateActivePage] = useState(+localStorage.getItem(USER.LAST_VISITED))
    const [showControl, updateControl] = useState(localStorage.getItem(trainingOptions.showControls) === "true")
    const [showTranslate, updateTranslate] = useState(localStorage.getItem(trainingOptions.showTranslate) === "true")

    const handlePageUpdate = (num) => {
        updateActivePage(num)
        localStorage.setItem(USER.LAST_VISITED, num)
    }
    const handleRawData = (rawData) => {
        let filteredData = rawData.filter(obj => !obj.userWord || obj.userWord.difficulty !== wordStatus.deleted)
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
    const setWordStatus = (id, mode) => {
        api.updateUserWordbyId(id, { difficulty: mode })
            .then(response => {
                if (response.status === 200) {
                    requestData()
                } else if (response.status === 404) {
                    api.addUserWord(id, { difficulty: mode })
                        .then(response => {
                            if (response.status === 200) requestData()
                        })
                }
            })
    }
    useEffect(() => {
        localStorage.setItem(trainingOptions.showControls, showControl)
    }, [showControl])
    useEffect(() => {
        localStorage.setItem(trainingOptions.showTranslate, showTranslate)
    }, [showTranslate])
    useEffect(() => {
        updateLoadedState(false)
        requestData()
        // eslint-disable-next-line
    }, [activePage])
    return (
        <div>
            <PageToggler
                updatePage={handlePageUpdate}
                activePage={activePage}
            />
            <Options
                showControl={showControl}
                showTranslate={showTranslate}
                toggleControl={() => updateControl(!showControl)}
                toggleTranslate={() => updateTranslate(!showTranslate)}
            />
            {!isLoaded && <Loader
                size="lg"
                content="Loading content..."
                vertical />
            }
            {!isEmpty && isLoaded && <WordsList
                data={data}
                setWordStatus={setWordStatus}
                isLoaded={isLoaded}
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