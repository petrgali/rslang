import { BrowserRouter } from "react-router-dom"
import { RouterConfig } from "./navigation/RouterConfig"
import setDefaults from "./services/setOptionsDefault"

function App() {
  setDefaults()
  return (
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  )
}
export default App;
