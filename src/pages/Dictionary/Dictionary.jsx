import { useEffect, useState } from "react"
import { Loader } from "rsuite"
import interactAPI from "../../services/interfaceAPI"
import WordsList from "../Training/components/WordsList"
import Sound from "../../utils/playMultipleSounds"
import PageToggler from "../Training/components/PageToggler"
import Calculate from "../../utils/calculatePagination"
import { MODE } from "./constant"

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
                    if (response.status === 204) requestData.updateAll()
                })
        },
        dataUpdate: (rawData) => {
            updateData(rawData)
            updateLoadedState(true)
        },
        pageUpdate: (num) => updateActivePage(num),
        rePaginatedOutput: (rawData) => {
            let { request, total } = Calculate.total(rawData, activePage)
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
        },
    }

    const requestData = {
        updateAll: () => {
            switch (mode) {
                case MODE.DELETED:
                    api.getDeletedWords()
                        .then((response) => {
                            if (response.status === 200) {
                                handle.rePaginatedOutput(response.payload[0].paginatedResults)
                            }
                        })
                    break
                case MODE.HARD:
                    api.getHardWords()
                        .then((response) => {
                            if (response.status === 200) {
                                handle.rePaginatedOutput(response.payload[0].paginatedResults)
                            }
                        })
                    break
            }
        },
        byGroup: (group, page) => {
            switch (mode) {
                case MODE.DELETED:
                    api.getDeletedWordsbyGroup(group, page)
                        .then(response => {
                            if (response.status === 200) {
                                handle.dataUpdate(response.payload[0].paginatedResults)
                            }
                        })
                    break
                case MODE.HARD:
                    api.getHardWordsbyGroup(group, page)
                        .then(response => {
                            if (response.status === 200) {
                                handle.dataUpdate(response.payload[0].paginatedResults)
                            }
                        })
                    break
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
                    {isLoaded
                        ? <WordsList
                            showTranslate
                            showRecover
                            recoverWord={handle.recover}
                            data={data} />
                        : <Loader
                            size="lg"
                            content="Loading content..."
                            vertical />
                    }

                </>
                : <div>Все слова снова в учебнике!</div>
            }
        </>
    )
}

export default Dictionary