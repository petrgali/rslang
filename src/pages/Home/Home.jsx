import SectionWordsList from "../Section/components/SectionWordsList/SectionWordsList"
// import Dictionary from "../../components/Dictionary"
// import { STATUS } from "../../components/constant"
import "./Home.css";
import interactAPI from "../../services/interfaceAPI"
// interactAPI.loginUser({
//     email: "opelliek@gmail.com",
//     password: "Qwerty123!"
// }).then(console.log)
const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Главная страница</h1>
      <SectionWordsList group={0} />
      {/* <Dictionary
        mode={STATUS.DELETED}
      /> */}
    </div>
  )
}

export default Home
