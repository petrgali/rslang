import { BrowserRouter } from "react-router-dom"
import { Container, Content, Footer, Header, Sidebar } from "rsuite";
import { RouterConfig } from "./navigation/RouterConfig"
import setDefaults from "./services/setOptionsDefault"
import "rsuite/dist/styles/rsuite-default.css";
import Menu from "./components/Menu/Menu";
import "./styles/App.css";

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

          </Header>
          <Content>
              <RouterConfig />
          </Content>
          <Footer>
            
          </Footer>
        </Container>
      </Container>
    </BrowserRouter>
  )
}
export default App;
