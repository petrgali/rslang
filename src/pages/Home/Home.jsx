import Training from "../../components/Training"
import Dictionary from "../../components/Dictionary"
import { STATUS } from "../../components/constant"

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
            <Training 
            group={1}/>
            <Dictionary
                mode={STATUS.DELETED}
            />
        </div>
    )
}