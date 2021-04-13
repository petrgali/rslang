import "./Home.css";
import ReactPlayer from "react-player/lazy"
import face from "../../assets/png/external-content.duckduckgo.com.jpeg"

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Главная страница</h1>

      <div className="team">
        <img 
        src={face} 
        className="team-avatar"
        />
      </div>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          controls
          url='https://www.youtube.com/watch?v=HjxZYiTpU3k&t=431s'
          width="80%"
          height="80%"
        />
      </div>
    </div>
  )
}

export default Home
