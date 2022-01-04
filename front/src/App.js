import './App.css';
import User from "./pages/User";
import styled from "styled-components";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Books from "./pages/Books";


const isLogin = () => {
    return !!localStorage.getItem('profile');
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
      <div>
          <Router>
              <Switch>
                  <Route path={'/' || '/home'} render={() => (
                      isLogin() ?
                          <Books/>
                          : <User/>
                  )}/> </Switch>
          </Router>
      </div>
  );
}

export default App;
