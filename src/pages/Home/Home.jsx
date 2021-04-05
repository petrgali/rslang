import React from "react"
import Dictionary from "../../components/Dictionary"
import { STATUS } from "../../components/constant"
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Главная страница</h1>
      <Dictionary
        mode={STATUS.DELETED}
      />
    </div>
  )
}

export default Home
