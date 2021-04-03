import Training from "../Training/Training";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Главная страница</h1>
      <Training group={0} />
    </div>
  )
}

export default Home
