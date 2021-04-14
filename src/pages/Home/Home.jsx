import "./Home.css";
import ReactPlayer from "react-player/lazy"
import { Divider, Timeline, Icon, Panel, Whisper, IconButton, Button } from "rsuite"
import face from "../../assets/png/external-content.duckduckgo.com.jpeg"

const Home = () => {
  return (
    <div className="home">
      <Divider>
        <h1 className="title">Что это?</h1>
      </Divider>
      <div className="about">
        <div className="about title">
          <h1
            className="subtitle">
            RSLang
          </h1>
          <div className="about text subtitle">
            <h5>
              это приложение с геймификацией процесса изучения английского языка и отслеживанием вашего ежедневного прогресса.
              <p>
                Выбирай один из 6 уровней сложности и начинай учиться прямо сейчас!
              </p>
            </h5>
          </div>
        </div>
        <div className="about prop">
          <Timeline className="custom-timeline">
            <Timeline.Item dot={<Icon style={{ background: '#FFCA28', color: '#fff' }} icon="mortar-board" size="2x" />}>
              <p>3600 СЛОВ</p>
              <p>Достаточно для понимания 95% текстов</p>
            </Timeline.Item>
            <Timeline.Item dot={<Icon style={{ background: '#4CAF50', color: '#fff' }} icon="attribution" size="2x" />}>
              <p>6 УРОВНЕЙ СЛОЖНОСТИ</p>
              <p>Для любого уровня начальных знаний</p>
            </Timeline.Item><Timeline.Item dot={<Icon style={{ background: '#00BCD4', color: '#fff' }} icon="gamepad" size="2x" />}>
              <p>4 МИНИ-ИГРЫ</p>
              <p>Отдыхай, продолжая изучать язык</p>
            </Timeline.Item>
            <Timeline.Item dot={<Icon style={{ background: '#673AB7', color: '#fff' }} icon="line-chart" size="2x" />}>
              <p>ПЕРСОНАЛЬНАЯ СТАТИСТИКА</p>
              <p>Следи за своими успехами</p>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>


      <Divider>
        <h1 className="title">Как это работает?</h1>
      </Divider>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          controls
          url='https://www.youtube.com/watch?v=HjxZYiTpU3k&t=431s'
          width="70%"
          height="70%"
        />
      </div>


      <Divider>
        <h1 className="title"> Кому сказать спасибо?</h1>
      </Divider>
      <div className="team">
        <Panel
          className="team-panel"
          shaded>
          <img
            src={face}
            className="team-avatar"
          />
          <div className="team-member">
            Ulan Nurym
            <p>Project contributions list</p>
            <a href="https://github.com/enthusiast17" >
              <Icon icon="github" size="2x" />
            </a>
          </div>
        </Panel>


        <Panel
          className="team-panel"
          shaded>
          <img
            src={face}
            className="team-avatar"
          />
          <div className="team-member">
            Oleg Kochsheyev
            <p>Project contributions list</p>
            <a href="https://github.com/petrgali" >
              <Icon icon="github" size="2x" />
            </a>
          </div>
        </Panel>
      </div>
    </div>
  )
}

export default Home
