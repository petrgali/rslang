import interactAPI from "../../services/interfaceAPI"
import { useEffect } from "react"
export default function Home() {
    let api = interactAPI()

    useEffect(() => {

        api.getUserWords()
            .then(console.log)
        //   api.signin({
        //       email:"opelliek@gmail.com",
        //       password:"Qwerty123!"
        //   })
        //   .then(console.log)

        // eslint-disable-next-line
    }, [])

    return (
        <h1>Sample home page</h1>
    )
}