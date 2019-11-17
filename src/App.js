import React from 'react';
import Form from './components/form/Form.js';
import Weather from './components/weather/Weather';
import sunset from './images/sunset.png';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



class App extends React.Component{
getWeather(){
  console.log('working')
}
render() {
  return (
        //I would import Helmet to change the page titles so they don't all say 'React App'
    <Router basename="/weatherapp">
      <div className="App">
        <nav>   
          <Link to="/">
            <img className="logo" src={sunset} alt=""></img>
          </Link>
        </nav>
          <Switch>     
            <Route path={"/"}  exact component={Form}/>
            <Route  path={"/weather"} exact component={Weather} city = {this.state}/>
          </Switch>
      </div>
    </Router>
  );
}
}
  

export default App;
