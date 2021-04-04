import { useEffect, useState } from "react"
import { Alert } from "rsuite"
import PageToggler from "./PageToggler"
import WordsList from "./WordsList/WordsList"
import { STATUS, MESSAGE } from "./constant"
import Sound from "../utils/playMultipleSounds"
import Calculate from "../utils/calculatePagination"
import interactAPI from "../services/interfaceAPI"
import ListPlaceholder from "./ListPlaceholder/ListPlaceholder"

const api = interactAPI

const Dictionary = ({ mode }) => {
    const [data, updateData] = useState()
    const [activePage, updateActivePage] = useState(1)
    const [totalPages, updateTotal] = useState(0)
    const [groupRequest, updateGroupRequest] = useState()
    const [isLoaded, updateLoadedState] = useState(false)
    const [isEmpty, updateEmpty] = useState(false)

    const handle = {
        recover: (id) => {
            Sound.stop()
            api.deleteUserWordbyId(id)
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
                    api.getDeletedWords()
                        .then(response => handle.rePaginatedOutput(response))
                    break
                case STATUS.HARD:
                    api.getHardWords()
                        .then(response => handle.rePaginatedOutput(response))
                    break
                case STATUS.LEARNING:
                    api.getLearningWords()
                        .then(response => handle.rePaginatedOutput(response))

            }
        },
        byGroup: (group, page) => {
            switch (mode) {
                case STATUS.DELETED:
                    api.getDeletedWordsbyGroup(group, page)
                        .then(response => handle.dataUpdate(response))
                    break
                case STATUS.HARD:
                    api.getHardWordsbyGroup(group, page)
                        .then(response => handle.dataUpdate(response))
                    break
                case STATUS.LEARNING:
                    api.getLearningWordsbyGroup(group, page)
                        .then(response => handle.dataUpdate(response))
            }
        }
    }
    useEffect(() => {
        updateLoadedState(false)
        requestData.updateAll()
        //eslint-disable-next-line
    }, [activePage])
    return (
        <>
            {!isEmpty
                ? <>
                    <div>Cлова из раздела {groupRequest}</div>
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
                            data={data} />
                    }
                    {!isLoaded && <ListPlaceholder />}
                </>
                : <div>Все слова снова в учебнике!</div>
            }
        </>
    )
}

export default Dictionary