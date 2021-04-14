import "./Home.css";
import ReactPlayer from "react-player/lazy"
import { Divider, Icon, Grid, Col } from "rsuite"

const Home = () => {
  return (
    <div className="home">
      <Divider>
        <h1 className="title">Что это?</h1>
      </Divider>
      <div className="about">
          <h2 className="subtitle">
              RS Lang - это приложение с геймификацией процесса изучения английского языка и отслеживанием вашего ежедневного прогресса.
          </h2>

          <h2 className="subtitle">
              Выбирай один из 6 уровней сложности и начинай учиться прямо сейчас!
          </h2>
      </div>
      <div className="features">
        <Grid>
          <Col xs={8} md={12} lg={12}>
            <div className="feature-about-icon">
              <Icon icon="book" style={{ color: "#FFCA28" }} size="5x" />
            </div>
          </Col>
          <Col xs={14} md={12} lg={12}>
            <div className="feature-about-content">
              <h2 className="subtitle" style={{ color: "#FFCA28" }}>
                3600 слов
              </h2>

              <h2 className="subtitle">
                Достаточно для понимания 95% текстов
              </h2>
            </div>
          </Col>
        </Grid>
        <Grid>
          <Col xs={14} md={12} lg={12}>
            <div className="feature-about-content">
              <h2 className="subtitle" style={{ color: "#4CAF50", textAlign: "end"  }}>
                6 уровней сложности
              </h2>

              <h2 className="subtitle"  style={{ textAlign: "end"  }}>
                Для любого уровня начальных знаний
              </h2>
            </div>
          </Col>
          <Col xs={10} md={12} lg={12}>
            <div className="feature-about-icon">
              <Icon icon="attribution" style={{ color: "#4CAF50" }} size="5x" />
            </div>
          </Col>
        </Grid>
        <Grid>
          <Col xs={8} md={12} lg={12}>
            <div className="feature-about-icon">
              <Icon icon="gamepad" style={{ color: "#00BCD4" }} size="5x" />
            </div>
          </Col>
          <Col xs={12} md={12} lg={12}>
            <div className="feature-about-content">
              <h2 className="subtitle" style={{ color: "#00BCD4" }}>
                4 мини-игры
              </h2>

              <h2 className="subtitle">
                Отдыхай, продолжая изучать язык
              </h2>
            </div>
          </Col>
        </Grid>
        <Grid>
          <Col xs={14} md={12} lg={12}>
            <div className="feature-about-content">
              <h2 className="subtitle" style={{ color: "#673AB7", textAlign: "end"  }}>
                Персональная статистика
              </h2>

              <h2 className="subtitle" style={{ textAlign: "end"  }}>
                Следи за своими успехами
              </h2>
            </div>
          </Col>
          <Col xs={10} md={12} lg={12}>
            <div className="feature-about-icon">
              <Icon icon="pie-chart" style={{ color: "#673AB7" }} size="5x" />
            </div>
          </Col>
        </Grid>
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
        <h1 className="title">Кто мы?</h1>
      </Divider>
      <div className="team">
        <Grid>
          <Col xs={24} md={12} style={{ padding: 10 }}>
            <div className="team-panel">
              <img
                src="https://avatars.githubusercontent.com/u/52827869?v=4"
                alt="enthusiast17's avatar"
                className="team-avatar"
              />
            </div>
          </Col>
          <Col xs={24} md={12} style={{ padding: 10 }}>
            <div className="team-panel">
              <h3 className="subtitle">Ulan Nurym</h3>
              <h3 className="subtitle" style={{ fontWeight: 500 }}>Верстал и стилизовал сайт. Сделал мини-игры, статистику и бэкенд часть приложения.</h3>
              <a href="https://github.com/enthusiast17" >
                <Icon icon="github" size="2x" />
              </a>
            </div>
          </Col>
        </Grid>
        <Grid>
          <Col xs={24} md={12} style={{ padding: 10 }}>
            <div className="team-panel">
              <img
                src="https://avatars.githubusercontent.com/u/52791123?v=4"
                alt="petrgali's avatar"
                className="team-avatar"
              />
            </div>
          </Col>
          <Col xs={24} md={12} style={{ padding: 10 }}>
            <div className="team-panel">
              <h3 className="subtitle">Oleg Kochsheyev</h3>
              <h3 className="subtitle" style={{ fontWeight: 500 }}>Настроил репозиторий в Github, создал доску задач и тщательно проверял фичи. Сделал список слов, учебник и авторизацию.</h3>
              <a href="https://github.com/petrgali" >
                <Icon icon="github" size="2x" />
              </a>
            </div>
          </Col>
        </Grid>
      </div>
    </div>
  )
}

export default Home
