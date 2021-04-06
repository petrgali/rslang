import { useEffect, useState } from "react"
import { Alert, Icon } from "rsuite"
import { STATUS, MESSAGE } from "../../../../components/constant"
import { TRAINING } from "../../../../services/constant"
import interactAPI from "../../../../services/interfaceAPI"
import WordsList from "../../../../components/WordsList/WordsList"
import ListPlaceholder from "../../../../components/ListPlaceholder/ListPlaceholder"
import Options from "../../../../components/Options/Options"
import PageToggler from "../../../../components/PageToggler"
import Sound from "../../../../utils/playMultipleSounds"
import "./SectionWordsList.css"
import { useHistory } from "react-router"
import { ELECTRONIC_TEXTBOOK_SECTION_ROUTE } from "../../../../navigation/CONSTANT"

const api = interactAPI

const SectionWordsList = ({ group, page }) => {
    const history = useHistory()
    const [data, updateData] = useState()
    const [isLoaded, updateLoadedState] = useState(false)
    const [isEmpty, updateEmptyState] = useState(true)
    const [showControl, updateControl] = useState(localStorage.getItem(TRAINING.showControls) === "true")
    const [showTranslate, updateTranslate] = useState(localStorage.getItem(TRAINING.showTranslate) === "true")

    const handlePageUpdate = (num) => {
      history.push(ELECTRONIC_TEXTBOOK_SECTION_ROUTE + `/${group}/page/${num}`)
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
        api.getTrainingAggregatedWords(group - 1, page - 1)
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
        updateLoadedState(false)
        requestData()
        return () => {
          Sound.stop()
        }
        // eslint-disable-next-line
    }, [page])
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
                activePage={page}
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
        </div>
      </>
    )
}

export default SectionWordsList
