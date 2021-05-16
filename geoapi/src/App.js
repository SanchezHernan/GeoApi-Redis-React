import './App.css';
import Home from './Pages/Home/home'
import Agregar from './Pages/Agregar/agregar'
import Buscar from './Pages/Buscar/buscar'
import {CoordsContextProvider} from './Context/CoordsContext'


import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";


function App() {
  return (
    <div className="App App-header">
      <CoordsContextProvider>
      <Router>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/agregar' component={Agregar}/>
            <Route exact path='/buscar' component={Buscar}/>
        </Switch>
      </Router>
      </CoordsContextProvider>
    </div>
  );
}

export default App;
