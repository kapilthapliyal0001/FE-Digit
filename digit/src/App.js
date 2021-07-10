import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
// Components Imports
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={MainPage} />
      </Router>
      
    </div>
  );
}

export default App;
