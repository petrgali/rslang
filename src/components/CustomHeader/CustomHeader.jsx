import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Icon, IconButton, Nav, Navbar } from "rsuite";
import Auth from "../Auth/Auth"
import { ELECTRONIC_TEXTBOOK_ROUTE, MINI_GAMES_ROUTE, STATISTICS_ROUTE } from "../../navigation/CONSTANT";
import "./CustomHeader.css"

const routes = ["/", ELECTRONIC_TEXTBOOK_ROUTE, MINI_GAMES_ROUTE, STATISTICS_ROUTE]

const getCurrentActiveKey = (pathname) => {
  if (pathname.includes(ELECTRONIC_TEXTBOOK_ROUTE)) return 2
  else if (pathname.includes(MINI_GAMES_ROUTE)) return 3
  else if (pathname.includes(STATISTICS_ROUTE)) return 4
  else return 1
}

const CustomHeader = () => {
  const location = useLocation()
  const history = useHistory()
  const [showLogin, setLogin] = useState(false)
  const [activeKey, setActiveKey] = useState(getCurrentActiveKey(location.pathname))

  useEffect(() => {
    setActiveKey(getCurrentActiveKey(location.pathname))
  }, [location.pathname])

  const handleSelect = (eventKey, event) => {
    eventKey = parseFloat(eventKey)
    history.push(routes[eventKey - 1])
    event.currentTarget.blur()
  }
  const openLogin = () => setLogin(!showLogin)
  return (
    <div className="header">
      <Navbar className="navbar" appearance="inverse">
        <Navbar.Header className="nav-header">
          <Icon icon="cube" size="2x" style={{ color: "white" }} />
        </Navbar.Header>
        <Navbar.Body>
          <Nav onSelect={handleSelect}>
            <Nav.Item active={activeKey === 1} eventKey="1" icon={<Icon icon="home" />} />
            <Nav.Item active={activeKey === 2} eventKey="2" icon={<Icon icon="book" />} />
            <Nav.Item active={activeKey === 3} eventKey="3" icon={<Icon icon="gamepad" />} />
            <Nav.Item active={activeKey === 4} eventKey="4" icon={<Icon icon="pie-chart" />} />
          </Nav>
        </Navbar.Body>
      </Navbar>
      <IconButton
        icon={<Icon icon="sign-in" />}
        circle
        onClick={openLogin}
      />
      {showLogin && <Auth showLogin={showLogin} handleShow={openLogin}/>}
    </div>
  )
}

export default CustomHeader
