import { BrowserRouter } from "react-router-dom"
import { RouterConfig } from "./navigation/RouterConfig"
import 'rsuite/dist/styles/rsuite-default.css';
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  )
}

export default App;
