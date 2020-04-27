import React, {useEffect} from 'react';
import SignInSide from "./components/signUpRegister"
import './App.css';
import Game from "./components/game.js"

let token = localStorage.getItem("token")

function App() {
  return (
    <div className="App">
      {token ? <Game /> : <SignInSide />}
    </div>
  );
}

export default App;
