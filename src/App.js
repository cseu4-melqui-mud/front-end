import React from 'react';
import SignInSide from "./components/signUpRegister"
import './App.css';
import {InitializeGame} from './components/initializeGame'

let token = localStorage.getItem("token")

function App() {
  return (
    <div className="App">
      {token ? <InitializeGame /> : <SignInSide />}
    </div>
  );
}

export default App;
