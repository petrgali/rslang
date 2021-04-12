import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Alert, ButtonGroup, ButtonToolbar, Icon, IconButton, Tooltip, Whisper } from "rsuite"
import PageToggler from "../../../../components/PageToggler"
import WordsList from "../../../../components/WordsList/WordsList"
import { STATUS, MESSAGE } from "../../../../components/constant"
import Sound from "../../../../utils/playMultipleSounds"
import Calculate from "../../../../utils/calculatePagination"
import interactAPI from "../../../../services/interfaceAPI"
import ListPlaceholder from "../../../../components/ListPlaceholder/ListPlaceholder"
import "./Dictionary.css"

const api = interactAPI
const sectionColors = ["#F44336", "#FF9800", "#FFCA28", "#4CAF50", "#00BCD4", "#673AB7"]

const Dictionary = () => {
    const [mode, updateMode] = useState(STATUS.LEARNING)
    const [data, updateData] = useState()
    const [activePage, updateActivePage] = useState(1)
    const [totalPages, updateTotal] = useState(0)
    const [groupRequest, updateGroupRequest] = useState()
    const [isLoaded, updateLoadedState] = useState(false)
    const [isEmpty, updateEmpty] = useState(false)
    const userId = useSelector(state => state.credentials.userId)
    const handle = {
        recover: (id) => {
            Sound.stop()
            api.deleteUserWordbyId(userId, id)
                .then(response => {
                    if (response.status === 204) {
                        requestData.updateAll()
                        Alert.success(MESSAGE.SUCCESS)
                    }
                })
        },
        dataUpdate: (response) => {
            if (response.status === 200) {
                updateData(response.payload[0].paginatedResults)
                updateLoadedState(true)
            }
        },
        pageUpdate: (num) => updateActivePage(num),
        rePaginatedOutput: (response) => {
            if (response.status === 200) {
                updateEmpty(false)
                let { request, total } = Calculate.total(response.payload[0].paginatedResults, activePage)
                updateTotal(total)
                if (request) {
                    updateGroupRequest(+request.group + 1)
                    requestData.byGroup(request.group, request.page)
                    return
                }
                if (total > 0) {
                    updateActivePage(activePage - 1)
                    return
                }
                updateEmpty(true)
            }
        },
    }

    const requestData = {
        updateAll: () => {
            switch (mode) {
                case STATUS.DELETED:
                    api.getDeletedWords(userId)
                        .then(response => handle.rePaginatedOutput(response))
                    break
                case STATUS.HARD:
                    api.getHardWords(userId)
                        .then(response => handle.rePaginatedOutput(response))
                    break
                case STATUS.LEARNING:
                    api.getLearningWords(userId)
                        .then(response => handle.rePaginatedOutput(response))
                    break
                default:
                    break
            }
        },
        byGroup: (group, page) => {
            switch (mode) {
                case STATUS.DELETED:
                    api.getDeletedWordsbyGroup(userId, group, page)
                        .then(response => handle.dataUpdate(response))
                    break
                case STATUS.HARD:
                    api.getHardWordsbyGroup(userId, group, page)
                        .then(response => handle.dataUpdate(response))
                    break
                case STATUS.LEARNING:
                    api.getLearningWordsbyGroup(userId, group, page)
                        .then(response => handle.dataUpdate(response))
                    break
                default:
                    break
            }
        }
    }
    useEffect(() => {
        if (!userId) return
        updateLoadedState(false)
        requestData.updateAll()
        //eslint-disable-next-line
    }, [userId, mode, activePage])
    return (
        <div className="dictionary">
            <ButtonToolbar className="button-toolbar">
                <ButtonGroup size="lg">
                    <Whisper placement="auto" trigger="hover" speaker={
                        <Tooltip>Изучаемые слова</Tooltip>
                    }>
                        <IconButton
                            icon={<Icon icon="envira" />}
                            active={mode === STATUS.LEARNING}
                            onClick={() => updateMode(STATUS.LEARNING)} />
                    </Whisper>
                    <Whisper placement="auto" trigger="hover" speaker={
                        <Tooltip>Сложные слова</Tooltip>
                    }>
                        <IconButton
                            icon={<Icon icon="question-circle" />}
                            active={mode === STATUS.HARD}
                            onClick={() => updateMode(STATUS.HARD)} />
                    </Whisper>
                    <Whisper placement="auto" trigger="hover" speaker={
                        <Tooltip>Удаленные слова</Tooltip>
                    }>
                        <IconButton
                            icon={<Icon icon="ban" />}
                            active={mode === STATUS.DELETED}
                            onClick={() => updateMode(STATUS.DELETED)} />
                    </Whisper>
                </ButtonGroup>
            </ButtonToolbar>
            {!isEmpty
                ? <>
                    <div className="dictionary-info">
                        <Icon icon="circle" size="lg" style={{ color: sectionColors[groupRequest - 1] }} />
                        <span>cлова из {groupRequest} раздела</span>
                    </div>
                    <PageToggler
                        activePage={activePage}
                        totalPages={totalPages}
                        updatePage={handle.pageUpdate}
                    />
                    {isLoaded && mode !== STATUS.LEARNING &&
                        <WordsList
                            showTranslate
                            showRecover
                            recoverWord={handle.recover}
                            data={data} />}
                    {isLoaded && mode === STATUS.LEARNING &&
                        <WordsList
                            showTranslate
                            showStats
                            data={data} />
                    }
                    {!isLoaded && <ListPlaceholder />}
                </>
                : <div className="dictionary-empty">
                    <Icon icon="smile-o" size="5x" />
                    <h3 className="subtitle">Все слова снова в учебнике!</h3>
                </div>
            }
        </div>
    )
}

export default Dictionary