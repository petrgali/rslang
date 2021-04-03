import React, { useState } from "react";
import { useHistory, useLocation, } from "react-router";
import { Icon, Nav, Sidenav } from "rsuite";
import { ELECTRONIC_TEXTBOOK_ROUTE, MINI_GAMES_ROUTE, STATISTICS_ROUTE } from "../../navigation/CONSTANT";
import "./Menu.css"

const routes = ["/", ELECTRONIC_TEXTBOOK_ROUTE, MINI_GAMES_ROUTE, STATISTICS_ROUTE]

const getCurrentActiveKey = (pathname) => {
  if (pathname.includes(ELECTRONIC_TEXTBOOK_ROUTE)) return 2
  else if (pathname.includes(MINI_GAMES_ROUTE)) return 3
  else if (pathname.includes(STATISTICS_ROUTE)) return 4
  else return 1
}

const Menu = () => {
  const location = useLocation()
  const history = useHistory()
  const [activeKey, setActiveKey] = useState(getCurrentActiveKey(location.pathname))

  const handleSelect = (eventKey, event) => {
    eventKey = parseFloat(eventKey)
    history.push(routes[eventKey - 1])
    setActiveKey(eventKey)
    event.currentTarget.blur()
  }

  return (
    <Sidenav
      className="menu"
      appearance="inverse"
      expanded={false}
      onSelect={handleSelect}
    >
      <Sidenav.Header className="menu-header">
        <Icon icon="cube" size="2x" style={{ color: "white" }} />
      </Sidenav.Header>
      <Sidenav.Body className="menu-body">
        <Nav>
          <Nav.Item active={activeKey === 1} eventKey="1" icon={<Icon icon="home" size="4x" />}>
            Главная страница
          </Nav.Item>
          <Nav.Item active={activeKey === 2}  eventKey="2" icon={<Icon icon="book" />}>
            Электронный учебник
          </Nav.Item>
          <Nav.Item active={activeKey === 3}  eventKey="3" icon={<Icon icon="gamepad" />}>
            Мини-игры
          </Nav.Item>
          <Nav.Item active={activeKey === 4}  eventKey="4" icon={<Icon icon="pie-chart" />}>
            Статистика
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  )
}

export default Menu
