import { useState, useEffect } from "react"
import WordBox from "./components/WordBox"
import interactAPI from "../../services/interfaceAPI"
import { API_BASE_URL } from "../../services/constant"

// api.loginUser({
//     email: "opelliek@gmail.com",
//     password: "Qwerty123!"
// }).then(console.log)

const api = interactAPI

function Training() {
    const [data, updateData] = useState()
    const [isLoaded, updateLoadState] = useState(false)
    useEffect(() => {
        api.getWords()
            .then((response) => {
                if (response.status === 200) {
                    updateData(response.payload)
                    updateLoadState(true)
                    console.log(response.payload)
                } else {
                    console.log(response.payload)
                }
            })
    }, [])
    return (
        <>
            {isLoaded && data.map((obj, idx) => <WordBox key={data.length - idx} word={obj} />)}
        </>
    )
}

export default Training