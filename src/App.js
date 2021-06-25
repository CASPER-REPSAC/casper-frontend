import { HashRouter, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
    </HashRouter>
  );
}

export default App;
