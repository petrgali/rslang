import Training from "../Training/Training"
import interactAPI from "../../services/interfaceAPI"

//authorize to get JWT token

// interactAPI.loginUser({
//     email: "opelliek@gmail.com",
//     password: "Qwerty123!"
// }).then(console.log)



export default function Home() {

    return (
        <div>
            <h1>Sample home page</h1>
            <Training 
            group={0}/>
        </div>
    )
}