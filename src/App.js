import { BrowserRouter } from "react-router-dom"
import { RouterConfig } from "./navigation/RouterConfig"
import setDefaults from "./services/setOptionsDefault"
import 'rsuite/dist/styles/rsuite-default.css';
import "./styles/App.css";

function App() {
  setDefaults()
  return (
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  )
}
export default App;
