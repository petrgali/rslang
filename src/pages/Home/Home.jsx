import Training from "../../components/Training"
import Dictionary from "../../components/Dictionary"
import { STATUS } from "../../components/constant"
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Главная страница</h1>
      <Training group={0} />
      <Dictionary
        mode={STATUS.LEARNING}
      />
    </div>
  )
}

export default Home
