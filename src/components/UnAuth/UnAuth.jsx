import { React } from "react";
import { Icon } from "rsuite";
import "./UnAuth.css"

const UnAuth = () => {
  return (
    <div className="unauth">
      <Icon icon="lock" size="5x" />
      <h3 className="unauth-title">Сервис доступен только авторизованным пользователям</h3>
    </div>
  )
}

export default UnAuth
