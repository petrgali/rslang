import Training from "../Training/Training"
import DeletedWords from "../Dictionary/components/DeletedWordsSection"


//authorize to get JWT token

// import interactAPI from "../../services/interfaceAPI"
// interactAPI.loginUser({
//     email: "opelliek@gmail.com",
//     password: "Qwerty123!"
// }).then(console.log)



export default function Home() {

    return (
        <div>
            <h1>Sample home page</h1>
            <Training 
            group={3}/>
            <DeletedWords />
        </div>
    )
}