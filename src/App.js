import React, {useEffect} from 'react';
import './App.css';
import {Route} from "react-router-dom"
import About from "./components/about.js"
import GameAndSignIn from "./components/gameAndSignIn"


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={GameAndSignIn}/>
      <Route exact path="/about" component={About}/>
    </div>
  );
}

export default App;
