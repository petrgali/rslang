import SectionWordsList from "../Section/components/SectionWordsList/SectionWordsList"
// import Dictionary from "../../components/Dictionary"
// import { STATUS } from "../../components/constant"
import "./Home.css";

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
