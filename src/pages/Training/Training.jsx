import { useState, useEffect } from "react"
import { Loader } from "rsuite"
import WordBox from "./components/WordBox"
import interactAPI from "../../services/interfaceAPI"
import { wordStatus } from "../../services/constant"



const api = interactAPI
// api.loginUser({
//     email: "opelliek@gmail.com",
//     password: "Qwerty123!"
// }).then(console.log)


function Training() {
    const [data, updateData] = useState()
    const [isLoaded, updateLoadState] = useState(false)

    const getData = () => {
        api.getTrainingAggregatedWords()
            .then((response) => {
                if (response.status === 200) {
                    updateData(response.payload[0].paginatedResults)
                    updateLoadState(true)
                }
            })
    }
    const setWord = (id, mode) => {
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
                    key={obj._id}
                    word={obj}
                    setWordHard={(id) => setWord(id, wordStatus.hard)}
                    removeWord={(id) => setWord(id, wordStatus.deleted)}
                />)
                : <Loader
                    size="lg"
                    content="Loading..."
                    vertical />
            }
        </>
    )
}
export default Training
