import Training from "../Training/Training"
import Dictionary from "../Dictionary/Dictionary"
import { MODE } from "../Dictionary/constant"

//authorize to get JWT token
import interactAPI from "../../services/interfaceAPI"
// interactAPI.loginUser({
//     email: "opelliek@gmail.com",
//     password: "Qwerty123!"
// }).then(console.log)



export default function Home() {

    return (
        <div>
            <h1>Sample home page</h1>
            {/* <Training 
            group={2}/> */}
            <Dictionary
                mode={MODE.HARD}
            />
        </div>
    )
}