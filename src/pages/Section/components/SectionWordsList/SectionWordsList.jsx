import { useEffect, useState } from "react"
import { Alert, Icon } from "rsuite"
import { STATUS, MESSAGE } from "../../../../components/constant"
import { TRAINING, USER } from "../../../../services/constant"
import interactAPI from "../../../../services/interfaceAPI"
import WordsList from "../../../../components/WordsList/WordsList"
import ListPlaceholder from "../../../../components/ListPlaceholder/ListPlaceholder"
import Options from "../../../../components/Options/Options"
import PageToggler from "../../../../components/PageToggler"
import Sound from "../../../../utils/playMultipleSounds"
import "./SectionWordsList.css"

const api = interactAPI

const SectionWordsList = ({ group }) => {
    const [data, updateData] = useState()
    const [isLoaded, updateLoadedState] = useState(false)
    const [isEmpty, updateEmptyState] = useState(true)
    const [activePage, updateActivePage] = useState(+localStorage.getItem(USER.LAST_VISITED))
    const [showControl, updateControl] = useState(localStorage.getItem(TRAINING.showControls) === "true")
    const [showTranslate, updateTranslate] = useState(localStorage.getItem(TRAINING.showTranslate) === "true")

    const handlePageUpdate = (num) => {
        if (activePage !== num) updateData([])
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
    const setWordStatus = (id, mode) => {
        api.updateUserWordbyId(id, { difficulty: mode })
            .then(response => {
                if (response.status === 200) {
                    Alert.info(MESSAGE.ADDED)
                    requestData()
                } else if (response.status === 404) {
                    api.addUserWord(id, { difficulty: mode })
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
      <>
        <Options
            showControl={showControl}
            showTranslate={showTranslate}
            toggleControl={() => updateControl(!showControl)}
            toggleTranslate={() => updateTranslate(!showTranslate)}
        />
        <div className="section-words-list">
            <PageToggler
                updatePage={handlePageUpdate}
                activePage={activePage}
                totalPages={30}
            />
            {!isLoaded && <ListPlaceholder />}
            {!isEmpty && <WordsList
                data={data}
                setWordStatus={setWordStatus}
                showControl={showControl}
                showTranslate={showTranslate} />
            }
            {isEmpty && isLoaded &&
              <div className="deleted-page">
                <Icon icon="ban" size="5x"/>
                <h2 className="subtitle">Все слова были удалены</h2>
              </div>
            }
            <PageToggler
                updatePage={handlePageUpdate}
                activePage={activePage}
                totalPages={30}
            />
        </div>
      </>
    )
}

export default SectionWordsList
