import { BrowserRouter, Route, } from "react-router-dom";
import Main from './Components/Main';
import Chat from './Components/Chat';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Main} />
        <Route path="/chat" component={Chat} />
      </BrowserRouter>
    </div>
  );
}

export default App;
