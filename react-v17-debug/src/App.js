import logo from './logo.svg';
import './App.css';
import { useState } from 'React'

function App() {
  const [num, setNum] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <p
          title={num}
          onClick={() => setNum(num => num + 1)}
        >
          Edit <code>{num}</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
