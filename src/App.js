import { BrowserRouter } from "react-router-dom"
import { Container, Content, Footer, Header, Sidebar } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { RouterConfig } from "./navigation/RouterConfig"
import setDefaults from "./services/setOptionsDefault"
import ContainerFooter from "./components/ContainerFooter/ContainerFooter";
import Menu from "./components/Menu/Menu";
import "./styles/App.css";
import CustomHeader from "./components/CustomHeader/CustomHeader";

function App() {
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
