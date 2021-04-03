import { useHistory } from "react-router-dom"
import { Icon, IconButton } from "rsuite"
import "./NotFound.css"

const NotFound = () => {
  const history = useHistory()

  const handleGoHome = () => {
    history.push("/")
  }

  return (
    <div className="not-found">
      <Icon icon="hand-stop-o" size="5x"/>
      <h2 className="title">Страница не найдена</h2>
      <IconButton
        appearance="primary"
        icon={<Icon icon="home"/>}
        onClick={handleGoHome}
      >
        Вернуться домой
      </IconButton>
    </div>
  )
}

export default NotFound
