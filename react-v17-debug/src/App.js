import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Diff from './diff'

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/diff">Diff</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/diff">
          <Diff />
        </Route>
      </Switch>
    </div>
  </Router>
  
  );
}

export default App;
