import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import { Container, Content, Footer, Header, Sidebar } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { RouterConfig } from "./navigation/RouterConfig"
import setDefaults from "./services/setOptionsDefault"
import ContainerFooter from "./components/ContainerFooter/ContainerFooter";
import Menu from "./components/Menu/Menu";
import "./styles/App.css";
import CustomHeader from "./components/CustomHeader/CustomHeader";
import { useDispatch } from "react-redux";
import { updateUserCredentials } from "./redux/actions/credentialsAction"
import interactAPI from "./services/interfaceAPI"


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    interactAPI.getUserByRefreshToken()
      .then(response => {
        const { id, name, avatar} = response.payload
        dispatch(updateUserCredentials({
          name,
          userId: id,
          avatar
        }))
      })
  }, [dispatch])

  setDefaults()

  return (
    <BrowserRouter>
      <Container className="container">
        <Sidebar className="sidebar" style={{ flex: 0, width: 56 }}>
          <Menu />
        </Sidebar>
        <Container>
          <Header>
            <CustomHeader />
          </Header>
          <Content>
            <RouterConfig />
          </Content>
          <Footer>
            <ContainerFooter />
          </Footer>
        </Container>
      </Container>
    </BrowserRouter>
  )
}
export default App;
