import { useState, useEffect } from "react"
import { Loader } from "rsuite"
import WordBox from "./WordBox"
import interactAPI from "../../../services/interfaceAPI"
import { wordStatus } from "../constant"
import WordButtons from "./WordButtons"



const api = interactAPI
// api.loginUser({
//     email: "opelliek@gmail.com",
//     password: "Qwerty123!"
// }).then(console.log)


function WordsList({ showControl, showTranslate }) {
    const [data, updateData] = useState()
    const [isLoaded, updateLoadState] = useState(false)
    const getData = () => {
        api.getTrainingAggregatedWords()
            .then((response) => {
                if (response.status === 200) {
                    updateData(response.payload[0].paginatedResults)
                    updateLoadState(true)
                }
                // console.log(response)
            })
    }
    const setWordStatus = (id, mode) => {
        api.updateUserWordbyId(id, { difficulty: mode })
            .then(response => {
                if (response.status === 200) {
                    getData()
                } else if (response.status === 404) {
                    api.addUserWord(id, { difficulty: mode })
                        .then(response => {
                            if (response.status === 200) getData()
                        })
                }
            })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            {isLoaded
                ? data.map(obj => <WordBox
                    showTranslate={showTranslate}
                    key={obj._id}
                    word={obj}
                    buttons={<WordButtons
                        showControl={showControl}
                        setWordHard={() => setWordStatus(obj._id, wordStatus.hard)}
                        removeWord={() => setWordStatus(obj._id, wordStatus.deleted)}
                    />} />
                )
                : <Loader
                    size="lg"
                    content="Loading content..."
                    vertical />
            }
        </>
    )
}
export default WordsList
