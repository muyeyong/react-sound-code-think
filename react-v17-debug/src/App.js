import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Diff from './diff/single-diff'
import MultDiff from './diff/mult-diff'
import UpdateBase from './update/base';

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/diff">Single-Diff</Link>
          </li>
          <li>
            <Link to="/multDiff">mult-Diff</Link>
          </li>
          <li>
            <Link to="/updateBase">update-base</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/diff">
          <Diff />
        </Route>
        <Route path="/multDiff">
          <MultDiff />
        </Route>
        <Route path="/updateBase">
          <UpdateBase />
        </Route>
      </Switch>
    </div>
  </Router>
  
  );
}

export default App;
