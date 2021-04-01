import { useEffect, useState } from "react"
import interactAPI from "../../../services/interfaceAPI"
import WordsList from "../../Training/components/WordsList"
import { Loader } from "rsuite"
import Sound from "../../../utils/playMultipleSounds"
import PageToggler from "../../Training/components/PageToggler"

const api = interactAPI
let group = 0
const DeletedWords = () => {
    const [data, updateData] = useState()
    const [isLoaded, updateLoadedState] = useState(false)
    const [activePage, updateActivePage] = useState(1)

    const handlePageUpdate = (num) => {
        updateActivePage(num)
    }
    const requestData = () => {
        api.getDeletedWords( 0)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    updateData(response.payload[0].paginatedResults)
                    updateLoadedState(true)
                }
            })
    }
    const handleRecover = (id, mode) => {
        Sound.stop()
        api.updateUserWordbyId(id, { difficulty: mode })
            .then(response => {
                if (response.status === 200) requestData()
            })
    }
    useEffect(() => {
        requestData()
    }, [activePage])
    return (
        <>
            <div>Удаленные слова из раздела {group + 1}</div>
            <PageToggler
                activePage={activePage}
                totalPages={20}
                updatePage={handlePageUpdate}
            />
            {isLoaded
                ? <WordsList
                    showTranslate
                    showRecover
                    recoverWord={handleRecover}
                    data={data} />
                : <Loader
                    size="lg"
                    content="Loading content..."
                    vertical />
            }
        </>
    )
}

export default DeletedWords